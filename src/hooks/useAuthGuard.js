"use client";

import { useRouter, usePathname } from "next/navigation";
import { useClientSession } from "@/hooks/useClientSession";

const useAuthGuard = () => {
  const { user, isPending } = useClientSession();
  const router = useRouter();
  const pathname = usePathname();

  const guard = (action) => {
    // Still resolving session — do nothing to avoid false redirects
    if (isPending) return false;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return false;
    }

    action();
    return true;
  };

  return guard;
};

export default useAuthGuard;
