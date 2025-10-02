import { useEffect, useRef, useState } from "react";

export default function AudioVisualiser() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isStarted, setIsStarted] = useState(false);

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

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    try {
      await audio.play();
    } catch (err) {
      console.error("audio play error:", err);
    }

    setIsStarted(true);
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

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight =
          dataArray[i] > 100 ? dataArray[i] * 0.7 : dataArray[i] * 1.2;
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
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
      {!isStarted && (
        <button
          onClick={handleStart}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-500 px-4 py-2 text-xl rounded-md hover:bg-opacity-90 border-1 border-teal-500 w-[194px] h-[64px] hover:bg-teal-500 hover:text-white hover:cursor-pointer "
        >
          Start Visualizer
        </button>
      )}
    </div>
  );
}
