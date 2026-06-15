import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      garmentType,
      description,
      inspirationImages,
      fabricId,
      selectedColor,
      notes,
      deliveryDate,
      measurements,
    } = body;

    if (!garmentType) {
      return NextResponse.json({ success: false, error: "Garment type is required" }, { status: 400 });
    }

    const requestNumber = `CF-TAI-${generateOrderNumber().split("-")[1]}`;

    const request = await db.tailoringRequest.create({
      data: {
        requestNumber,
        userId: user.userId,
        garmentType,
        description: description || null,
        inspirationImages: inspirationImages || [],
        fabricId: fabricId || null,
        selectedColor: selectedColor || null,
        notes: notes || null,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        status: "REQUEST_RECEIVED",
      },
    });

    if (measurements) {
      await db.measurement.create({
        data: {
          userId: user.userId,
          tailoringRequestId: request.id,
          ...measurements,
        },
      });
    }

    await db.productionTracking.create({
      data: {
        tailoringRequestId: request.id,
        status: "REQUEST_RECEIVED",
        notes: "Request received and queued for review",
      },
    });

    await db.notification.create({
      data: {
        userId: user.userId,
        type: "TAILORING_UPDATE",
        title: "Tailoring Request Received",
        message: `Your request ${requestNumber} for ${garmentType} has been received. Our team will review and send a quotation within 24 hours.`,
        link: `/account/orders`,
      },
    });

    return NextResponse.json({ success: true, data: { requestNumber: request.requestNumber, id: request.id } }, { status: 201 });
  } catch (error) {
    console.error("Tailoring POST error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const requests = await db.tailoringRequest.findMany({
      where: { userId: user.userId },
      include: {
        fabric: true,
        measurements: { take: 1 },
        productionSteps: { orderBy: { createdAt: "asc" } },
        quotations: { where: { status: "SENT" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error("Tailoring GET error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
