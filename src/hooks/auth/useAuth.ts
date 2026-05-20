import { auth } from "@/api/firebase/client";
import { queryClient } from "@/api/reactQuery/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";

function resolveAuthUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: resolveAuthUser,
    staleTime: Infinity,
    retry: false,
  });
}

export function useSignIn() {
  return useMutation({
    mutationFn: () => signInAnonymously(auth),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}
