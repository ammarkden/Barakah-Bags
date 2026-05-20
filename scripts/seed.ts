import { faker } from "@faker-js/faker";

import "dotenv/config";

import { initializeApp } from "firebase/app";

import {
  Timestamp,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,

  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

console.log({ firebaseConfig });

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const categories = ["bakery", "restaurant", "grocery"] as const;

const restaurantNames = [
  "Daily Bakery",
  "Fresh Bite",
  "Green Basket",
  "Golden Oven",
  "Urban Meals",
  "Morning Crumbs",
  "Healthy Box",
  "Tasty Market",
  "Sunrise Kitchen",
  "Bread & Beyond",
  "Harvest Table",
  "Fresh Corner",
];

const bagNamesEn = [
  "Surprise Bag",
  "Bakery Box",
  "Fresh Bundle",
  "Dinner Combo",
  "Grocery Pack",
  "Chef Box",
  "Healthy Meal Bag",
  "Pastry Collection",
  "Fresh Produce Pack",
  "Breakfast Bundle",
  "Lunch Saver Box",
  "Sweet Treat Bag",
  "Daily Essentials Pack",
  "Family Dinner Bundle",
  "Organic Grocery Box",
  "Fresh Bread Bundle",
  "Snack Pack",
  "Premium Meal Bag",
  "Weekend Bakery Box",
  "Fruit & Veggie Pack",
  "Quick Lunch Combo",
  "Evening Meal Box",
  "Coffee & Pastry Set",
  "Dessert Bundle",
  "Market Fresh Bag",
  "Seasonal Produce Box",
  "Ready Meal Pack",
  "Mini Grocery Bundle",
  "Fresh Kitchen Box",
  "Golden Bakery Pack",
  "Chef Surprise Box",
  "Morning Essentials",
  "Healthy Choice Bag",
  "Fresh Daily Bundle",
  "Signature Meal Pack",
];

const bagNamesAr = [
  "حقيبة مفاجآت",
  "صندوق مخبوزات",
  "باقة طازجة",
  "وجبة اليوم",
  "سلة خضار",
  "عرض الشيف",
  "وجبة صحية",
  "مجموعة حلويات",
  "سلة منتجات طازجة",
  "باقة إفطار",
  "وجبة غداء",
  "حقيبة سناك",
  "احتياجات يومية",
  "وجبة عائلية",
  "صندوق عضوي",
  "خبز طازج",
  "عرض القهوة",
  "باقة فواكه",
  "وجبة سريعة",
  "وجبة مسائية",
  "صندوق فاخر",
  "مجموعة مخبوزات",
  "عرض موسمي",
  "وجبة جاهزة",
  "سلة صغيرة",
  "صندوق المطبخ",
  "باقة السوق",
  "عرض الحلوى",
  "وجبة مميزة",
  "سلة طازجة",
  "صندوق مفاجآت الشيف",
  "احتياجات الصباح",
  "باقة صحية",
  "مجموعة يومية",
  "وجبة التوقيع",
];

const imageUrls = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",

  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",

  "https://images.unsplash.com/photo-1521305916504-4a1121188589",

  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",

  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",

  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",

  "https://images.unsplash.com/photo-1490645935967-10de6ba17061",

  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
];

const riyadhLocations = [
  {
    latitude: 24.7136,
    longitude: 46.6753,
  },

  {
    latitude: 24.774265,
    longitude: 46.738586,
  },

  {
    latitude: 24.68773,
    longitude: 46.72185,
  },

  {
    latitude: 24.746233,
    longitude: 46.652236,
  },

  {
    latitude: 24.702944,
    longitude: 46.687222,
  },

  {
    latitude: 24.781889,
    longitude: 46.698889,
  },
];

async function seed() {
  const TOTAL_BAGS = 35;

  const bagsRef = collection(db, "bags");

  for (let i = 0; i < TOTAL_BAGS; i++) {
    const id = `bag-${i + 1}`;

    const category = categories[Math.floor(Math.random() * categories.length)];

    const restaurantName =
      restaurantNames[Math.floor(Math.random() * restaurantNames.length)];

    const location =
      riyadhLocations[Math.floor(Math.random() * riyadhLocations.length)];

    const now = new Date();

    const pickupStart = new Date(
      now.getTime() +
        faker.number.int({
          min: 1,
          max: 6,
        }) *
          60 *
          60 *
          1000,
    );

    const pickupEnd = new Date(
      pickupStart.getTime() +
        faker.number.int({
          min: 1,
          max: 3,
        }) *
          60 *
          60 *
          1000,
    );

    await setDoc(doc(bagsRef, id), {
      id,

      restaurantId: `restaurant-${i + 1}`,

      restaurantName,

      name: {
        en: bagNamesEn[i],
        ar: bagNamesAr[i],
      },

      category,

      priceSAR: faker.number.int({
        min: 15,
        max: 45,
      }),

      originalPriceSAR: faker.number.int({
        min: 50,
        max: 120,
      }),

      quantityRemaining: faker.number.int({
        min: 1,
        max: 10,
      }),

      latitude: location.latitude,

      longitude: location.longitude,

      pickupStart: Timestamp.fromDate(pickupStart),

      pickupEnd: Timestamp.fromDate(pickupEnd),

      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],

      createdAt: Timestamp.now(),
    });

    console.log(`✅ Created ${id}`);
  }

  console.log("🔥 35 bags seeded successfully");
}

seed().catch(console.error);
