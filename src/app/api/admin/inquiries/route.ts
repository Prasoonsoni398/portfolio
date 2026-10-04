import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Inquiry } from "@/types/inquiry";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inquiries = db.getInquiries();
  return NextResponse.json({ success: true, inquiries });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Partial<Inquiry> & { id: string };
    if (!data.id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const updated = db.updateInquiry(data.id, data);
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err) {
    console.error("Error updating inquiry:", err);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
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
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const success = db.deleteInquiry(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting inquiry:", err);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
