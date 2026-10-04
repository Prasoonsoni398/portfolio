import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Experience } from "@/types/experience";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const experience = db.getExperiences();
  return NextResponse.json({ success: true, experience });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Experience;
    if (!data.role || !data.organization) {
      return NextResponse.json({ error: "Role and Organization are required" }, { status: 400 });
    }

    if (!data.id) {
      data.id = "exp-" + Date.now().toString(36);
    }

    const saved = db.saveExperience(data);
    return NextResponse.json({ success: true, experience: saved });
  } catch (err) {
    console.error("Error creating experience:", err);
    return NextResponse.json({ error: "Failed to save experience" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Experience;
    if (!data.id) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    const saved = db.saveExperience(data);
    return NextResponse.json({ success: true, experience: saved });
  } catch (err) {
    console.error("Error updating experience:", err);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    const success = db.deleteExperience(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting experience:", err);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
