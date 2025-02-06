import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Music2 } from "lucide-react";
import { toast } from "sonner";

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
}

export const AudioUpload = ({ onFileSelect }: AudioUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("audio/")) {
      onFileSelect(file);
    } else {
      toast.error("Please upload an audio file");
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".aac"]
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`glass-morphism hover-scale cursor-pointer rounded-lg p-12 text-center transition-all duration-200 ${
        isDragging ? "border-primary" : ""
      }`}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-secondary p-4">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Drop your audio file here</h3>
          <p className="text-sm text-muted-foreground">
            or click to select a file
          </p>
        </div>
      </div>
    </div>
  );
};