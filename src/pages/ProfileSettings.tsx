import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Mail, Phone, Calendar, User as UserIcon, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Profile fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  
  // Verification states
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check theme preference
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme !== 'light';
    setIsDarkMode(isDark);
    
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      setEmail(session.user.email || "");
      setEmailVerified(session.user.email_confirmed_at !== null);

      // Fetch profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setPhoneNumber(profile.phone_number || "");
        setDateOfBirth(profile.date_of_birth || "");
        setPhoneVerified(profile.phone_verified || false);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone_number: phoneNumber || null,
          date_of_birth: dateOfBirth || null,
          profile_completed: !!fullName,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!phoneNumber || !user) {
      toast.error("Please enter a phone number");
      return;
    }

    setSendingCode(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-phone-verification", {
        body: { phoneNumber },
      });

      if (error) throw error;

      setShowVerificationInput(true);
      
      // In dev mode, show the code to the user
      if (data?.devCode) {
        toast.success(`Dev Mode: Your verification code is ${data.devCode}`, {
          duration: 10000,
        });
      } else {
        toast.success("Verification code sent to your phone");
      }
    } catch (error: any) {
      console.error("Error sending verification code:", error);
      toast.error(error?.message || "Failed to send verification code");
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || !user) {
      toast.error("Please enter the verification code");
      return;
    }

    setVerifyingCode(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-phone-code", {
        body: { code: verificationCode, phoneNumber },
      });

      if (error) throw error;

      if (data?.success) {
        setPhoneVerified(true);
        setShowVerificationInput(false);
        setVerificationCode("");
        toast.success("Phone number verified successfully");
        
        // Update profile with verified status
        await supabase
          .from("profiles")
          .update({ phone_verified: true })
          .eq("id", user.id);
      } else {
        throw new Error("Verification failed");
      }
    } catch (error: any) {
      console.error("Error verifying code:", error);
      toast.error(error?.message || "Invalid verification code. Please try again.");
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleSendEmailVerification = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      toast.success("Verification email sent");
    } catch (error) {
      console.error("Error sending email verification:", error);
      toast.error("Failed to send verification email");
    }
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    
    if (checked) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    
    toast.success(`Switched to ${checked ? 'dark' : 'light'} mode`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground mt-2">
              Complete your profile to get the most out of Legal Compass
            </p>
          </div>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                This information will be shared with lawyers when you submit a case
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  <UserIcon className="w-4 h-4 inline mr-2" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-background"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                  {emailVerified ? (
                    <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 inline ml-2 text-destructive" />
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                  {!emailVerified && (
                    <Button
                      onClick={handleSendEmailVerification}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Verify Email
                    </Button>
                  )}
                </div>
                {!emailVerified && (
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for a verification link
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number (Optional)
                  {phoneVerified ? (
                    <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 inline ml-2 text-muted-foreground" />
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="bg-background"
                    disabled={phoneVerified}
                  />
                  {!phoneVerified && phoneNumber && (
                    <Button
                      onClick={handleSendVerificationCode}
                      disabled={sendingCode}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {sendingCode ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        "Send Code"
                      )}
                    </Button>
                  )}
                </div>
                {showVerificationInput && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="bg-background"
                      maxLength={6}
                    />
                    <Button
                      onClick={handleVerifyCode}
                      disabled={verifyingCode || verificationCode.length !== 6}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {verifyingCode ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth (Optional)
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Theme Toggle */}
              <div className="space-y-2">
                <Label htmlFor="theme-toggle" className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  Appearance
                </Label>
                <div className="flex items-center justify-between p-4 border-2 border-border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <Switch
                    id="theme-toggle"
                    checked={isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Toggle between dark and light theme
                </p>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveProfile}
                disabled={saving || !fullName}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileSettings;