import { NextResponse } from "next/server";
import { db } from "@/db";
import { chefApplications } from "@/db/schema";

export const dynamic = "force-dynamic";

type IncomingBody = {
  name?: string;
  phone?: string;
  city?: string;
  specialty?: string;
  story?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IncomingBody;
    const { name, phone, city, specialty, story } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ ok: false, error: "Naam chahiye." }, { status: 400 });
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Sahi phone number chahiye." },
        { status: 400 }
      );
    }
    if (!city || city.trim().length < 2) {
      return NextResponse.json({ ok: false, error: "Sheher chahiye." }, { status: 400 });
    }
    if (!specialty || specialty.trim().length < 3) {
      return NextResponse.json(
        { ok: false, error: "Signature dish batayiye." },
        { status: 400 }
      );
    }

    await db.insert(chefApplications).values({
      name: name.trim(),
      phone,
      city: city.trim(),
      specialty: specialty.trim(),
      story: story?.trim() || "",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[chef-applications] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Application nahi ja paayi — thodi der mein try karo." },
      { status: 500 }
    );
  }
}
