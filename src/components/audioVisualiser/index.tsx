import { useEffect, useRef } from "react";

export default function AudioVisualiser() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const analyserLRef = useRef<AnalyserNode | null>(null);
  const analyserRRef = useRef<AnalyserNode | null>(null);

  const initializeAudio = (mediaStream: MediaStream) => {
    if (audioContextRef.current) return;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(mediaStream);
    sourceRef.current = source;

    const splitter = audioContext.createChannelSplitter(2);
    const analyserL = audioContext.createAnalyser();
    const analyserR = audioContext.createAnalyser();
    analyserL.fftSize = 1024;
    analyserR.fftSize = 1024;
    analyserLRef.current = analyserL;
    analyserRRef.current = analyserR;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    source.connect(splitter);
    splitter.connect(analyserL, 0);
    splitter.connect(analyserR, 1);

    source.connect(analyser);
  };

  const handleStart = (mediaStream: MediaStream) => {
    if (!mediaStream) {
      console.error("MediaStream not found");
      return;
    }

    initializeAudio(mediaStream);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    function draw() {
      requestAnimationFrame(draw);

      if (!canvas || !ctx) return;

      const analyser = analyserRef.current;
      if (!analyser) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight =
          dataArray[i] > 100 ? dataArray[i] * 0.7 : dataArray[i] * 1.2;
        const halfBarHeight = barHeight / 2;

        ctx.fillStyle = `rgb(${barHeight + 100}, 140, 0)`;

        const xRight = centerX + i * (barWidth + 1);
        ctx.fillRect(xRight, centerY - halfBarHeight, barWidth, halfBarHeight);
        ctx.fillRect(xRight, centerY, barWidth, halfBarHeight);

        const xLeft = centerX - i * (barWidth + 1) - barWidth;
        ctx.fillRect(xLeft, centerY - halfBarHeight, barWidth, halfBarHeight);
        ctx.fillRect(xLeft, centerY, barWidth, halfBarHeight);
      }
    }

    draw();

    const video = document.getElementById("videoPlayer") as HTMLVideoElement;

    if (!video) return;

    video.onplay = () => {
      if (video.srcObject && video.srcObject instanceof MediaStream) {
        handleStart(video.srcObject);
      }
    };

    video.onpause = () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state === "running"
      ) {
        audioContextRef.current.suspend();
      }
    };

    video.onloadedmetadata = () => {
      if (
        video.srcObject &&
        video.srcObject instanceof MediaStream &&
        !video.paused
      ) {
        handleStart(video.srcObject);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} width={450} height={200} />
    </div>
  );
}
