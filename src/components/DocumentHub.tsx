import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { downloadTemplate, templates } from "@/utils/templateGenerator";

interface Document {
  title: string;
  description: string;
  category: string;
  templateKey: string;
}

const documents: Document[] = [
  {
    title: "Cease & Desist Letter Template",
    description: "Professional template to stop harassment or unwanted contact",
    category: "General",
    templateKey: "cease-desist"
  },
  {
    title: "Security Deposit Demand Letter",
    description: "Request return of your security deposit from landlord",
    category: "Housing",
    templateKey: "security-deposit"
  },
  {
    title: "Small Claims Court Guide",
    description: "Step-by-step guide to filing in small claims court",
    category: "Court",
    templateKey: "small-claims"
  },
  {
    title: "Power of Attorney Form",
    description: "Grant someone authority to act on your behalf",
    category: "Estate",
    templateKey: "power-of-attorney"
  },
  {
    title: "FMLA Leave Request",
    description: "Request family or medical leave from your employer",
    category: "Employment",
    templateKey: "fmla-leave"
  },
  {
    title: "Rental Agreement Checklist",
    description: "What to look for before signing a lease",
    category: "Housing",
    templateKey: "rental-checklist"
  },
];

export const DocumentHub = () => {
  const handleDownload = (doc: Document) => {
    try {
      const fileName = doc.title.toLowerCase().replace(/\s+/g, '-');
      downloadTemplate(doc.templateKey, fileName);
      toast.success(`"${doc.title}" downloaded successfully!`, {
        description: "Check your downloads folder"
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed", {
        description: "Please try again or contact support if the issue persists"
      });
    }
  };

  return (
    <section id="templates" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Free Legal Templates & Documents
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Download professionally drafted templates and guides — completely free, no signup required
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-primary mb-1">{doc.category}</div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm leading-tight">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">{doc.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            All templates are professional-grade and customizable for your specific situation
          </p>
        </div>
      </div>
    </section>
  );
};
