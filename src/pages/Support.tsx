import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Mail, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "@/components/support/ContactForm";
import { LiveChatWidget } from "@/components/support/LiveChatWidget";
import { AIFaq } from "@/components/support/AIFaq";
import { Helmet } from "react-helmet";

const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <>
      <Helmet>
        <title>Customer Support | Legal Compass - Get Help with AI Legal Research</title>
        <meta name="description" content="Need help with Legal Compass? Access our AI FAQ, contact form, or live chat support for assistance with your legal research questions." />
        <meta name="keywords" content="legal compass support, customer service, legal research help, AI legal assistant support" />
        <link rel="canonical" href="https://legalcompass.shop/support" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Customer Support</h1>
              <p className="text-sm text-muted-foreground">We're here to help you</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>How can we help you today?</CardTitle>
            <CardDescription>
              Choose from FAQ, contact form, or live chat support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  AI FAQ
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Form
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Live Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="mt-6">
                <AIFaq />
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <ContactForm />
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <LiveChatWidget />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
    </>
  );
};

export default Support;
