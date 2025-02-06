import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioUrl: string;
}

export const AudioVisualizer = ({ audioUrl }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();
  const analyzerRef = useRef<AnalyserNode>();

  useEffect(() => {
    if (!audioUrl) return;

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    analyzerRef.current = analyzer;
    analyzer.fftSize = 256;

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      animationRef.current = requestAnimationFrame(draw);

      analyzer.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        gradient.addColorStop(0, "rgba(0,0,0,0.8)");
        gradient.addColorStop(1, "rgba(0,0,0,0.2)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audioContext.close();
    };
  }, [audioUrl]);

  return (
    <div className="glass-morphism rounded-lg p-6">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="w-full rounded-lg"
      />
      <audio ref={audioRef} src={audioUrl} controls className="mt-4 w-full" />
    </div>
  );
};