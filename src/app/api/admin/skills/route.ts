import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SkillGroup } from "@/types/skill";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const skills = db.getSkills();
  return NextResponse.json({ success: true, skills });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as SkillGroup[];
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Expected an array of skill groups" }, { status: 400 });
    }

    const success = db.saveSkills(data);
    return NextResponse.json({ success, skills: data });
  } catch (err) {
    console.error("Error saving skills:", err);
    return NextResponse.json({ error: "Failed to update skills" }, { status: 500 });
  }
}
