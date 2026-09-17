import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export type OrderItem = {
  dishId: number;
  name: string;
  aunty: string;
  chefSlug: string;
  price: number;
  qty: number;
  image: string;
};

export const chefs = pgTable("chefs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  aunty: text("aunty").notNull(), // display name: "Rekha Aunty"
  city: text("city").notNull(),
  area: text("area").notNull(),
  cuisine: text("cuisine").notNull(),
  tagline: text("tagline").notNull(),
  story: text("story").notNull(),
  image: text("image").notNull(),
  since: integer("since").notNull(),
  rating: real("rating").notNull(),
  ordersServed: integer("orders_served").notNull(),
  badge: text("badge").notNull(),
  kitchenType: text("kitchen_type").notNull(), // "Shudh Shakahari" | "Veg + Non-Veg"
  deliveryTime: text("delivery_time").notNull(),
  timings: text("timings").notNull(),
});

export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  chefId: integer("chef_id")
    .notNull()
    .references(() => chefs.id),
  name: text("name").notNull(),
  hindiName: text("hindi_name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in rupees
  image: text("image").notNull(),
  category: text("category").notNull(), // nashta | lunch | dinner | snacks | mithai
  isVeg: boolean("is_veg").notNull().default(true),
  spiceLevel: text("spice_level").notNull(), // Halka | Medium | Teekha
  isBestseller: boolean("is_bestseller").notNull().default(false),
  rating: real("rating").notNull(),
  serves: text("serves").notNull(),
  available: text("available").notNull(), // e.g. "Mon – Sat"
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  noteForAunty: text("note_for_aunty"),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  subtotal: integer("subtotal").notNull(),
  deliveryFee: integer("delivery_fee").notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("placed"),
  paymentMethod: text("payment_method").notNull().default("cod"), // "cod" | "online"
  paymentStatus: text("payment_status").notNull().default("pending"), // "pending" | "paid" | "failed"
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chefApplications = pgTable("chef_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  specialty: text("specialty").notNull(),
  story: text("story").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
