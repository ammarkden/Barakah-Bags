import { db } from "@/api/firebase/client";

import type { Bag } from "@/types/types";

import { useSyncExternalStore } from "react";

import { doc, onSnapshot } from "firebase/firestore";

let currentBag: Bag | null = null;

export const useBag = (id?: string) => {
  const bag = useSyncExternalStore(
    (callback) => {
      if (!id) {
        return () => {};
      }

      const bagRef = doc(db, "bags", id);

      return onSnapshot(bagRef, (snapshot) => {
        if (snapshot.exists()) {
          currentBag = snapshot.data() as Bag;

          callback();
        }
      });
    },

    () => currentBag,
  );

  return {
    data: bag,

    isLoading: !bag,

    isError: false,
  };
};
