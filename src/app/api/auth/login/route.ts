import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, password } = await req.json();

    if (!password || (!email && !phone)) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where: email ? { email } : { phone },
      include: { role: true },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ success: false, error: "Account is disabled" }, { status: 403 });
    }

    const payload = {
      userId: user.id,
      email: user.email ?? undefined,
      phone: user.phone ?? undefined,
      roleId: user.roleId,
      roleName: user.role.name,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await db.user.update({ where: { id: user.id }, data: { refreshToken } });

    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role.name,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
