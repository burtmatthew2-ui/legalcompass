import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ, faqs } from "@/components/FAQ";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const FAQPage = () => {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://legalcompass.shop/" },
        { name: "FAQ", url: "https://legalcompass.shop/faq" }
      ]} />
      <FAQPageSchema faqs={faqs} />
      <Helmet>
        <title>FAQ | Answers About Legal Help & Templates | Legal Compass</title>
        <meta name="description" content="Common questions answered: pricing, free templates, AI legal help, attorney connections, privacy, and more. Get instant answers to your legal questions." />
        <link rel="canonical" href="https://legalcompass.shop/faq" />
        <meta property="og:title" content="FAQ | Legal Compass Help & Answers" />
        <meta property="og:description" content="Get instant answers about pricing, templates, AI help, and attorney connections." />
        <meta property="og:url" content="https://legalcompass.shop/faq" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BreadcrumbNav />
        <main className="flex-1 py-12 md:py-16 px-4 md:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-center text-lg text-muted-foreground mb-12">
              Everything you need to know about Legal Compass
            </p>
            <FAQ />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
