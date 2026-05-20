import { db } from "@/api/firebase/client";
import type { Bag } from "@/types/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

const PAGE_SIZE = 10;

type Category = "all" | "bakery" | "restaurant" | "grocery";
type BagsPageParam = QueryDocumentSnapshot<DocumentData> | null;
type BagsPage = {
  bags: Bag[];
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
};

export const useBags = (category: Category = "all") =>
  useInfiniteQuery<
    BagsPage,
    Error,
    InfiniteData<BagsPage>,
    ["bags", Category],
    BagsPageParam
  >({
    queryKey: ["bags", category],
    initialPageParam: null,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,

    queryFn: async ({ pageParam }) => {
      const q = query(
        collection(db, "bags"),
        where("quantityRemaining", ">", 0),
        ...(category !== "all" ? [where("category", "==", category)] : []),
        orderBy("quantityRemaining"), // ✅ inequality field first
        orderBy("createdAt", "desc"),
        ...(pageParam ? [startAfter(pageParam)] : []),
        limit(PAGE_SIZE),
      );

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      return {
        bags: docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Bag),
        lastDoc: docs.at(-1),
      };
    },

    getNextPageParam: (lastPage) =>
      lastPage.bags.length < PAGE_SIZE ? undefined : lastPage.lastDoc,
  });
