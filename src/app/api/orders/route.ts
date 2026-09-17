import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, type OrderItem } from "@/db/schema";
import { getRazorpay } from "@/lib/razorpay";

export const dynamic = "force-dynamic";

type IncomingBody = {
  customerName?: string;
  phone?: string;
  address?: string;
  noteForAunty?: string;
  items?: OrderItem[];
  paymentMethod?: "cod" | "online";
};

function makeOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MM-${stamp}${rand}`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IncomingBody;
    const { customerName, phone, address, noteForAunty, items } = body;
    const paymentMethod = body.paymentMethod === "online" ? "online" : "cod";

    if (!customerName || customerName.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Naam chahiye." },
        { status: 400 }
      );
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Sahi phone number chahiye." },
        { status: 400 }
      );
    }
    if (!address || address.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: "Poora pata chahiye." },
        { status: 400 }
      );
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Dabba khaali hai." },
        { status: 400 }
      );
    }

    const cleanItems: OrderItem[] = items.map((i) => ({
      dishId: Number(i.dishId),
      name: String(i.name),
      aunty: String(i.aunty),
      chefSlug: String(i.chefSlug),
      price: Math.max(0, Math.round(Number(i.price))),
      qty: Math.min(20, Math.max(1, Math.round(Number(i.qty)))),
      image: String(i.image),
    }));

    const subtotal = cleanItems.reduce((s, i) => s + i.price * i.qty, 0);
    const deliveryFee = subtotal >= 299 ? 0 : 25;
    const total = subtotal + deliveryFee;

    const orderNumber = makeOrderNumber();

    const [row] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: customerName.trim(),
        phone,
        address: address.trim(),
        noteForAunty: noteForAunty?.trim() || null,
        items: cleanItems,
        subtotal,
        deliveryFee,
        total,
        status: "placed",
        paymentMethod,
        paymentStatus: paymentMethod === "online" ? "pending" : "cod",
      })
      .returning({ id: orders.id, orderNumber: orders.orderNumber });

    // Cash on delivery: nothing further to do, order is placed.
    if (paymentMethod === "cod") {
      return NextResponse.json({ ok: true, orderNumber: row.orderNumber });
    }

    // Online payment: create a Razorpay order and hand the client
    // what it needs to open the Razorpay checkout widget.
    try {
      const razorpay = getRazorpay();
      const rpOrder = await razorpay.orders.create({
        amount: total * 100, // paise
        currency: "INR",
        receipt: row.orderNumber,
        notes: { orderNumber: row.orderNumber },
      });

      await db
        .update(orders)
        .set({ razorpayOrderId: rpOrder.id })
        .where(eq(orders.id, row.id));

      return NextResponse.json({
        ok: true,
        orderNumber: row.orderNumber,
        razorpayOrderId: rpOrder.id,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (rpError) {
      console.error("[orders] razorpay order creation failed:", rpError);
      await db
        .update(orders)
        .set({ paymentStatus: "failed" })
        .where(eq(orders.id, row.id));
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payment gateway abhi available nahi hai — thodi der mein try karo ya Cash on Delivery चुनो.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[orders] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Order nahi ho paaya — thodi der mein try karo." },
      { status: 500 }
    );
  }
}
