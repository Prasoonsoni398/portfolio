import { NextResponse } from "next/server";
import { createSessionToken, ADMIN_COOKIE_NAME, DEFAULT_ADMIN } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, email } = body;

    const targetPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN.password;

    if (!password || password !== targetPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    const adminEmail = email || DEFAULT_ADMIN.email;
    const token = createSessionToken(adminEmail);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: { email: adminEmail, role: "admin" }
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
