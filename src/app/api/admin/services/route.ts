import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Service } from "@/types/service";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = db.getServices();
  return NextResponse.json({ success: true, services });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Service;
    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!data.id) {
      data.id = "srv-" + Date.now().toString(36);
    }

    const saved = db.saveService(data);
    return NextResponse.json({ success: true, service: saved });
  } catch (err) {
    console.error("Error creating service:", err);
    return NextResponse.json({ error: "Failed to save service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as Service;
    if (!data.id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const saved = db.saveService(data);
    return NextResponse.json({ success: true, service: saved });
  } catch (err) {
    console.error("Error updating service:", err);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
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
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const success = db.deleteService(id);
    return NextResponse.json({ success });
  } catch (err) {
    console.error("Error deleting service:", err);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
