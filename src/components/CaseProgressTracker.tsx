import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface CaseProgressTrackerProps {
  status: 'submitted' | 'accepted' | 'resolved' | 'open' | 'closed';
}

export const CaseProgressTracker = ({ status }: CaseProgressTrackerProps) => {
  const stages = [
    { id: 'submitted', label: 'Submitted', statuses: ['open', 'submitted'] },
    { id: 'accepted', label: 'Accepted', statuses: ['accepted'] },
    { id: 'resolved', label: 'Resolved', statuses: ['resolved', 'closed'] }
  ];

  const getCurrentStageIndex = () => {
    if (status === 'open' || status === 'submitted') return 0;
    if (status === 'accepted') return 1;
    if (status === 'resolved' || status === 'closed') return 2;
    return 0;
  };

  const currentStageIndex = getCurrentStageIndex();

  return (
    <Card className="border-muted">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  index <= currentStageIndex
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 bg-background text-muted-foreground'
                }`}>
                  {index < currentStageIndex ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : index === currentStageIndex ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  index <= currentStageIndex ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {stage.label}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  index < currentStageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
