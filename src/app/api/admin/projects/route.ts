import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Project } from "@/types/project";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = db.getProjects();
  return NextResponse.json({ success: true, projects });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Project;
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    if (!data.id) {
      data.id = data.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }

    const saved = db.saveProject(data);
    return NextResponse.json({ success: true, project: saved });
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Project;
    if (!data.id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const saved = db.saveProject(data);
    return NextResponse.json({ success: true, project: saved });
  } catch (err) {
    console.error("Error updating project:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const success = db.deleteProject(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting project:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
