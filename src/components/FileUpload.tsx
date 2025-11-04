import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  conversationId: string | null;
  onFileUploaded?: (file: { name: string; path: string }) => void;
}

export const FileUpload = ({ conversationId, onFileUploaded }: FileUploadProps) => {
  const { subscription } = useSubscription();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!subscription?.subscribed) {
      toast.error("Subscription required to upload files");
      navigate("/pricing");
      return;
    }
    
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size must be less than 20MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Server-side validation via edge function
      const formData = new FormData();
      formData.append('file', selectedFile);

      const { data: validationResult, error: validationError } = await supabase.functions.invoke(
        'validate-file-upload',
        {
          body: formData,
        }
      );

      if (validationError) {
        throw new Error(validationError.message || "File validation failed");
      }

      if (!validationResult?.valid) {
        throw new Error(validationResult?.error || "File validation failed");
      }

      // Use sanitized filename from validation
      const sanitizedFilename = validationResult.sanitizedFilename || selectedFile.name;
      const filePath = `${user.id}/${Date.now()}_${sanitizedFilename}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("legal-documents")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Save metadata
      const { error: metadataError } = await supabase
        .from("uploaded_documents")
        .insert({
          user_id: user.id,
          conversation_id: conversationId,
          file_name: sanitizedFilename,
          file_path: filePath,
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
        });

      if (metadataError) throw metadataError;

      toast.success("File uploaded successfully");
      setSelectedFile(null);
      onFileUploaded?.({ name: sanitizedFilename, path: filePath });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {!selectedFile ? (
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <FileText className="h-5 w-5 text-primary" />
          <span className="flex-1 text-sm truncate">{selectedFile.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setSelectedFile(null)}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
