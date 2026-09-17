import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

type VerifyBody = {
  orderNumber?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyBody;
    const {
      orderNumber,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !orderNumber ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing payment details." },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { ok: false, error: "Payment gateway not configured." },
        { status: 500 }
      );
    }

    // Recompute the signature Razorpay would have sent and compare
    // using a constant-time check — never trust the client's word alone.
    const expected = createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "utf8");
    const gotBuf = Buffer.from(razorpay_signature, "utf8");
    const isValid =
      expectedBuf.length === gotBuf.length &&
      timingSafeEqual(expectedBuf, gotBuf);

    if (!isValid) {
      await db
        .update(orders)
        .set({ paymentStatus: "failed" })
        .where(eq(orders.orderNumber, orderNumber));
      return NextResponse.json(
        { ok: false, error: "Payment verification failed." },
        { status: 400 }
      );
    }

    await db
      .update(orders)
      .set({
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      })
      .where(eq(orders.orderNumber, orderNumber));

    return NextResponse.json({ ok: true, orderNumber });
  } catch (error) {
    console.error("[orders/verify] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Verification failed — try again." },
      { status: 500 }
    );
  }
}
