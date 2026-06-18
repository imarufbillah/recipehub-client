"use client";

import { authClient } from "@/lib/auth-client";

export const useClientSession = () => {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  return {
    session,
    user: session?.user ?? null,
    isPending,
    error,
    refetch,
  };
};
