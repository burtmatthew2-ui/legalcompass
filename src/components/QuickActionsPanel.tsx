import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  action: () => void;
  variant?: "default" | "outline";
}

export const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Start New Case",
      description: "Submit a new legal case",
      action: () => navigate('/user-portal'),
      variant: "default"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "View Messages",
      description: "Check your conversations",
      action: () => {
        // Navigate to first case with messages
        navigate('/user-portal');
      },
      variant: "outline"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "My Documents",
      description: "Access all documents",
      action: () => navigate('/user-portal?tab=documents'),
      variant: "outline"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Upcoming Events",
      description: "View your calendar",
      action: () => navigate('/user-portal?tab=calendar'),
      variant: "outline"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks at your fingertips
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start gap-2 text-left"
              onClick={action.action}
            >
              <div className="flex items-center gap-2 w-full">
                {action.icon}
                <span className="font-semibold">{action.label}</span>
              </div>
              <span className="text-xs text-muted-foreground font-normal">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
