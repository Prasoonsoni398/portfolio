import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Education } from "@/types/education";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const education = db.getEducations();
  return NextResponse.json({ success: true, education });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Education;
    if (!data.degree || !data.institution) {
      return NextResponse.json({ error: "Degree and Institution are required" }, { status: 400 });
    }

    if (!data.id) {
      data.id = "edu-" + Date.now().toString(36);
    }

    const saved = db.saveEducation(data);
    return NextResponse.json({ success: true, education: saved });
  } catch (err) {
    console.error("Error creating education:", err);
    return NextResponse.json({ error: "Failed to save education" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Education;
    if (!data.id) {
      return NextResponse.json({ error: "Education ID is required" }, { status: 400 });
    }

    const saved = db.saveEducation(data);
    return NextResponse.json({ success: true, education: saved });
  } catch (err) {
    console.error("Error updating education:", err);
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
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
      return NextResponse.json({ error: "Education ID is required" }, { status: 400 });
    }

    const success = db.deleteEducation(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting education:", err);
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}
