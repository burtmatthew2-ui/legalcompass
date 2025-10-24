import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {showChat ? (
          <ChatInterface onBack={() => setShowChat(false)} />
        ) : (
          <Hero onGetStarted={() => setShowChat(true)} />
        )}
      </div>
      {!showChat && <Footer />}
    </div>
  );
};

export default Index;
