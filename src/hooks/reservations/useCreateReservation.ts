import { auth, db } from "@/api/firebase/client";
import { useMutation } from "@tanstack/react-query";
import {
    collection,
    doc,
    increment,
    runTransaction,
    serverTimestamp,
} from "firebase/firestore";

type ReserveBagPayload = {
  bagId: string;
  totalSAR: number;
};

export const useReserveBag = () => {
  return useMutation({
    mutationFn: async ({ bagId, totalSAR }: ReserveBagPayload) => {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const bagRef = doc(db, "bags", bagId);

      const transaction = await runTransaction(db, async (t) => {
        const bagSnapshot = await t.get(bagRef);

        if (!bagSnapshot.exists()) {
          throw new Error("Bag not found");
        }

        const bag = bagSnapshot.data();

        if (bag.quantityRemaining <= 0) {
          throw new Error("Sold out");
        }

        t.update(bagRef, {
          quantityRemaining: increment(-1),
        });

        const reservationRef = doc(collection(db, "reservations"));

        t.set(reservationRef, {
          id: reservationRef.id,
          bagId,
          userId: user.uid,
          totalSAR,
          status: "confirmed",
          createdAt: serverTimestamp(),
        });

        return reservationRef.id;
      });
      return transaction;
    },
  });
};
