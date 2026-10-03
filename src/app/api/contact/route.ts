import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";

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

    // In production, forward to Resend, SendGrid, or nodemailer.
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully."
      },
      { status: 200 }
    );
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
