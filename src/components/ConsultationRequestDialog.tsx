import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ConsultationRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedLawyerId?: string;
  preselectedPracticeArea?: string;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

const PRACTICE_AREAS = [
  "Family Law", "Criminal Defense", "Personal Injury", "Real Estate", "Business Law",
  "Immigration", "Employment Law", "Estate Planning", "Bankruptcy", "Intellectual Property",
  "Civil Rights", "Tax Law"
];

const URGENCY_LEVELS = [
  { value: "low", label: "Low - No immediate deadline" },
  { value: "medium", label: "Medium - Need help within 2-4 weeks" },
  { value: "high", label: "High - Urgent, need help within 1 week" }
];

export function ConsultationRequestDialog({
  open,
  onOpenChange,
  preselectedLawyerId,
  preselectedPracticeArea
}: ConsultationRequestDialogProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    legalTopic: preselectedPracticeArea || "",
    state: "",
    urgencyLevel: "medium",
    description: "",
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.legalTopic || !formData.state || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.description.length < 50) {
      toast.error("Please provide more details about your case (at least 50 characters)");
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to request a consultation");
        navigate("/auth");
        return;
      }

      // Create legal case (lead)
      const { data: caseData, error: caseError } = await supabase
        .from('legal_cases')
        .insert({
          user_id: user.id,
          legal_topic: formData.legalTopic,
          state: formData.state,
          urgency_level: formData.urgencyLevel,
          description: formData.description,
          status: 'open'
        })
        .select()
        .single();

      if (caseError) throw caseError;

      // If a specific lawyer was preselected, notify them
      if (preselectedLawyerId) {
        await supabase.functions.invoke('notify-new-lead', {
          body: {
            lawyerId: preselectedLawyerId,
            leadId: caseData.id
          }
        });
      }

      toast.success("Consultation request submitted! Attorneys will be notified.");
      onOpenChange(false);
      navigate('/client-dashboard');

    } catch (error) {
      console.error('Error submitting consultation:', error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Free Consultation</DialogTitle>
          <DialogDescription>
            Tell us about your legal situation. We'll match you with qualified attorneys in your area.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Legal Topic */}
          <div className="space-y-2">
            <Label htmlFor="legalTopic">
              What type of legal help do you need? <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.legalTopic}
              onValueChange={(value) => setFormData({ ...formData, legalTopic: value })}
            >
              <SelectTrigger id="legalTopic">
                <SelectValue placeholder="Select practice area" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {PRACTICE_AREAS.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">
              Which state are you in? <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value })}
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent className="bg-background max-h-60">
                {US_STATES.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Urgency */}
          <div className="space-y-2">
            <Label htmlFor="urgency">
              How urgent is your situation? <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.urgencyLevel}
              onValueChange={(value) => setFormData({ ...formData, urgencyLevel: value })}
            >
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {URGENCY_LEVELS.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Describe your legal situation <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide as much detail as possible about your situation, including any relevant dates, documents, or circumstances..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {formData.description.length} characters (minimum 50)
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Your information will only be shared with attorneys you're matched with.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
