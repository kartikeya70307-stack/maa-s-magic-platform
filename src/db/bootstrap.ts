import { pool } from "@/db";

/**
 * Runtime safety-net: ensures tables exist and are seeded exactly once
 * at server startup, so the app always boots with real data.
 */
export async function bootstrapDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chefs (
        id serial PRIMARY KEY,
        slug text NOT NULL UNIQUE,
        name text NOT NULL,
        aunty text NOT NULL,
        city text NOT NULL,
        area text NOT NULL,
        cuisine text NOT NULL,
        tagline text NOT NULL,
        story text NOT NULL,
        image text NOT NULL,
        since integer NOT NULL,
        rating real NOT NULL,
        orders_served integer NOT NULL,
        badge text NOT NULL,
        kitchen_type text NOT NULL,
        delivery_time text NOT NULL,
        timings text NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dishes (
        id serial PRIMARY KEY,
        chef_id integer NOT NULL REFERENCES chefs(id),
        name text NOT NULL,
        hindi_name text NOT NULL,
        description text NOT NULL,
        price integer NOT NULL,
        image text NOT NULL,
        category text NOT NULL,
        is_veg boolean NOT NULL DEFAULT true,
        spice_level text NOT NULL,
        is_bestseller boolean NOT NULL DEFAULT false,
        rating real NOT NULL,
        serves text NOT NULL,
        available text NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id serial PRIMARY KEY,
        order_number text NOT NULL UNIQUE,
        customer_name text NOT NULL,
        phone text NOT NULL,
        address text NOT NULL,
        note_for_aunty text,
        items jsonb NOT NULL,
        subtotal integer NOT NULL,
        delivery_fee integer NOT NULL,
        total integer NOT NULL,
        status text NOT NULL DEFAULT 'placed',
        payment_method text NOT NULL DEFAULT 'cod',
        payment_status text NOT NULL DEFAULT 'pending',
        razorpay_order_id text,
        razorpay_payment_id text,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);
    // Safety net for databases created before payment columns existed.
    await pool.query(`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cod';
    `);
    await pool.query(`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'pending';
    `);
    await pool.query(`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_order_id text;
    `);
    await pool.query(`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_payment_id text;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chef_applications (
        id serial PRIMARY KEY,
        name text NOT NULL,
        phone text NOT NULL,
        city text NOT NULL,
        specialty text NOT NULL,
        story text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);

    const { seed } = await import("@/db/seed");
    const didSeed = await seed();
    if (didSeed) {
      console.log("[maas-magic] Database seeded with home chefs & dishes.");
    }
  } catch (error) {
    // Never crash server boot — pages will surface errors if truly broken.
    console.error("[maas-magic] Bootstrap warning:", error);
  }
}
