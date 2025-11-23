import { FileText, Image as ImageIcon, X } from "lucide-react";
import { Button } from "./ui/button";

interface UploadedFilePreviewProps {
  files: Array<{ name: string; path: string }>;
  onRemove?: (index: number) => void;
}

export const UploadedFilePreview = ({ files, onRemove }: UploadedFilePreviewProps) => {
  if (files.length === 0) return null;

  const getFileIcon = (fileName: string) => {
    const ext = fileName.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
      return <ImageIcon className="h-4 w-4 text-primary" />;
    }
    return <FileText className="h-4 w-4 text-accent" />;
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
      <span className="text-sm font-medium text-primary w-full">Attached files for AI review:</span>
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-md border border-primary/30 shadow-sm"
        >
          {getFileIcon(file.name)}
          <span className="text-sm text-foreground max-w-[200px] truncate">{file.name}</span>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-destructive/10"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
