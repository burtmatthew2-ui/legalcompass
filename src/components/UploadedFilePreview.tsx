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
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    }
    return <FileText className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <span className="text-sm font-medium text-blue-900 w-full">Attached files for AI review:</span>
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-md border border-primary/30 shadow-sm"
        >
          {getFileIcon(file.name)}
          <span className="text-sm text-slate-700 max-w-[200px] truncate">{file.name}</span>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-red-100"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3 text-red-600" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
