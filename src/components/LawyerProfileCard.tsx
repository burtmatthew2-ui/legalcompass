import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, GraduationCap, Briefcase, Mail, Award } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface LawyerRating {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  client_name?: string;
}

interface LawyerProfileProps {
  lawyer: {
    user_id: string;
    full_name: string;
    email: string;
    profile_image_url: string | null;
    bio: string | null;
    journey_story: string | null;
    practice_areas: string[];
    states_licensed: string[];
    years_of_experience: number | null;
    law_school: string | null;
    specializations: string[] | null;
    average_rating: number;
    total_ratings: number;
    bar_number: string;
  };
  ratings?: LawyerRating[];
  onSelect?: () => void;
  showSelectButton?: boolean;
  compact?: boolean;
}

export const LawyerProfileCard = ({ 
  lawyer, 
  ratings = [], 
  onSelect, 
  showSelectButton = false,
  compact = false 
}: LawyerProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!lawyer.profile_image_url) {
        setImageUrl(null);
        return;
      }

      // If it's already a full URL, use it directly (for backward compatibility)
      if (lawyer.profile_image_url.startsWith('http')) {
        setImageUrl(lawyer.profile_image_url);
        return;
      }

      // Otherwise, get signed URL from storage
      const { data } = await supabase.storage
        .from('lawyer-profiles')
        .createSignedUrl(lawyer.profile_image_url.replace('lawyer-profiles/', ''), 3600);

      setImageUrl(data?.signedUrl || null);
    };

    loadImage();
  }, [lawyer.profile_image_url]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (compact) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl || undefined} />
              <AvatarFallback className="text-lg">{getInitials(lawyer.full_name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{lawyer.full_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(lawyer.average_rating)}
                    <span className="text-sm text-muted-foreground">
                      ({lawyer.total_ratings} {lawyer.total_ratings === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
                {showSelectButton && onSelect && (
                  <Button onClick={onSelect}>Select Lawyer</Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {lawyer.practice_areas.slice(0, 3).map((area, idx) => (
                  <Badge key={idx} variant="secondary">{area}</Badge>
                ))}
                {lawyer.practice_areas.length > 3 && (
                  <Badge variant="outline">+{lawyer.practice_areas.length - 3} more</Badge>
                )}
              </div>
              {lawyer.years_of_experience && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {lawyer.years_of_experience} years experience
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={imageUrl || undefined} />
            <AvatarFallback className="text-2xl">{getInitials(lawyer.full_name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{lawyer.full_name}</CardTitle>
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(lawyer.average_rating)}
                  <span className="text-sm font-medium">
                    {lawyer.average_rating.toFixed(1)} ({lawyer.total_ratings} {lawyer.total_ratings === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
              {showSelectButton && onSelect && (
                <Button size="lg" onClick={onSelect}>
                  Select This Lawyer
                </Button>
              )}
            </div>
            <CardDescription className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {lawyer.email}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Key Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lawyer.years_of_experience && (
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium">{lawyer.years_of_experience} Years</p>
                <p className="text-muted-foreground text-xs">Experience</p>
              </div>
            </div>
          )}
          {lawyer.law_school && (
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium">{lawyer.law_school}</p>
                <p className="text-muted-foreground text-xs">Law School</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium">Bar #{lawyer.bar_number}</p>
              <p className="text-muted-foreground text-xs">Verified Attorney</p>
            </div>
          </div>
        </div>

        {/* Licensed States */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Licensed in
          </h4>
          <div className="flex flex-wrap gap-2">
            {lawyer.states_licensed.map((state, idx) => (
              <Badge key={idx} variant="outline">{state}</Badge>
            ))}
          </div>
        </div>

        {/* Practice Areas */}
        <div>
          <h4 className="font-semibold mb-2">Practice Areas</h4>
          <div className="flex flex-wrap gap-2">
            {lawyer.practice_areas.map((area, idx) => (
              <Badge key={idx} variant="secondary">{area}</Badge>
            ))}
          </div>
        </div>

        {/* Specializations */}
        {lawyer.specializations && lawyer.specializations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {lawyer.specializations.map((spec, idx) => (
                <Badge key={idx}>{spec}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        {lawyer.bio && (
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{lawyer.bio}</p>
          </div>
        )}

        {/* Journey Story */}
        {lawyer.journey_story && (
          <div>
            <h4 className="font-semibold mb-2">My Journey to Law</h4>
            <ScrollArea className="h-32">
              <p className="text-sm text-muted-foreground whitespace-pre-line pr-4">
                {lawyer.journey_story}
              </p>
            </ScrollArea>
          </div>
        )}

        {/* Recent Reviews */}
        {ratings.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Recent Reviews</h4>
            <div className="space-y-3">
              {ratings.slice(0, 3).map((rating) => (
                <div key={rating.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    {renderStars(rating.rating)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {rating.review && (
                    <p className="text-sm text-muted-foreground">{rating.review}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
