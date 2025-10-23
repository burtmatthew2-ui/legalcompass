import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen">
      {showChat ? (
        <ChatInterface onBack={() => setShowChat(false)} />
      ) : (
        <Hero onGetStarted={() => setShowChat(true)} />
      )}
    </div>
  );
};

export default Index;
