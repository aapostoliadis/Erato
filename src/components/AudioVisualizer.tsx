
import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioUrl: string;
}

export const AudioVisualizer = ({ audioUrl }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();
  const analyzerRef = useRef<AnalyserNode>();
  const audioContextRef = useRef<AudioContext>();
  const sourceRef = useRef<MediaElementAudioSourceNode>();

  useEffect(() => {
    if (!audioUrl) return;

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    // Clean up previous context and connections
    if (audioContextRef.current) {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      audioContextRef.current.close();
    }

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    const analyzer = audioContext.createAnalyser();
    analyzerRef.current = analyzer;
    analyzer.fftSize = 256;

    const source = audioContext.createMediaElementSource(audio);
    sourceRef.current = source;
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

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const gradient = ctx.createLinearGradient(0, HEIGHT, 0, HEIGHT - barHeight);
        gradient.addColorStop(0, "rgba(217, 70, 239, 0.8)"); // Fuchsia
        gradient.addColorStop(1, "rgba(183, 148, 244, 0.2)"); // Mauve

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
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
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
