import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InquiryData {
  id: string;
  client_name: string;
  client_email: string;
  project_description: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const inquiry: InquiryData = await req.json();

    const clientEmailContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h1 style="color: #10b981; margin-bottom: 20px;">We've Received Your Inquiry</h1>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hi ${inquiry.client_name},</p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Thank you for reaching out! We've received your project inquiry and we're excited about the possibility of working with you.</p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;"><strong>Project Summary:</strong></p>
      <div style="background: #f9fafb; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 20px;">
        <p style="color: #374151; margin: 0;">${inquiry.project_description}</p>
      </div>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">We'll review your inquiry carefully and get back to you within 24 hours with our initial thoughts and next steps.</p>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">In the meantime, feel free to reach out directly if you have any questions.</p>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #6b7280; font-size: 14px;">
        <p style="margin: 0 0 10px 0;"><strong>MekiTech Solutions</strong></p>
        <p style="margin: 0;">Email: hello@mekitech.com | Phone: +254 700 000 000</p>
      </div>
    </div>
  </body>
</html>
    `;

    const adminEmailContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h1 style="color: #10b981; margin-bottom: 20px;">New Project Inquiry</h1>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">You have received a new project inquiry:</p>
      <div style="background: #f9fafb; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 20px;">
        <p style="color: #374151; margin: 0 0 10px 0;"><strong>Client:</strong> ${inquiry.client_name}</p>
        <p style="color: #374151; margin: 0 0 10px 0;"><strong>Email:</strong> ${inquiry.client_email}</p>
        <p style="color: #374151; margin: 0;"><strong>Inquiry ID:</strong> ${inquiry.id}</p>
      </div>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;"><strong>Project Description:</strong></p>
      <div style="background: #f9fafb; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
        <p style="color: #374151; margin: 0;">${inquiry.project_description}</p>
      </div>
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;"><a href="https://app.mekitech.com/admin/inquiries" style="color: #10b981; text-decoration: none; font-weight: 600;">View in Dashboard →</a></p>
    </div>
  </body>
</html>
    `;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Confirmation emails would be sent here",
        inquiry_id: inquiry.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in send-inquiry-confirmation:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
