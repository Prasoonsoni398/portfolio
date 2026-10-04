import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const errors = validateContactForm(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Persist lead directly into Portfolio CRM Lead Database
    try {
      db.addInquiry({
        name: body.name,
        email: body.email,
        subject: body.subject || "New Portfolio Inquiry",
        message: body.message
      });
    } catch (dbErr) {
      console.error("Failed to store lead inquiry in CRM db:", dbErr);
    }

    // EmailJS Credentials from .env
    const serviceId =
      process.env.EMAILJS_SERVICE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      "service_fp638bb";

    const templateId =
      process.env.EMAILJS_TEMPLATE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      "template_zxr38k5";

    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    });

    // If EmailJS Public Key is configured, dispatch through EmailJS REST API
    if (publicKey) {
      const emailPayload: Record<string, unknown> = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: body.name,
          email: body.email,
          subject: body.subject || "New Portfolio Inquiry",
          message: body.message,
          time: currentTime
        }
      };

      if (privateKey) {
        emailPayload.accessToken = privateKey;
      }

      const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailPayload)
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("EmailJS API submission failed:", emailResponse.status, errorText);
        return NextResponse.json(
          {
            success: false,
            message: `EmailJS error: ${errorText || "Failed to dispatch email"}`
          },
          { status: emailResponse.status }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Your message has been sent successfully via EmailJS."
        },
        { status: 200 }
      );
    } else {
      // Public key is not yet set in .env
      console.warn(
        "EmailJS Warning: Service ID ('" +
          serviceId +
          "') and Template ID ('" +
          templateId +
          "') are configured, but NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not provided in .env."
      );

      return NextResponse.json(
        {
          success: true,
          message: "Form validated successfully. Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env to deliver live emails."
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or contact me directly via email."
      },
      { status: 500 }
    );
  }
}
