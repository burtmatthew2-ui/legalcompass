import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  FileText, 
  MapPin, 
  HelpCircle, 
  BookOpen,
  Download,
  Home,
  MessageCircleQuestion,
  ScanSearch,
  TrendingUp
} from "lucide-react";

export const ToolsSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const tools = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MessageCircleQuestion, label: "FAQ", path: "/faq" },
    { icon: ScanSearch, label: "Document Scanner", path: "/document-scanner" },
    { icon: TrendingUp, label: "Case Predictor", path: "/case-estimator" },
    { icon: Download, label: "Templates", path: "/templates" },
    { icon: BookOpen, label: "Legal Resources", path: "/resources" },
    { icon: FileText, label: "Support", path: "/support" },
  ];


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Legal Tools & Resources</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = location.pathname === tool.path;
            
            return (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tool.label}</span>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
