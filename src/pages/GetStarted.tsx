import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Briefcase } from "lucide-react";
import { Helmet } from "react-helmet";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Get Started - Legal Compass</title>
        <meta name="description" content="Choose your path: Get personalized legal help or join as a verified lawyer to connect with qualified leads." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Welcome to Legal Compass</h1>
            <p className="text-lg text-muted-foreground">Choose how you'd like to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Scale className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">I Need Legal Help</CardTitle>
                <CardDescription className="text-center text-base">
                  Access your personalized Snapshot Brief and connect with verified lawyers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Get a clear breakdown of your legal situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Match with verified lawyers in your area</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Only $4.99/month for unlimited access</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate("/user-portal")} 
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <Briefcase className="h-12 w-12 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">I'm a Lawyer</CardTitle>
                <CardDescription className="text-center text-base">
                  Join Legal Compass, verify your credentials, and start connecting with qualified leads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Access pre-qualified legal leads in your practice areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Only pay for leads you choose to purchase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Verified lawyers only - build trust with clients</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate("/lawyer-signup")} 
                  className="w-full"
                  size="lg"
                  variant="secondary"
                >
                  Join as a Lawyer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
