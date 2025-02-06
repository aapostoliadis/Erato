import { useState } from "react";
import { AudioUpload } from "@/components/AudioUpload";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { FeatureDisplay } from "@/components/FeatureDisplay";
import { PromptDisplay } from "@/components/PromptDisplay";

const Index = () => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [features, setFeatures] = useState({
    tempo: 120,
    key: "C Major",
    mood: "Energetic",
  });
  const [prompt, setPrompt] = useState("");

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    // Simulate feature extraction
    setTimeout(() => {
      setFeatures({
        tempo: Math.floor(Math.random() * 40) + 100,
        key: ["C Major", "G Major", "D Minor"][Math.floor(Math.random() * 3)],
        mood: ["Energetic", "Calm", "Melancholic"][Math.floor(Math.random() * 3)],
      });
      
      setPrompt("Create an upbeat electronic track with a driving rhythm at 128 BPM. Use synthesizer pads for atmosphere and incorporate melodic elements in C major. The mood should be energetic and optimistic.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Music Prompt Generator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload your audio to generate AI music prompts
          </p>
        </div>

        <AudioUpload onFileSelect={handleFileSelect} />

        {audioUrl && (
          <div className="space-y-8 fade-in">
            <AudioVisualizer audioUrl={audioUrl} />
            <FeatureDisplay features={features} />
            <PromptDisplay prompt={prompt} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;