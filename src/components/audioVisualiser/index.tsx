import { useEffect, useRef } from "react";

export default function AudioVisualiser() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const handleStart = async () => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element not found");
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContextRef.current.createMediaElementSource(audio);
      sourceRef.current = source;
      source.connect(analyser);
      analyser.connect(audioContextRef.current.destination);
    }

    try {
      await audio.play();
    } catch (err) {
      console.error("audio play error:", err);
    }
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

    const video = document.getElementById("videoPlayer");

    if (!video) return;

    video.addEventListener("play", () => {
      handleStart();
    });

    video.addEventListener("pause", () => {
      audioRef.current!.pause();
    });

    return () => {
      video.removeEventListener("play", () => {});
      video.removeEventListener("pause", () => {});
    };
  }, [audioRef]);

  return (
    <div style={{ position: "relative" }}>
      <audio
        ref={audioRef}
        src="/src/components/audioVisualiser/test.mp3"
        loop
        style={{ display: "none" }}
      />
      <canvas ref={canvasRef} width={450} height={200} />
    </div>
  );
}
