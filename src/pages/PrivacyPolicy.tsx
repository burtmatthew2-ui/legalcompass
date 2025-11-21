import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Legal Compass - AI Legal Research</title>
        <meta name="description" content="Legal Compass privacy policy. Learn how we collect, use, protect your personal information, and your data rights when using our AI legal research services. GDPR compliant." />
        <meta name="keywords" content="privacy policy, data protection, legal compass privacy, user data security, GDPR, data rights" />
        <link rel="canonical" href="https://legalcompass.shop/privacy-policy" />
        
        <meta property="og:title" content="Privacy Policy - Legal Compass" />
        <meta property="og:description" content="Learn how we protect your data and respect your privacy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/privacy-policy" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Legal Compass privacy policy and data protection practices",
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

          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Account information (email address, password)</li>
                <li>Legal research queries and interactions with our AI service</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and manage your subscription</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in 
                the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>With service providers who perform services on our behalf (e.g., payment processing, data analytics)</li>
                <li>To comply with legal obligations or respond to legal requests</li>
                <li>To protect the rights, property, or safety of Legal Compass, our users, or others</li>
                <li>In connection with a merger, sale, or acquisition of all or a portion of our business</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely 
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations, 
                resolve disputes, and enforce our agreements. When you close your account, we will delete or anonymize your data 
                unless we are required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing of your information</li>
                <li>Withdraw consent where we rely on consent to process your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can 
                control cookies through your browser settings, but disabling cookies may affect your ability to use certain features 
                of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service integrates with third-party services including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                <li>Stripe for payment processing</li>
                <li>AI services for legal research functionality</li>
                <li>Analytics providers for service improvement</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third parties have their own privacy policies governing their use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Legal Compass is not intended for users under the age of 18. We do not knowingly collect personal information 
                from children under 18. If you believe we have collected information from a child under 18, please contact us 
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. International Users</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These 
                countries may have data protection laws that differ from those of your country. By using our service, you consent 
                to the transfer of your information to these countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
                new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us through our 
                support channels.
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

export default PrivacyPolicy;
