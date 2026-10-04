import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Certification } from "@/types/certification";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const certifications = db.getCertifications();
  return NextResponse.json({ success: true, certifications });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Certification;
    if (!data.title || !data.issuer) {
      return NextResponse.json({ error: "Title and Issuer are required" }, { status: 400 });
    }

    if (!data.id) {
      data.id = "cert-" + Date.now().toString(36);
    }

    const saved = db.saveCertification(data);
    return NextResponse.json({ success: true, certification: saved });
  } catch (err) {
    console.error("Error creating certification:", err);
    return NextResponse.json({ error: "Failed to save certification" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Certification;
    if (!data.id) {
      return NextResponse.json({ error: "Certification ID is required" }, { status: 400 });
    }

    const saved = db.saveCertification(data);
    return NextResponse.json({ success: true, certification: saved });
  } catch (err) {
    console.error("Error updating certification:", err);
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
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
      return NextResponse.json({ error: "Certification ID is required" }, { status: 400 });
    }

    const success = db.deleteCertification(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting certification:", err);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}
