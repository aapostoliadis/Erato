import { Music2, Clock, Heart } from "lucide-react";

interface AudioFeatures {
  tempo: number;
  key: string;
  mood: string;
}

interface FeatureDisplayProps {
  features: AudioFeatures;
}

export const FeatureDisplay = ({ features }: FeatureDisplayProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[
        {
          icon: Clock,
          label: "Tempo",
          value: `${features.tempo} BPM`,
        },
        {
          icon: Music2,
          label: "Key",
          value: features.key,
        },
        {
          icon: Heart,
          label: "Mood",
          value: features.mood,
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="glass-morphism hover-scale flex items-center gap-4 rounded-lg p-4"
        >
          <div className="rounded-full bg-secondary p-2">
            <feature.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{feature.label}</p>
            <p className="font-semibold">{feature.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};