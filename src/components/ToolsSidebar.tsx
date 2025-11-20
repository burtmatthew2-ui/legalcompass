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
  Home
} from "lucide-react";
import { getDocsUrlWithSSO } from "@/utils/ssoToken";

export const ToolsSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const tools = [
    { icon: Home, label: "Home", path: "/" },
    { icon: HelpCircle, label: "Legal Direction Finder", path: "/#direction-finder", hash: true },
    { icon: Download, label: "Templates", path: "docs", external: true },
    { icon: MapPin, label: "Find Local Help", path: "/#local-help", hash: true },
    { icon: BookOpen, label: "Legal Resources", path: "/resources" },
    { icon: FileText, label: "Support", path: "/support" },
  ];

  const handleNavigation = async (path: string, isHash: boolean, isExternal?: boolean) => {
    setOpen(false);
    
    if (isExternal) {
      const url = await getDocsUrlWithSSO("/");
      window.open(url, "_blank");
      return;
    }
    
    if (isHash) {
      const element = document.querySelector(path.split('#')[1] ? `#${path.split('#')[1]}` : path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
            const isActive = tool.hash 
              ? false 
              : location.pathname === tool.path;
            
            return tool.external ? (
              <button
                key={tool.path}
                onClick={() => handleNavigation(tool.path, false, true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-muted"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tool.label}</span>
              </button>
            ) : tool.hash ? (
              <button
                key={tool.path}
                onClick={() => handleNavigation(tool.path, true)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tool.label}</span>
              </button>
            ) : (
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
