import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Legal Compass - User Agreement & Legal Terms</title>
        <meta name="description" content="Legal Compass terms of service. User agreement, subscription terms, acceptable use policy, disclaimers, and limitations of liability. Read before using our AI legal research platform." />
        <meta name="keywords" content="terms of service, user agreement, legal terms, subscription terms, terms and conditions" />
        <link rel="canonical" href="https://legalcompass.shop/terms-of-service" />
        
        <meta property="og:title" content="Terms of Service - Legal Compass" />
        <meta property="og:description" content="User agreement and legal terms for Legal Compass services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/terms-of-service" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Legal Compass terms of service and user agreement",
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass"
            }
          })}
        </script>
      </Helmet>
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <BreadcrumbNav />
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Legal Compass, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to these terms, you should not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily access and use Legal Compass for personal, non-commercial research purposes. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on Legal Compass</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. No Legal Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-destructive">IMPORTANT:</strong> Legal Compass provides information and research tools only. 
                The service does NOT provide legal advice, does NOT create an attorney-client relationship, and does NOT substitute 
                for consultation with a licensed attorney. You should always consult with a qualified attorney for legal matters 
                affecting your rights or obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Subscription Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Subscriptions to Legal Compass are billed monthly and will automatically renew unless cancelled. You may cancel 
                your subscription at any time through your account settings or the Stripe customer portal. Cancellations will 
                take effect at the end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Account Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that 
                occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on Legal Compass are provided on an &quot;as is&quot; basis. Legal Compass makes no warranties, expressed or 
                implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or 
                other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitations of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Legal Compass or its suppliers be liable for any damages (including, without limitation, damages 
                for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
                on Legal Compass, even if Legal Compass or a Legal Compass authorized representative has been notified orally or in 
                writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on Legal Compass could include technical, typographical, or photographic errors. Legal Compass 
                does not warrant that any of the materials on its service are accurate, complete, or current. Legal Compass may make 
                changes to the materials contained on its service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Legal Compass may revise these terms of service at any time without notice. By using this service you are agreeing to 
                be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our support channels.
              </p>
            </section>

            <p className="text-sm text-muted-foreground/70 mt-12">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default TermsOfService;
