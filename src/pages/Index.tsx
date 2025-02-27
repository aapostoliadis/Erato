import { useState } from "react";
import { AudioUpload } from "@/components/AudioUpload";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { FeatureDisplay } from "@/components/FeatureDisplay";
import { PromptDisplay } from "@/components/PromptDisplay";
import { UserRound } from "lucide-react";

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

  const extractFeatures = (fileName: string) => {
    // Use a simple hash function to generate consistent values
    const hash = fileName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    // Generate consistent tempo between 60 and 180 BPM
    const tempo = Math.abs(hash % 120) + 60;

    // Generate consistent key
    const keys = ["C Major", "G Major", "D Major", "A Major", "E Major", "B Major", 
                 "F Major", "A Minor", "E Minor", "B Minor", "F# Minor", "C# Minor"];
    const keyIndex = Math.abs(hash) % keys.length;
    const key = keys[keyIndex];

    // Generate consistent mood
    const moods = ["Energetic", "Calm", "Melancholic"];
    const moodIndex = Math.abs(hash) % moods.length;
    const mood = moods[moodIndex];

    return {
      tempo,
      key,
      mood,
    };
  };

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    // Extract features based on file name
    const extractedFeatures = extractFeatures(file.name);
    setFeatures(extractedFeatures);
    setPrompt(generatePrompt(extractedFeatures));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-mauve-100 to-white px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="rounded-full bg-fuchsia-500 p-3">
              <UserRound className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-mauve-600 bg-clip-text text-transparent">
              Erato
            </h1>
          </div>
          <p className="text-lg text-mauve-600">
            Transform your music into creative AI prompts
          </p>
        </div>

        <div className="transform hover:scale-[1.01] transition-transform duration-200 hover:shadow-fuchsia-100">
          <AudioUpload onFileSelect={handleFileSelect} />
        </div>

        {audioUrl && (
          <div className="space-y-8 animate-fade-in">
            <div className="transform hover:scale-[1.01] transition-transform duration-200 hover:shadow-fuchsia-100">
              <AudioVisualizer audioUrl={audioUrl} />
            </div>
            
            <div className="transform hover:scale-[1.01] transition-transform duration-200 hover:shadow-fuchsia-100">
              <FeatureDisplay features={features} />
            </div>
            
            <div className="transform hover:scale-[1.01] transition-transform duration-200 hover:shadow-fuchsia-100">
              <PromptDisplay prompt={prompt} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
