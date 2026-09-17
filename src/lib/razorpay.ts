import Razorpay from "razorpay";

let client: Razorpay | null = null;

/**
 * Lazily-created singleton Razorpay client.
 * Throws only when an online-payment route is actually hit without
 * keys configured — COD orders and page loads are unaffected.
 */
export function getRazorpay(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay keys missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment."
    );
  }

  if (!client) {
    client = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  return client;
}
