import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, Trash, CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkAction {
  label: string;
  icon: React.ReactNode;
  action: (selectedIds: string[]) => void;
  variant?: "default" | "destructive" | "outline";
}

interface BulkActionsBarProps {
  selectedLeadIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onActionComplete: () => void;
}

export const BulkActionsBar = ({ selectedLeadIds, onSelectionChange, onActionComplete }: BulkActionsBarProps) => {
  const { toast } = useToast();

  const archiveLeads = async (ids: string[]) => {
    try {
      // In production, update lead status in database
      toast({
        title: "Archived",
        description: `${ids.length} lead(s) archived successfully`,
      });
      onSelectionChange([]);
      onActionComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const markAsReviewed = async (ids: string[]) => {
    try {
      toast({
        title: "Updated",
        description: `${ids.length} lead(s) marked as reviewed`,
      });
      onSelectionChange([]);
      onActionComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const actions: BulkAction[] = [
    {
      label: "Mark as Reviewed",
      icon: <CheckSquare className="w-4 h-4" />,
      action: markAsReviewed,
      variant: "default"
    },
    {
      label: "Archive",
      icon: <Archive className="w-4 h-4" />,
      action: archiveLeads,
      variant: "outline"
    }
  ];

  if (selectedLeadIds.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="shadow-lg border-2">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {selectedLeadIds.length} selected
            </Badge>
            <div className="flex gap-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.variant}
                  onClick={() => action.action(selectedLeadIds)}
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onSelectionChange([])}
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
