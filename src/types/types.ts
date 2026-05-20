import { Timestamp } from "firebase/firestore";

export type Bag = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: { en: string; ar: string };
  category: "bakery" | "restaurant" | "grocery";
  priceSAR: number;
  originalPriceSAR: number;
  quantityRemaining: number;
  pickupStart: Timestamp;
  pickupEnd: Timestamp;
  imageUrl: string;
  createdAt: Timestamp;
  latitude: number;
  longitude: number;
};

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type Reservation = {
  id: string;
  bagId: string;
  userId: string;
  status: ReservationStatus;
  createdAt: Timestamp;
};

// enum Categories = [
//   "bakery",
//   "restaurant",
//   "grocery",
// ] as const;
