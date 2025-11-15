import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConsultationRequestDialog } from "@/components/ConsultationRequestDialog";
import { LawyerAvatar } from "@/components/LawyerAvatar";
import { Star, MapPin, Briefcase, GraduationCap, Award, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

interface LawyerProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio: string | null;
  journey_story: string | null;
  practice_areas: string[];
  states_licensed: string[];
  years_of_experience: number | null;
  law_school: string | null;
  profile_image_url: string | null;
  verified_status: boolean;
  average_rating: number;
  total_ratings: number;
  total_leads_purchased: number;
}

interface Review {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  client_id: string;
}

export default function AttorneyProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<LawyerProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLawyerProfile();
    }
  }, [id]);

  const fetchLawyerProfile = async () => {
    try {
      const { data: lawyerData, error: lawyerError } = await supabase
        .from('lawyer_profiles')
        .select('*')
        .eq('user_id', id)
        .eq('verified_status', true)
        .maybeSingle();

      if (lawyerError) throw lawyerError;
      if (!lawyerData) {
        toast.error('Attorney not found');
        navigate('/find-lawyers');
        return;
      }

      setLawyer(lawyerData);

      const { data: reviewsData, error: reviewsError } = await supabase
        .from('lawyer_ratings')
        .select('*')
        .eq('lawyer_id', id)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;
      setReviews(reviewsData || []);
    } catch (error) {
      console.error('Error fetching attorney profile:', error);
      toast.error('Failed to load attorney profile');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestConsultation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to request a consultation");
      navigate("/auth");
      return;
    }

    setShowConsultationDialog(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lawyer) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Helmet>
        <title>{lawyer.full_name} - Legal Compass Attorney</title>
        <meta name="description" content={lawyer.bio || `View ${lawyer.full_name}'s profile, reviews, and request a consultation.`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-secondary/5 to-background">
        <Navbar />
        
        <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
          {/* Header Section */}
          <Card className="mb-8">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row gap-6">
                <LawyerAvatar 
                  profileImageUrl={lawyer.profile_image_url}
                  fullName={lawyer.full_name}
                  className="w-32 h-32"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{lawyer.full_name}</h1>
                    {lawyer.verified_status && (
                      <Award className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(Math.round(lawyer.average_rating))}
                    <span className="text-lg font-semibold">{lawyer.average_rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      ({lawyer.total_ratings} {lawyer.total_ratings === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                    {lawyer.years_of_experience && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{lawyer.years_of_experience} years experience</span>
                      </div>
                    )}
                    {lawyer.law_school && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>{lawyer.law_school}</span>
                      </div>
                    )}
                  </div>

                  <Button onClick={handleRequestConsultation} size="lg" className="w-full md:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Request Consultation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              {lawyer.bio && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">About</h2>
                    <p className="text-muted-foreground leading-relaxed">{lawyer.bio}</p>
                  </CardContent>
                </Card>
              )}

              {/* Journey */}
              {lawyer.journey_story && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">My Journey</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {lawyer.journey_story}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Reviews */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    Client Reviews ({reviews.length})
                  </h2>

                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No reviews yet. Be the first to work with this attorney!
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id}>
                          <div className="flex items-center gap-2 mb-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {review.review && (
                            <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                          )}
                          <Separator className="mt-6" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Practice Areas */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground">Practice Areas</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.practice_areas.map((area, idx) => (
                      <Badge key={idx} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Licensed States */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground">Licensed In</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.states_licensed.map((state, idx) => (
                      <Badge key={idx} variant="outline">
                        {state}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4 text-foreground">Statistics</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cases Completed</span>
                      <span className="font-semibold text-foreground">{lawyer.total_leads_purchased}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Client Reviews</span>
                      <span className="font-semibold text-foreground">{lawyer.total_ratings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Rating</span>
                      <span className="font-semibold text-foreground">{lawyer.average_rating.toFixed(1)} / 5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <ConsultationRequestDialog
        open={showConsultationDialog}
        onOpenChange={setShowConsultationDialog}
        preselectedLawyerId={id}
        preselectedPracticeArea={lawyer?.practice_areas[0]}
      />
    </>
  );
}
