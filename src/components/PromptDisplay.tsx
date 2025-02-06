import { Copy } from "lucide-react";
import { toast } from "sonner";

interface PromptDisplayProps {
  prompt: string;
}

export const PromptDisplay = ({ prompt }: PromptDisplayProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <div className="glass-morphism rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Generated Prompt</h3>
        <button
          onClick={copyToClipboard}
          className="hover-scale rounded-full bg-secondary p-2 transition-colors hover:bg-secondary/80"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-4 text-muted-foreground">{prompt}</p>
    </div>
  );
};