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
    
    // Map moods to musical descriptors
    const moodDescriptors: Record<string, { adjectives: string[]; instruments: string[] }> = {
      "Energetic": {
        adjectives: ["driving", "dynamic", "powerful"],
        instruments: ["synthesizer", "electric guitar", "drums"],
      },
      "Calm": {
        adjectives: ["flowing", "gentle", "atmospheric"],
        instruments: ["piano", "strings", "acoustic guitar"],
      },
      "Melancholic": {
        adjectives: ["emotional", "deep", "introspective"],
        instruments: ["cello", "piano", "ambient pads"],
      },
    };

    const moodInfo = moodDescriptors[mood] || moodDescriptors["Energetic"];
    const adjective = moodInfo.adjectives[Math.floor(Math.random() * moodInfo.adjectives.length)];
    const instrument = moodInfo.instruments[Math.floor(Math.random() * moodInfo.instruments.length)];

    // Generate tempo description
    let tempoDesc = "moderate";
    if (tempo > 140) tempoDesc = "fast";
    if (tempo < 90) tempoDesc = "slow";

    return `Create a ${adjective} track in ${key} at ${tempo} BPM. Feature ${instrument} prominently to establish a ${mood.toLowerCase()} atmosphere. The composition should maintain a ${tempoDesc} and steady rhythm while emphasizing melodic elements that evoke a ${mood.toLowerCase()} feeling.`;
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