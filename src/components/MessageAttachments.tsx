import { useState } from 'react';
import { Download, FileText, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Attachment {
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

interface MessageAttachmentsProps {
  attachments: Attachment[];
}

export function MessageAttachments({ attachments }: MessageAttachmentsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const isImage = (fileType: string) => {
    return fileType.startsWith('image/');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('legal-documents')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleDownload = async (attachment: Attachment) => {
    setDownloadingFile(attachment.file_path);
    try {
      const { data, error } = await supabase.storage
        .from('legal-documents')
        .download(attachment.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('File downloaded');
    } catch (error: any) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    } finally {
      setDownloadingFile(null);
    }
  };

  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="mt-2 space-y-2">
      {attachments.map((attachment, index) => {
        const isImg = isImage(attachment.file_type);

        return (
          <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            {isImg ? (
              <>
                <div
                  className="relative w-32 h-32 rounded cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(getPublicUrl(attachment.file_path))}
                >
                  <img
                    src={getPublicUrl(attachment.file_path)}
                    alt={attachment.file_name}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                    <ImageIcon className="w-6 h-6 text-white opacity-0 hover:opacity-100" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.file_name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(attachment.file_size)}</p>
                </div>
              </>
            ) : (
              <>
                <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.file_name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(attachment.file_size)}</p>
                </div>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDownload(attachment)}
              disabled={downloadingFile === attachment.file_path}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );
      })}

      {/* Image preview dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
