import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) return null;

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathSegments.map((segment, index) => {
              const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;
              
              return (
                <div key={path} className="flex items-center gap-2">
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-foreground font-medium">
                        {formatSegment(segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={path} className="hover:text-primary transition-colors">
                          {formatSegment(segment)}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
