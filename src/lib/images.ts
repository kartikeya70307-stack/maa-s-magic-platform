/**
 * Centralised, hand-curated food & chef photography.
 * All images live locally in /public/images — AI-generated brand &
 * chef portraits (owned by you) plus licensed free-to-use stock photos
 * for dishes & lifestyle shots (see /public/images/ATTRIBUTION.txt origin).
 */

// Local files need no crop/query transforms — these just pass the path through.
export const dishImg = (path: string) => path;
export const chefImg = (path: string) => path;
export const wideImg = (path: string) => path;

export const PEXELS = {
  // ---- chef portraits ----
  chefRekha: "/images/chefs/rekha-aunty.jpg",
  chefShanta: "/images/chefs/shanta-sharma.jpg",
  chefLakshmi: "/images/chefs/lakshmi-amma.jpg",
  chefFatima: "/images/chefs/fatima-khala.jpg",
  chefGita: "/images/chefs/gita-mummy.jpg",
  chefUsha: "/images/chefs/usha-tai.jpg",

  // ---- dishes ----
  rajmaChawal: "/images/dishes/rajma-chawal.jpg",
  kadhiChawal: "/images/dishes/kadhi-chawal.jpg",
  alooParatha: "/images/dishes/aloo-paratha.jpg",
  choleBhature: "/images/dishes/chole-bhature.jpg",
  gharwaliThali: "/images/dishes/gharwali-thali.jpg",
  pooriSabzi: "/images/dishes/poori-sabzi.jpg",
  paneerButterMasala: "/images/dishes/paneer-butter-masala.jpg",
  dalTadkaRice: "/images/dishes/dal-tadka-jeera-rice.jpg",
  masalaDosa: "/images/dishes/masala-dosa.jpg",
  idliSambar: "/images/dishes/idli-sambar.jpg",
  vegPulao: "/images/dishes/veg-pulao.jpg",
  lemonRice: "/images/dishes/lemon-rice.jpg",
  chickenBiryani: "/images/dishes/chicken-biryani.jpg",
  vegBiryani: "/images/dishes/veg-biryani.jpg",
  chickenKorma: "/images/dishes/chicken-korma.jpg",
  dalBaati: "/images/dishes/dal-baati-churma.jpg",
  gatteKiSabzi: "/images/dishes/gatte-ki-sabzi.jpg",
  thepla: "/images/dishes/methi-thepla.jpg",
  gulabJamun: "/images/dishes/gulab-jamun.jpg",
  misalPav: "/images/dishes/misal-pav.jpg",
  kandaPoha: "/images/dishes/kanda-poha.jpg",
  puranPoli: "/images/dishes/puran-poli.jpg",

  // ---- lifestyle / emotional ----
  naniWithChild: "/images/lifestyle/mother-daughter-saris.jpg",
  prarthanaMeal: "/images/lifestyle/prarthana-meal.jpg",
  studentEating: "/images/lifestyle/student-eating-solo.jpg",
  steelMeal: "/images/lifestyle/steel-bowls-home-meal.jpg",
} as const;

// ---- brand-specific one-offs (hero, ad film) ----
export const LOCAL = {
  heroMaa: "/images/hero-maa.jpg",
  adPoster: "/images/ad-poster.jpg",
  adStudent: "/images/ad-student.jpg",
  logo: "/images/maas-magic-logo.svg",
} as const;
