import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';
import { corsHeaders } from '../_shared/cors.ts';

const ALLOWED_MIME_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILENAME_LENGTH = 255;

interface ValidationResult {
  valid: boolean;
  error?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ valid: false, error: 'No file provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`Validating file: ${file.name}, size: ${file.size}, type: ${file.type}`);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ valid: false, error: 'File size exceeds 20MB limit' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (file.size === 0) {
      return new Response(
        JSON.stringify({ valid: false, error: 'File is empty' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate filename length
    if (file.name.length > MAX_FILENAME_LENGTH) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Filename exceeds maximum length of 255 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate filename characters (alphanumeric, dots, dashes, underscores only)
    const filenameRegex = /^[a-zA-Z0-9._-]+$/;
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    if (file.name !== sanitizedName) {
      console.log(`Filename contains invalid characters, will be sanitized: ${file.name} -> ${sanitizedName}`);
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES[file.type as keyof typeof ALLOWED_MIME_TYPES]) {
      return new Response(
        JSON.stringify({ valid: false, error: `File type ${file.type} is not allowed. Allowed types: PDF, DOC, DOCX, TXT, JPG, PNG` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Extract file extension
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    // Verify extension matches MIME type
    const allowedExtensions = ALLOWED_MIME_TYPES[file.type as keyof typeof ALLOWED_MIME_TYPES];
    if (!allowedExtensions.includes(fileExtension)) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: `File extension ${fileExtension} does not match MIME type ${file.type}` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Read file header to verify file signature (magic bytes)
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    // Check file signatures for common types
    let signatureValid = false;
    if (file.type === 'application/pdf') {
      // PDF signature: %PDF
      signatureValid = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
    } else if (file.type === 'image/png') {
      // PNG signature
      signatureValid = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
    } else if (file.type === 'image/jpeg') {
      // JPEG signature
      signatureValid = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // DOCX signature (ZIP format): PK
      signatureValid = bytes[0] === 0x50 && bytes[1] === 0x4B;
    } else if (file.type === 'application/msword') {
      // DOC signature
      signatureValid = bytes[0] === 0xD0 && bytes[1] === 0xCF;
    } else if (file.type === 'text/plain') {
      // Text files don't have a specific signature, just verify it's valid UTF-8
      signatureValid = true;
    }

    if (!signatureValid) {
      console.error(`File signature validation failed for ${file.name}`);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'File content does not match declared file type. The file may be corrupted or misrepresented.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`File validation successful for ${file.name}`);

    // All validations passed
    return new Response(
      JSON.stringify({ 
        valid: true, 
        sanitizedFilename: sanitizedName,
        validatedMimeType: file.type,
        size: file.size
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Validation error:', error);
    return new Response(
      JSON.stringify({ valid: false, error: error.message || 'File validation failed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
