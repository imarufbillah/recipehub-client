"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FormField from "@/components/ui/FormField";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { cn } from "@/lib/utils";
import { signIn } from "@/lib/auth-client";

// ─── Validation ───────────────────────────────────────────────────────────────
// Runs synchronously before any network call — zero latency feedback.

const validateForm = ({ email, password }) => {
  if (!email.trim() || !email.includes("@"))
    return "Please enter a valid email address.";
  if (!password) return "Please enter your password.";
  return null;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Client-side validation — bail before touching the network.
    const validationError = validateForm({ email, password });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // 2. Non-blocking transition — keeps UI interactive during the request.
    startTransition(async () => {
      const { data, error } = await signIn.email({ email, password });

      if (error) {
        // Map common better-auth error codes to human-readable messages.
        const message =
          error.code === "INVALID_EMAIL_OR_PASSWORD"
            ? "Incorrect email or password. Please try again."
            : (error.message ?? "Sign in failed. Please try again.");
        toast.error(message);
        return;
      }

      toast.success(`Welcome back, ${data?.user?.name ?? "Chef"}!`);
      router.push("/dashboard");
    });
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={cn(
          "bg-card border border-border rounded-xl px-10 py-12 md:px-14 flex flex-col gap-8",
        )}
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-[clamp(26px,3vw,34px)] leading-tight tracking-[-0.02em] text-card-foreground">
            Welcome back
          </h2>
          <p className="text-[14px] font-sans text-muted-foreground">
            Sign in to your RecipeHub account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <FormField htmlFor="login-email" label="Email address">
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={isPending}
            />
          </FormField>

          <FormField htmlFor="login-password" label="Password">
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="pr-10"
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden />
                ) : (
                  <Eye className="size-4" aria-hidden />
                )}
              </button>
            </div>
          </FormField>

          <div className="flex justify-end -mt-2">
            <Link
              href="/forgot-password"
              className="text-[12px] font-sans text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full h-10 font-sans text-[14px] font-medium mt-1"
            disabled={isPending}
          >
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans select-none">
            or
          </span>
          <Separator className="flex-1" />
        </div>

        <GoogleAuth isPending={isPending} />

        <p className="text-center text-[13px] font-sans text-muted-foreground">
          New here?{" "}
          <Link
            href="/register"
            className="text-foreground font-medium hover:text-primary transition-colors duration-150"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
