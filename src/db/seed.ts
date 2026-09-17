import { db } from "@/db";
import { chefs, dishes } from "@/db/schema";
import { PEXELS, chefImg, dishImg } from "@/lib/images";
import { sql } from "drizzle-orm";

const CHEF_SEED = [
  {
    slug: "rekha-aunty",
    name: "Rekha Malhotra",
    aunty: "Rekha Aunty",
    city: "Delhi",
    area: "Lajpat Nagar",
    cuisine: "Punjabi Ghar Ka Khana",
    tagline: "Rajma aisa, ki Sunday yaad aa jaaye.",
    story:
      "Rekha Aunty ne 30 saal apne teen bachon ko khilaya. Jab beti hostel gayi aur phone pe ro ke boli — 'maa, yahan rajma nahi milta' — tab se Aunty ne faisla kiya ki ab sheher ke har hostel ka baccha unka apna baccha hai. Aaj bhi subah 5 baje tadka lagta hai unki rasoi mein, aur har dabba nikalne se pehle ek dua nikalti hai.",
    image: chefImg(PEXELS.chefRekha),
    since: 2019,
    rating: 4.9,
    ordersServed: 12400,
    badge: "Maa's Verified",
    kitchenType: "Shudh Shakahari",
    deliveryTime: "35–45 min",
    timings: "Mon – Sat · 11am – 8pm",
  },
  {
    slug: "shanta-sharma",
    name: "Shanta Sharma",
    aunty: "Shanta Mummy",
    city: "Kanpur",
    area: "Swaroop Nagar",
    cuisine: "UP ki Thali & Gharwali Rasoi",
    tagline: "Poori thali, pura ghar.",
    story:
      "Shanta Mummy ke ghar mein kabhi koi bhookha nahi gaya — mohalle ke bachche, postman, tutor, sabke liye ek katori kam banti hi nahi. Pati ke guzar jaane ke baad unhone apni hansi aur apne haath ka khana dono bachaye rakhe. Unki thali mein 6 cheezein hoti hain, kyunki 'bachche ko sirf daal-roti se kaam kaise chalega?'",
    image: chefImg(PEXELS.chefShanta),
    since: 2018,
    rating: 4.8,
    ordersServed: 9800,
    badge: "Maa's Verified",
    kitchenType: "Shudh Shakahari",
    deliveryTime: "30–40 min",
    timings: "Mon – Sun · 10am – 9pm",
  },
  {
    slug: "lakshmi-amma",
    name: "Lakshmi Venkataraman",
    aunty: "Lakshmi Amma",
    city: "Chennai",
    area: "Mylapore",
    cuisine: "South Indian Tiffin",
    tagline: "Crispy dosa, naram dil.",
    story:
      "Lakshmi Amma ka dosa batter raat bhar ferment hota hai, bilkul waise jaise unki paatti karta thi. Unke bete ne jab Kota mein padhai ki, tab Amma ne har hafte courier se idli podi bheji. Ab wo courier nahi — garam dosa bhejti hain, aapke hostel ke gate tak. 'En paiyan kuu ithellam romba pidikum' — mere bete ko ye sab bahut pasand tha.",
    image: chefImg(PEXELS.chefLakshmi),
    since: 2020,
    rating: 4.9,
    ordersServed: 8600,
    badge: "Maa's Verified",
    kitchenType: "Shudh Shakahari",
    deliveryTime: "30–40 min",
    timings: "Mon – Sat · 8am – 7pm",
  },
  {
    slug: "fatima-khala",
    name: "Fatima Begum",
    aunty: "Fatima Khala",
    city: "Hyderabad",
    area: "Charminar",
    cuisine: "Hyderabadi Degh",
    tagline: "Biryani mein woh dum jo ghar mein hota hai.",
    story:
      "Fatima Khala ki biryani ki khushboo poore gali mein jaati hai — aur gali ke bachche khud chale aate hain. 25 saal se dawaton ka bawarchi khana banati hain, par unhe sabse zyada sukoon tab milta hai jab koi chhota baccha plates chaat jaye. 'Bacche jo ghar se door hain, unki bhi toh koi ammi honi chahiye is sheher mein.'",
    image: chefImg(PEXELS.chefFatima),
    since: 2019,
    rating: 4.8,
    ordersServed: 11200,
    badge: "Maa's Verified",
    kitchenType: "Veg + Non-Veg",
    deliveryTime: "40–55 min",
    timings: "Tue – Sun · 12pm – 9pm",
  },
  {
    slug: "gita-mummy",
    name: "Gita Devi Sharma",
    aunty: "Gita Mummy",
    city: "Jaipur",
    area: "Malviya Nagar",
    cuisine: "Rajasthani-Gujarati Rasoi",
    tagline: "Thodi si mithaas, bohot saara pyaar.",
    story:
      "Gita Mummy ke haath ki baati ki mitti-jaisi khushboo un logon ko hi pata hai jinhone unke aangan mein baith ke khaya hai. Sasural aayi 19 saal ki umar mein, tab se kadahi se rishta hai. Coaching ke liye Jaipur aaye bachon ko wo 'apne laadle' kehti hain — aur har parcel mein ek extra thepla 'raaste ke liye' zaroor rakhti hain.",
    image: chefImg(PEXELS.chefGita),
    since: 2021,
    rating: 4.7,
    ordersServed: 5400,
    badge: "Maa's Verified",
    kitchenType: "Shudh Shakahari",
    deliveryTime: "35–50 min",
    timings: "Mon – Sat · 11am – 8pm",
  },
  {
    slug: "usha-tai",
    name: "Usha Kulkarni",
    aunty: "Usha Tai",
    city: "Pune",
    area: "Kothrud",
    cuisine: "Maharashtrian Gharche Jevan",
    tagline: "Pune cha asli swad, aaji chya hatacha.",
    story:
      "Usha Tai subah 4 baje uthti hain — pehle phoolon ka haar, phir poha ka tadka. Unki misal itni famous hai ki purane students shaadi mein bhi unhe bulwate hain, 'wahi waali misal' ke liye. 40 saal se Pune ke vidyardhyon ki 'doosri aai' hain. Tai kehti hain: 'Poṭ bharlā ki aathavan yete aaji chi — aamhi ti aathavan door nahi honar dêu.'",
    image: chefImg(PEXELS.chefUsha),
    since: 2017,
    rating: 4.9,
    ordersServed: 15300,
    badge: "Maa's Verified",
    kitchenType: "Shudh Shakahari",
    deliveryTime: "25–35 min",
    timings: "Mon – Sun · 7am – 8pm",
  },
];

const DISH_SEED: Array<{
  chefSlug: string;
  name: string;
  hindiName: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  spiceLevel: string;
  isBestseller?: boolean;
  rating: number;
  serves: string;
  available: string;
}> = [
  // ------- Rekha Aunty -------
  {
    chefSlug: "rekha-aunty",
    name: "Raat Bhar Bhigoya Rajma + Chawal",
    hindiName: "राजमा चावल",
    description:
      "Raat bhar bhigoye lal rajma, slow-cooked adrak-tamatar ki gravy mein, upar se hara dhaniya aur ek chhoto sikka makhan ka. Bilkul Sunday-wala swad.",
    price: 149,
    image: dishImg(PEXELS.rajmaChawal),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    rating: 4.9,
    serves: "1 pet bhar plate",
    available: "Mon – Sat",
  },
  {
    chefSlug: "rekha-aunty",
    name: "Ghar Wali Kadhi Pakora + Chawal",
    hindiName: "कढ़ी पकौड़ा",
    description:
      "Khatti-halki mithi kadhi, naram besan ke pakode, aur upar se ghee ka tadka — curry patta aur laal mirch ka. Asli comfort food.",
    price: 139,
    image: dishImg(PEXELS.kadhiChawal),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.7,
    serves: "1 pet bhar plate",
    available: "Tue – Sat",
  },
  {
    chefSlug: "rekha-aunty",
    name: "Aloo Paratha (2 pc) + Dahi + Makhan",
    hindiName: "आलू पराठा",
    description:
      "Bharwan parathe, tave pe sekre, upar thanda safed makhan pighalta hua. Saath mein ghar ka dahi aur nimbu ka achar — nashte ka king.",
    price: 99,
    image: dishImg(PEXELS.alooParatha),
    category: "nashta",
    isVeg: true,
    spiceLevel: "Halka",
    isBestseller: true,
    rating: 4.8,
    serves: "2 parathe",
    available: "Mon – Sun",
  },
  {
    chefSlug: "rekha-aunty",
    name: "Chole Bhature, Dilli Wale",
    hindiName: "छोले भटूरे",
    description:
      "Kadhai masale wale kaale chana, bade fulle bhature, pyaaz-hari chutney aur fried mirchi. Friday treat jaisa feel, roz.",
    price: 129,
    image: dishImg(PEXELS.choleBhature),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Teekha",
    rating: 4.8,
    serves: "2 bhature",
    available: "Mon – Sat",
  },
  // ------- Shanta Mummy -------
  {
    chefSlug: "shanta-sharma",
    name: "Gharwali Thali (6 Cheezein)",
    hindiName: "घरवाली थाली",
    description:
      "3 phulke, aaj ki sabzi, daal fry, chawal, salad, papad aur chhoto sa gulab jamun — kyunki Mummy kehti hain 'meetha toh banta hai'.",
    price: 169,
    image: dishImg(PEXELS.gharwaliThali),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    rating: 4.9,
    serves: "1 thali, full ghar feel",
    available: "Mon – Sun",
  },
  {
    chefSlug: "shanta-sharma",
    name: "Poori Sabzi, Tyohaar Wali",
    hindiName: "पूरी सब्जी",
    description:
      "6 garam fulki pooriyaan, sukhi aloo ki sabzi jisme heeng ka tadka, aur halwa-chhota sa. Nanihal ki yaad dila dega.",
    price: 109,
    image: dishImg(PEXELS.pooriSabzi),
    category: "nashta",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.7,
    serves: "6 poori",
    available: "Sat – Sun",
  },
  {
    chefSlug: "shanta-sharma",
    name: "Paneer Butter Masala + 3 Phulke",
    hindiName: "पनीर बटर मसाला",
    description:
      "Naram malai paneer, makhani gravy jo dheeme aanch pe paki — na zyada meethi, na teekhi. Restaurant nahi, ghar wala balance.",
    price: 179,
    image: dishImg(PEXELS.paneerButterMasala),
    category: "dinner",
    isVeg: true,
    spiceLevel: "Medium",
    rating: 4.8,
    serves: "3 phulke",
    available: "Mon – Sun",
  },
  {
    chefSlug: "shanta-sharma",
    name: "Dal Tadka + Jeera Rice",
    hindiName: "दाल तड़का जीरा राइस",
    description:
      "Arhar dal pe ghee-lehsun ka tadka, garam jeera chawal ke saath. Exam ke baad wala khana — halka, garam, aur bilkul sukoon wala.",
    price: 119,
    image: dishImg(PEXELS.dalTadkaRice),
    category: "dinner",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.6,
    serves: "1 bowl set",
    available: "Mon – Sun",
  },
  // ------- Lakshmi Amma -------
  {
    chefSlug: "lakshmi-amma",
    name: "Masala Dosa, Amma Special",
    hindiName: "मसाला डोसा",
    description:
      "Raat bhar ferment batter, sikke jaisa crispy dosa, andar garam aloo palya, saath mein nariyal chutney aur piping hot sambar.",
    price: 119,
    image: dishImg(PEXELS.masalaDosa),
    category: "nashta",
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    rating: 4.9,
    serves: "1 bada dosa",
    available: "Mon – Sat",
  },
  {
    chefSlug: "lakshmi-amma",
    name: "Idli Sambar (4 pc) + Podi",
    hindiName: "इडली साम्भर",
    description:
      "Baadal jaisi naram idli, garam sambar mein doobi, aur Amma ke haath ki idli podi-ghee — jo courier mein bhi bheji jaati thi.",
    price: 89,
    image: dishImg(PEXELS.idliSambar),
    category: "nashta",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.8,
    serves: "4 idli",
    available: "Mon – Sat",
  },
  {
    chefSlug: "lakshmi-amma",
    name: "Moongfali Veg Pulao + Raita",
    hindiName: "वेज पुलाव",
    description:
      "Phule phule chawal, kaju-moongfali ka crunch, halka sa ghee — saath mein thanda kheera raita. Light lunch, heavy sukoon.",
    price: 139,
    image: dishImg(PEXELS.vegPulao),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.6,
    serves: "1 handi",
    available: "Mon – Fri",
  },
  {
    chefSlug: "lakshmi-amma",
    name: "Lemon Rice + Pappad",
    hindiName: "लेमन राइस",
    description:
      "Curry patta, rai aur haldi ka tadka, nimbu ki khataas aur moongfali ka crunch — travel-meal jaisa, par bina travel ke.",
    price: 99,
    image: dishImg(PEXELS.lemonRice),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Medium",
    rating: 4.7,
    serves: "1 dabba",
    available: "Tue – Sat",
  },
  // ------- Fatima Khala -------
  {
    chefSlug: "fatima-khala",
    name: "Hyderabadi Chicken Biryani (Degh Wali)",
    hindiName: "चिकन बिरयानी",
    description:
      "Sealed handi mein dum pe paki, kesar-ilaichi ki khushboo, naram murgh aur lambi basmati — saath mein raita aur saalan.",
    price: 249,
    image: dishImg(PEXELS.chickenBiryani),
    category: "dinner",
    isVeg: false,
    spiceLevel: "Teekha",
    isBestseller: true,
    rating: 4.9,
    serves: "1 bada portion",
    available: "Tue – Sun",
  },
  {
    chefSlug: "fatima-khala",
    name: "Veg Dum Biryani",
    hindiName: "वेज दम बिरयानी",
    description:
      "Sabziyon wali wohi degh, wohi dum, wohi izzat. Khala kehti hain — 'biryani gosht se nahi, haath se banti hai.'",
    price: 189,
    image: dishImg(PEXELS.vegBiryani),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Medium",
    rating: 4.7,
    serves: "1 bada portion",
    available: "Tue – Sun",
  },
  {
    chefSlug: "fatima-khala",
    name: "Murgh Korma + Pav",
    hindiName: "मुर्ग़ कोरमा",
    description:
      "Dahi aur bhune pyaaz ki silky gravy, dheeme aanch ka korma — garam pav ke saath. Dilli nahi, purani Dilli wali feel.",
    price: 219,
    image: dishImg(PEXELS.chickenKorma),
    category: "dinner",
    isVeg: false,
    spiceLevel: "Medium",
    rating: 4.8,
    serves: "2 pav + korma",
    available: "Fri – Sun",
  },
  // ------- Gita Mummy -------
  {
    chefSlug: "gita-mummy",
    name: "Dal Baati Churma",
    hindiName: "दाल बाटी चूरमा",
    description:
      "Mitti ki khushboo wali ghee-dipped baati, paanch dalon ka sangam, aur haath se maatha hua meetha churma. Rajasthan, seedha parcel mein.",
    price: 179,
    image: dishImg(PEXELS.dalBaati),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Medium",
    isBestseller: true,
    rating: 4.8,
    serves: "3 baati",
    available: "Wed – Sun",
  },
  {
    chefSlug: "gita-mummy",
    name: "Gatte Ki Sabzi + 3 Roti",
    hindiName: "गट्टे की सब्ज़ी",
    description:
      "Naram besan ke gatte, khatti dahi ki gravy mein doobe — jaisi sirf Rajasthan ke gharon mein banti hai. Bajre ki roti ka option bhi.",
    price: 149,
    image: dishImg(PEXELS.gatteKiSabzi),
    category: "lunch",
    isVeg: true,
    spiceLevel: "Teekha",
    rating: 4.6,
    serves: "3 roti",
    available: "Mon – Sat",
  },
  {
    chefSlug: "gita-mummy",
    name: "Methi Thepla Dabba (8 pc)",
    hindiName: "मेथी थेपला",
    description:
      "Travel-proof, mess-proof thepla — ghar ki chhundo marmalade aur dahi ke saath. Raaste ke liye ek extra, Mummy ki taraf se.",
    price: 119,
    image: dishImg(PEXELS.thepla),
    category: "snacks",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.7,
    serves: "8 theple",
    available: "Mon – Sat",
  },
  {
    chefSlug: "gita-mummy",
    name: "Garam Gulab Jamun (4 pc)",
    hindiName: "गुलाब जामुन",
    description:
      "Kesar-elachi chashni mein doobe, andar tak naram — exam clear hone pe bhi, breakup pe bhi. Dono mein kaam aata hai.",
    price: 89,
    image: dishImg(PEXELS.gulabJamun),
    category: "mithai",
    isVeg: true,
    spiceLevel: "Meetha",
    rating: 4.9,
    serves: "4 jamun",
    available: "Mon – Sun",
  },
  // ------- Usha Tai -------
  {
    chefSlug: "usha-tai",
    name: "Kothrud Ki Famous Misal + Taak",
    hindiName: "मिसळ पाव",
    description:
      "Tai wali teekhat rassa, garam usal, farsan ki barish, 2 pav aur thanda taak (chaas). Pune ke purane students isko 'whatsapp group ki yaad' bolte hain.",
    price: 119,
    image: dishImg(PEXELS.misalPav),
    category: "snacks",
    isVeg: true,
    spiceLevel: "Teekha",
    isBestseller: true,
    rating: 4.9,
    serves: "1 misal + 2 pav",
    available: "Mon – Sun",
  },
  {
    chefSlug: "usha-tai",
    name: "Kanda Poha + Adrak Chai Combo",
    hindiName: "कांदा पोहे",
    description:
      "4 baje uth ke bana hulka phulka poha — nariyal, moongfali, nimbu aur kadak adrak chai. Nashta aisa ki alarm se pehle neend khul jaaye.",
    price: 79,
    image: dishImg(PEXELS.kandaPoha),
    category: "nashta",
    isVeg: true,
    spiceLevel: "Halka",
    rating: 4.8,
    serves: "1 plate + chai",
    available: "Mon – Sun",
  },
  {
    chefSlug: "usha-tai",
    name: "Puran Poli (2 pc) Katachi Amti Sang",
    hindiName: "पुरण पोळी",
    description:
      "Gud ki mithaas, ghee ki chiknaai, haath se patli kari poli — saath mein khatti-meethi katachi amti. Tyohaar wala nashta, roz.",
    price: 109,
    image: dishImg(PEXELS.puranPoli),
    category: "snacks",
    isVeg: true,
    spiceLevel: "Meetha",
    rating: 4.7,
    serves: "2 poli",
    available: "Thu – Sun",
  },
];

export async function seed() {
  const existing = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(chefs);
  const alreadySeeded = (existing[0]?.count ?? 0) > 0;

  const slugToId = new Map<string, number>();

  if (!alreadySeeded) {
    for (const chef of CHEF_SEED) {
      const [row] = await db
        .insert(chefs)
        .values(chef)
        .onConflictDoNothing({ target: chefs.slug })
        .returning({ id: chefs.id, slug: chefs.slug });
      const id =
        row?.id ??
        (
          await db
            .select({ id: chefs.id })
            .from(chefs)
            .where(sql`${chefs.slug} = ${chef.slug}`)
        )[0]?.id;
      if (id) slugToId.set(chef.slug, id);
    }

    for (const dish of DISH_SEED) {
      const chefId = slugToId.get(dish.chefSlug);
      if (!chefId) continue;
      const { chefSlug: _drop, ...values } = dish;
      await db.insert(dishes).values({ ...values, chefId });
    }
  } else {
    // Tables already have rows from an earlier deploy — just map slugs to ids.
    const rows = await db.select({ id: chefs.id, slug: chefs.slug }).from(chefs);
    for (const r of rows) slugToId.set(r.slug, r.id);
  }

  // Always sync photos to whatever the code currently points to, even on
  // servers that were already seeded — so updating images.ts / seed.ts and
  // redeploying actually changes what's shown, without wiping real orders
  // or requiring a manual database reset.
  for (const chef of CHEF_SEED) {
    await db
      .update(chefs)
      .set({ image: chef.image })
      .where(sql`${chefs.slug} = ${chef.slug}`);
  }
  for (const dish of DISH_SEED) {
    const chefId = slugToId.get(dish.chefSlug);
    if (!chefId) continue;
    await db
      .update(dishes)
      .set({ image: dish.image })
      .where(sql`${dishes.chefId} = ${chefId} AND ${dishes.name} = ${dish.name}`);
  }

  return !alreadySeeded;
}
