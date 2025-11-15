import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LawyerProfileImageProps {
  profileImageUrl: string | null;
  alt: string;
  className?: string;
}

export const LawyerProfileImage = ({ profileImageUrl, alt, className }: LawyerProfileImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      if (!profileImageUrl) {
        setImageUrl(null);
        setLoading(false);
        return;
      }

      // If it's already a full URL, use it directly (for backward compatibility)
      if (profileImageUrl.startsWith('http')) {
        setImageUrl(profileImageUrl);
        setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [profileImageUrl]);

  if (loading || !imageUrl) {
    return null;
  }

  return <img src={imageUrl} alt={alt} className={className} />;
};
