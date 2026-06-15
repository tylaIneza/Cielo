import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signAccessToken, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } = await req.json();

    if (!firstName || !lastName || !password || (!email && !phone)) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (email) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
      }
    }

    if (phone) {
      const existing = await db.user.findUnique({ where: { phone } });
      if (existing) {
        return NextResponse.json({ success: false, error: "Phone already registered" }, { status: 409 });
      }
    }

    let customerRole = await db.role.findUnique({ where: { name: "customer" } });
    if (!customerRole) {
      customerRole = await db.role.create({ data: { name: "customer", label: "Customer" } });
    }

    const passwordHash = await hashPassword(password);
    const verifyToken = generateToken();

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email: email || null,
        phone: phone || null,
        passwordHash,
        roleId: customerRole.id,
        verifyToken,
      },
      include: { role: true },
    });

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email ?? undefined,
      phone: user.phone ?? undefined,
      roleId: user.roleId,
      roleName: user.role.name,
    });

    return NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, role: user.role.name },
        accessToken,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
