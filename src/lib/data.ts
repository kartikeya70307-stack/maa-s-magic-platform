import { db } from "@/db";
import { chefs, dishes } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";

export type Chef = typeof chefs.$inferSelect;
export type Dish = typeof dishes.$inferSelect;

export type DishWithChef = Dish & {
  chefAunty: string;
  chefSlug: string;
  chefCity: string;
};

export async function getAllChefs(): Promise<Chef[]> {
  return db.select().from(chefs).orderBy(desc(chefs.rating));
}

export async function getFeaturedChefs(limit = 3): Promise<Chef[]> {
  return db.select().from(chefs).orderBy(desc(chefs.ordersServed)).limit(limit);
}

export async function getChefBySlug(slug: string): Promise<Chef | undefined> {
  const rows = await db.select().from(chefs).where(eq(chefs.slug, slug)).limit(1);
  return rows[0];
}

export async function getDishesByChef(chefId: number): Promise<Dish[]> {
  return db
    .select()
    .from(dishes)
    .where(eq(dishes.chefId, chefId))
    .orderBy(desc(dishes.isBestseller), asc(dishes.price));
}

export async function getAllDishesWithChef(): Promise<DishWithChef[]> {
  const allChefs = await db.select().from(chefs);
  const map = new Map(allChefs.map((c) => [c.id, c]));
  const allDishes = await db
    .select()
    .from(dishes)
    .orderBy(desc(dishes.isBestseller), desc(dishes.rating));
  return allDishes.map((d) => {
    const chef = map.get(d.chefId);
    return {
      ...d,
      chefAunty: chef?.aunty ?? "Home Chef",
      chefSlug: chef?.slug ?? "#",
      chefCity: chef?.city ?? "",
    };
  });
}

export async function getBestsellers(limit = 4): Promise<DishWithChef[]> {
  const all = await getAllDishesWithChef();
  return all.filter((d) => d.isBestseller).slice(0, limit);
}
