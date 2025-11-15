import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LawyerAvatarProps {
  profileImageUrl: string | null;
  fullName: string;
  className?: string;
}

export const LawyerAvatar = ({ profileImageUrl, fullName, className }: LawyerAvatarProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!profileImageUrl) {
        setImageUrl(null);
        return;
      }

      // If it's already a full URL, use it directly (for backward compatibility)
      if (profileImageUrl.startsWith('http')) {
        setImageUrl(profileImageUrl);
        return;
      }

      try {
        // Get signed URL from storage
        const { data } = await supabase.storage
          .from('lawyer-profiles')
          .createSignedUrl(profileImageUrl.replace('lawyer-profiles/', ''), 3600);

        setImageUrl(data?.signedUrl || null);
      } catch (error) {
        console.error('Error loading profile image:', error);
        setImageUrl(null);
      }
    };

    loadImage();
  }, [profileImageUrl]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl || undefined} alt={fullName} />
      <AvatarFallback className="text-3xl bg-primary/10 text-primary">
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
};
