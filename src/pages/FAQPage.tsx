import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Legal Compass AI</title>
        <meta name="description" content="Get answers to common questions about Legal Compass AI, including pricing, features, and how our legal guidance platform works." />
        <link rel="canonical" href="https://legalcompass.shop/faq" />
        <meta property="og:title" content="FAQ - Legal Compass AI" />
        <meta property="og:description" content="Common questions about Legal Compass AI legal assistance platform" />
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
