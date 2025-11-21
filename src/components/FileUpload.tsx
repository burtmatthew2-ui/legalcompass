import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Paperclip, X, FileText, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  conversationId: string | null;
  onFileUploaded?: (file: { name: string; path: string }) => void;
  compact?: boolean;
}

export const FileUpload = ({ conversationId, onFileUploaded, compact = false }: FileUploadProps) => {
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check total files (max 10)
    if (selectedFiles.length + files.length > 10) {
      toast.error("Maximum 10 files allowed");
      return;
    }

    // Check individual file sizes (20MB limit)
    const oversizedFiles = files.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error(`${oversizedFiles.length} file(s) exceed 20MB limit`);
      return;
    }

    // Immediately add files to preview and notify parent
    setSelectedFiles(prev => [...prev, ...files]);
    
    // If compact mode, immediately trigger upload and notify parent
    if (compact && onFileUploaded) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to upload files");
        return;
      }

      for (const file of files) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const { data: validationResult, error: validationError } = await supabase.functions.invoke(
            'validate-file-upload',
            { body: formData }
          );

          if (validationError || !validationResult?.valid) {
            toast.error(`${file.name}: ${validationResult?.error || "Validation failed"}`);
            continue;
          }

          const sanitizedFilename = validationResult.sanitizedFilename || file.name;
          const filePath = `${user.id}/${Date.now()}_${sanitizedFilename}`;

          const { error: uploadError } = await supabase.storage
            .from("legal-documents")
            .upload(filePath, file);

          if (uploadError) {
            toast.error(`${file.name}: Upload failed`);
            continue;
          }

          const { error: metadataError } = await supabase
            .from("uploaded_documents")
            .insert({
              user_id: user.id,
              conversation_id: conversationId,
              file_name: sanitizedFilename,
              file_path: filePath,
              file_size: file.size,
              mime_type: file.type,
            });

          if (metadataError) {
            toast.error(`${file.name}: Metadata save failed`);
            continue;
          }

          onFileUploaded({ name: sanitizedFilename, path: filePath });
        } catch (error: any) {
          console.error(`Upload error for ${file.name}:`, error);
          toast.error(`${file.name}: ${error.message || "Upload failed"}`);
        }
      }
      
      // Clear selected files after upload in compact mode
      setSelectedFiles([]);
      // Reset the input
      event.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let uploadedCount = 0;
      for (const file of selectedFiles) {
        try {
          // Server-side validation via edge function
          const formData = new FormData();
          formData.append('file', file);

          const { data: validationResult, error: validationError } = await supabase.functions.invoke(
            'validate-file-upload',
            { body: formData }
          );

          if (validationError || !validationResult?.valid) {
            toast.error(`${file.name}: ${validationResult?.error || "Validation failed"}`);
            continue;
          }

          // Use sanitized filename from validation
          const sanitizedFilename = validationResult.sanitizedFilename || file.name;
          const filePath = `${user.id}/${Date.now()}_${sanitizedFilename}`;

          // Upload to storage
          const { error: uploadError } = await supabase.storage
            .from("legal-documents")
            .upload(filePath, file);

          if (uploadError) {
            toast.error(`${file.name}: Upload failed`);
            continue;
          }

          // Save metadata
          const { error: metadataError } = await supabase
            .from("uploaded_documents")
            .insert({
              user_id: user.id,
              conversation_id: conversationId,
              file_name: sanitizedFilename,
              file_path: filePath,
              file_size: file.size,
              mime_type: file.type,
            });

          if (metadataError) {
            toast.error(`${file.name}: Metadata save failed`);
            continue;
          }

          onFileUploaded?.({ name: sanitizedFilename, path: filePath });
          uploadedCount++;
        } catch (error: any) {
          console.error(`Upload error for ${file.name}:`, error);
          toast.error(`${file.name}: ${error.message || "Upload failed"}`);
        }
      }

      if (uploadedCount > 0) {
        toast.success(`${uploadedCount} file(s) uploaded successfully`);
        setSelectedFiles([]);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (compact) {
    return (
      <>
        <input
          type="file"
          id="file-upload-compact"
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.heic,.webp"
          multiple
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => document.getElementById("file-upload-compact")?.click()}
          disabled={uploading || selectedFiles.length >= 10}
          className="hover:bg-muted"
          title={selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Attach files'}
        >
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </Button>
      </>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.heic,.webp"
          multiple
        />
        <label htmlFor="file-upload">
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={uploading || selectedFiles.length >= 10}
          >
            <Paperclip className="h-4 w-4 mr-2" />
            {selectedFiles.length > 0 ? `Add More (${selectedFiles.length}/10)` : 'Upload Documents'}
          </Button>
        </label>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              {file.type.startsWith('image/') ? (
                <div className="relative h-12 w-12 flex-shrink-0">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name}
                    className="h-full w-full object-cover rounded"
                  />
                  <ImageIcon className="absolute top-0 right-0 h-4 w-4 text-primary bg-background rounded-full p-0.5" />
                </div>
              ) : (
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
              )}
              <span className="flex-1 text-sm truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className="w-full"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading {selectedFiles.length} file(s)...
              </>
            ) : (
              `Upload ${selectedFiles.length} file(s)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
