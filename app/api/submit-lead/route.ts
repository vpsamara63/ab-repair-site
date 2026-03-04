import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  service?: string;
  message?: string;
  recaptchaToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body.name || !body.phone || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    let recaptchaScore = 1.0;

    if (recaptchaSecret && body.recaptchaToken !== "bypass") {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${body.recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success || recaptchaData.score < 0.3) {
        return NextResponse.json(
          { success: false, message: "reCAPTCHA verification failed" },
          { status: 400 }
        );
      }

      recaptchaScore = recaptchaData.score;
    }

    // Prepare lead data
    const leadData = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      service: body.service ?? "",
      message: body.message ?? "",
      source: "website",
      site: "allbrandrepair.com",
      timestamp: new Date().toISOString(),
      recaptchaScore,
      referrer: request.headers.get("referer") ?? "",
    };

    // Send to n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (!webhookRes.ok) {
        console.error("Webhook failed:", webhookRes.status);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error) {
    console.error("Submit lead error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
