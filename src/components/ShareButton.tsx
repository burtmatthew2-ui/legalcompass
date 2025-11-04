import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonProps {
  title?: string;
  url?: string;
}

export const ShareButton = ({ title = "Legal Compass - AI Legal Research", url }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
          {copied ? "Copied!" : "Share"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink}>
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("reddit")}>
          Share on Reddit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};