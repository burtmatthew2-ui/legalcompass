import { supabase } from "@/integrations/supabase/client";

/**
 * Get the current access token for SSO to docs.legalcompass.shop
 */
export const getSSOToken = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch (error) {
    console.error("Error getting SSO token:", error);
    return null;
  }
};

/**
 * Generate a URL to docs.legalcompass.shop with SSO token
 */
export const getDocsUrlWithSSO = async (path: string = "/"): Promise<string> => {
  const token = await getSSOToken();
  const baseUrl = "https://docs.legalcompass.shop";
  const url = new URL(path, baseUrl);
  
  if (token) {
    url.searchParams.set("sso_token", token);
  }
  
  return url.toString();
};
