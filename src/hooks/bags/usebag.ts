import { db } from "@/api/firebase/client";
import type { Bag } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { doc, onSnapshot } from "firebase/firestore";

export const useBag = (id?: string) => {
  return useQuery({
    queryKey: ["bag", id],

    enabled: !!id,

    queryFn: async () => {
      return await new Promise<Bag>((resolve, reject) => {
        const bagRef = doc(db, "bags", id!);

        const unsubscribe = onSnapshot(
          bagRef,
          (snapshot) => {
            if (!snapshot.exists()) {
              reject(new Error("Bag not found"));
              return;
            }

            resolve(snapshot.data() as Bag);
          },
          reject,
        );

        return () => unsubscribe();
      });
    },
  });
};
