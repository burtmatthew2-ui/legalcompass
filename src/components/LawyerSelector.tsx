import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LawyerProfileCard } from "@/components/LawyerProfileCard";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface Lawyer {
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
}

interface LawyerSelectorProps {
  leadId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLawyerSelected: () => void;
}

export const LawyerSelector = ({ leadId, open, onOpenChange, onLawyerSelected }: LawyerSelectorProps) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadInterestedLawyers();
    }
  }, [open, leadId]);

  const loadInterestedLawyers = async () => {
    try {
      // Get all lawyers who purchased this lead
      const { data: purchases, error: purchasesError } = await supabase
        .from('lead_purchases')
        .select('lawyer_id')
        .eq('lead_id', leadId)
        .eq('status', 'active');

      if (purchasesError) throw purchasesError;

      if (!purchases || purchases.length === 0) {
        setLawyers([]);
        setLoading(false);
        return;
      }

      const lawyerIds = purchases.map(p => p.lawyer_id);

      // Get lawyer profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('lawyer_profiles')
        .select('*')
        .in('user_id', lawyerIds)
        .eq('verified_status', true);

      if (profilesError) throw profilesError;

      setLawyers(profiles || []);

      // Load ratings for each lawyer
      const ratingsData: { [key: string]: any[] } = {};
      for (const lawyer of profiles || []) {
        const { data: lawyerRatings } = await supabase
          .from('lawyer_ratings')
          .select('*')
          .eq('lawyer_id', lawyer.user_id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (lawyerRatings) {
          ratingsData[lawyer.user_id] = lawyerRatings;
        }
      }
      setRatings(ratingsData);

    } catch (error: any) {
      console.error('Error loading lawyers:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectLawyer = async (lawyerId: string) => {
    try {
      // In a full implementation, you might want to:
      // 1. Update the case to mark which lawyer was selected
      // 2. Notify other lawyers that the case was filled
      // 3. Initiate first contact or consultation booking
      
      toast({
        title: "Lawyer Selected",
        description: "Your lawyer has been notified and will reach out soon",
      });

      onLawyerSelected();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error selecting lawyer:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Lawyer</DialogTitle>
          <DialogDescription>
            {lawyers.length} verified {lawyers.length === 1 ? 'lawyer has' : 'lawyers have'} shown interest in your case
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading lawyer profiles...
          </div>
        ) : lawyers.length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No lawyers have accepted your case yet. You'll be notified when lawyers show interest.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6 mt-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Review each lawyer's profile, experience, and ratings to choose the best fit for your case.
              </AlertDescription>
            </Alert>

            {lawyers.map((lawyer) => (
              <LawyerProfileCard
                key={lawyer.user_id}
                lawyer={lawyer}
                ratings={ratings[lawyer.user_id] || []}
                onSelect={() => selectLawyer(lawyer.user_id)}
                showSelectButton={true}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
