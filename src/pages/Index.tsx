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

  const generatePrompt = (features: { tempo: number; key: string; mood: string }) => {
    const { tempo, key, mood } = features;
    
    // Enhanced mood descriptors with more specific musical characteristics
    const moodDescriptors: Record<string, { 
      adjectives: string[]; 
      instruments: string[];
      effects: string[];
      rhythmDescriptors: string[];
    }> = {
      "Energetic": {
        adjectives: ["high-energy", "dynamic", "powerful", "intense"],
        instruments: ["distorted electric guitar", "punchy drums", "heavy bass"],
        effects: ["driving", "pulsating", "energetic"],
        rhythmDescriptors: ["powerful", "driving", "intense"],
      },
      "Calm": {
        adjectives: ["serene", "peaceful", "tranquil", "soothing"],
        instruments: ["soft piano", "ambient synth pads", "gentle acoustic guitar"],
        effects: ["reverberant", "floating", "atmospheric"],
        rhythmDescriptors: ["flowing", "gentle", "relaxed"],
      },
      "Melancholic": {
        adjectives: ["emotional", "reflective", "introspective", "haunting"],
        instruments: ["mellow cello", "ethereal piano", "atmospheric pads"],
        effects: ["ethereal", "dreamy", "contemplative"],
        rhythmDescriptors: ["measured", "thoughtful", "deliberate"],
      },
    };

    const moodInfo = moodDescriptors[mood] || moodDescriptors["Energetic"];
    const adjective = moodInfo.adjectives[Math.floor(Math.random() * moodInfo.adjectives.length)];
    const instrument = moodInfo.instruments[Math.floor(Math.random() * moodInfo.instruments.length)];
    const effect = moodInfo.effects[Math.floor(Math.random() * moodInfo.effects.length)];
    const rhythmDesc = moodInfo.rhythmDescriptors[Math.floor(Math.random() * moodInfo.rhythmDescriptors.length)];

    // Generate tempo description with more nuanced ranges
    let tempoDesc = "moderate";
    if (tempo > 160) tempoDesc = "very fast";
    else if (tempo > 120) tempoDesc = "upbeat";
    else if (tempo < 80) tempoDesc = "slow";
    else if (tempo < 100) tempoDesc = "relaxed";

    return `Create a ${adjective} composition in ${key} at ${tempo} BPM. Feature ${instrument} with ${effect} qualities to establish a ${mood.toLowerCase()} atmosphere. The piece should maintain a ${rhythmDesc}, ${tempoDesc} rhythm while developing melodic themes that evoke a ${mood.toLowerCase()} feeling.`;
  };

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    // Simulate feature extraction
    setTimeout(() => {
      const extractedFeatures = {
        tempo: Math.floor(Math.random() * 40) + 100,
        key: ["C Major", "G Major", "D Minor"][Math.floor(Math.random() * 3)],
        mood: ["Energetic", "Calm", "Melancholic"][Math.floor(Math.random() * 3)],
      };
      
      setFeatures(extractedFeatures);
      setPrompt(generatePrompt(extractedFeatures));
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