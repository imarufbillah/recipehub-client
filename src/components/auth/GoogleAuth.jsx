"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";

/**
 * GoogleAuth — one-click Google OAuth button, consistent with email auth:
 *  - useTransition for non-blocking loading state (no separate useState)
 *  - Toast on error; Google redirects on success so no success toast needed
 *  - Disabled while the parent form is pending OR this button is pending
 */
const GoogleAuth = ({ isPending: parentPending = false }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleGoogleAuth = () => {
    startTransition(async () => {
      const { data, error } = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        const message =
          error.code === "SOCIAL_SIGN_IN_CANCELLED"
            ? "Google sign-in was cancelled."
            : (error.message ?? "Google sign-in failed. Please try again.");
        toast.error(message);
        return;
      }

      // better-auth handles the redirect via callbackURL on success,
      // but if data comes back without a redirect, push manually.
      if (data?.url) {
        router.push(data.url);
      }
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full h-10 font-sans text-[14px] font-medium gap-2.5"
      disabled={isPending || parentPending}
      onClick={handleGoogleAuth}
    >
      <FcGoogle className="size-4.5 shrink-0" aria-hidden />
      {isPending ? "Redirecting…" : "Continue with Google"}
    </Button>
  );
};

export default GoogleAuth;
