import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

export const LawyerProfileEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    bio: '',
    journey_story: '',
    profile_image_url: '',
    years_of_experience: '',
    law_school: '',
    specializations: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('lawyer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      setProfile({
        full_name: data.full_name || '',
        email: data.email || '',
        bio: data.bio || '',
        journey_story: data.journey_story || '',
        profile_image_url: data.profile_image_url || '',
        years_of_experience: data.years_of_experience?.toString() || '',
        law_school: data.law_school || '',
        specializations: data.specializations?.join(', ') || ''
      });
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      // Delete old image if exists
      if (profile.profile_image_url) {
        const oldPath = profile.profile_image_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('lawyer-profiles')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('lawyer-profiles')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Store the path instead of public URL since bucket is now private
      const imagePath = `lawyer-profiles/${fileName}`;
      setProfile(prev => ({ ...prev, profile_image_url: imagePath }));

      toast({
        title: "Success",
        description: "Profile image uploaded",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updates = {
        bio: profile.bio || null,
        journey_story: profile.journey_story || null,
        profile_image_url: profile.profile_image_url || null,
        years_of_experience: profile.years_of_experience ? parseInt(profile.years_of_experience) : null,
        law_school: profile.law_school || null,
        specializations: profile.specializations 
          ? profile.specializations.split(',').map(s => s.trim()).filter(Boolean)
          : null
      };

      const { error } = await supabase
        .from('lawyer_profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading profile...</div>;
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Your Profile</CardTitle>
        <CardDescription>
          Build trust with potential clients by sharing your story and credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.profile_image_url?.startsWith('http') ? profile.profile_image_url : undefined} />
            <AvatarFallback className="text-2xl">{getInitials(profile.full_name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="profile-image" className="cursor-pointer">
              <div className="flex items-center gap-2 text-sm">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span>Upload Profile Photo</span>
              </div>
            </Label>
            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, max 5MB
            </p>
          </div>
        </div>

        {/* Basic Info (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={profile.full_name} disabled />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile.email} disabled />
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years">Years of Experience</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 10"
              value={profile.years_of_experience}
              onChange={(e) => setProfile(prev => ({ ...prev, years_of_experience: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="law-school">Law School</Label>
            <Input
              id="law-school"
              placeholder="e.g., Harvard Law School"
              value={profile.law_school}
              onChange={(e) => setProfile(prev => ({ ...prev, law_school: e.target.value }))}
            />
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-2">
          <Label htmlFor="specializations">Specializations</Label>
          <Input
            id="specializations"
            placeholder="e.g., Personal Injury, Medical Malpractice (comma-separated)"
            value={profile.specializations}
            onChange={(e) => setProfile(prev => ({ ...prev, specializations: e.target.value }))}
          />
          <p className="text-xs text-muted-foreground">
            Enter your specializations separated by commas
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">About Me</Label>
          <Textarea
            id="bio"
            placeholder="Tell potential clients about yourself and your practice..."
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            {profile.bio.length}/500 characters
          </p>
        </div>

        {/* Journey Story */}
        <div className="space-y-2">
          <Label htmlFor="journey">My Journey to Law</Label>
          <Textarea
            id="journey"
            placeholder="Share your story about becoming an attorney, what inspired you, memorable cases, etc..."
            value={profile.journey_story}
            onChange={(e) => setProfile(prev => ({ ...prev, journey_story: e.target.value }))}
            rows={6}
          />
          <p className="text-xs text-muted-foreground">
            Share your authentic story to build trust with clients
          </p>
        </div>

        <div className="flex gap-4">
          <Button onClick={saveProfile} disabled={saving} className="flex-1">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
          <Button variant="outline" onClick={loadProfile}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
