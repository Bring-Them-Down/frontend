import { useEffect, useRef, useState } from "react";

export default function AudioVisualiser() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const analyserLRef = useRef<AnalyserNode | null>(null);
  const analyserRRef = useRef<AnalyserNode | null>(null);
  const [isListening, setIsListening] = useState(false);

  const initializeAudio = () => {
    if (audioContextRef.current || !audioRef.current) return;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaElementSource(audioRef.current);
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
    analyser.connect(audioContext.destination);
  };

  const handleStart = async () => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element not found");
      return;
    }

    initializeAudio();

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
      {!isListening && (
        <button
          onClick={() => {
            setIsListening(true);
            handleStart();
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Start
        </button>
      )}
    </div>
  );
}
