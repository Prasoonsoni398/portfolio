import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileSettings } from "@/types/profile";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = db.getProfile();
  return NextResponse.json({ success: true, profile });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Partial<ProfileSettings>;
    const updated = db.updateProfile(data);
    return NextResponse.json({ success: true, profile: updated });
  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
