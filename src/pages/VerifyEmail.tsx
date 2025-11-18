import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (error) throw error;

        setStatus('success');
        setMessage('Email verified successfully! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Verification failed. The link may be expired or invalid.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            {status === 'verifying' && 'Verifying your email address...'}
            {status === 'success' && 'Verification Complete!'}
            {status === 'error' && 'Verification Failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {status === 'verifying' && (
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          )}
          {status === 'success' && (
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          )}
          {status === 'error' && (
            <XCircle className="h-16 w-16 text-destructive" />
          )}
          
          <p className="text-center text-muted-foreground">{message}</p>
          
          {status === 'error' && (
            <Button onClick={() => navigate('/auth')} className="mt-4">
              Back to Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
