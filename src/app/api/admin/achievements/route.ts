import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Achievement } from "@/types/achievement";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const achievements = db.getAchievements();
  return NextResponse.json({ success: true, achievements });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Achievement;
    if (!data.title || !data.category) {
      return NextResponse.json({ error: "Title and Category are required" }, { status: 400 });
    }

    if (!data.id) {
      data.id = "ach-" + Date.now().toString(36);
    }

    const saved = db.saveAchievement(data);
    return NextResponse.json({ success: true, achievement: saved });
  } catch (err) {
    console.error("Error creating achievement:", err);
    return NextResponse.json({ error: "Failed to save achievement" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Achievement;
    if (!data.id) {
      return NextResponse.json({ error: "Achievement ID is required" }, { status: 400 });
    }

    const saved = db.saveAchievement(data);
    return NextResponse.json({ success: true, achievement: saved });
  } catch (err) {
    console.error("Error updating achievement:", err);
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 });
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
      return NextResponse.json({ error: "Achievement ID is required" }, { status: 400 });
    }

    const success = db.deleteAchievement(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting achievement:", err);
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 });
  }
}
