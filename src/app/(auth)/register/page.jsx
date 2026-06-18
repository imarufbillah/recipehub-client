"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Eye, EyeOff, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FormField from "@/components/ui/FormField";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import GoogleAuth from "@/components/auth/GoogleAuth";

// ─── Validation ───────────────────────────────────────────────────────────────
// Pure functions — run synchronously before any async work so the user gets
// instant feedback without waiting on a network round-trip.

const URL_RE = /^https?:\/\/.+\..+/;

const PASSWORD_RULES = [
  {
    test: (p) => p.length >= 6,
    message: "Password must be at least 6 characters.",
  },
  {
    test: (p) => /[A-Z]/.test(p),
    message: "Password must contain at least one uppercase letter.",
  },
  {
    test: (p) => /[a-z]/.test(p),
    message: "Password must contain at least one lowercase letter.",
  },
];

/**
 * Returns the first failing rule's message, or null if all pass.
 * Stops at the first failure so the user sees one clear error at a time.
 */
const validateForm = ({ name, email, imageUrl, password }) => {
  if (!name.trim()) return "Please enter your display name.";
  if (!email.trim() || !email.includes("@"))
    return "Please enter a valid email address.";
  if (imageUrl && !URL_RE.test(imageUrl))
    return "Image URL must start with http:// or https://.";
  for (const { test, message } of PASSWORD_RULES) {
    if (!test(password)) return message;
  }
  return null;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // useTransition keeps the UI responsive during the async sign-up call.
  // isPending drives the button's loading state without a separate boolean.
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Client-side validation — synchronous, zero latency.
    const error = validateForm({ name, email, imageUrl, password });
    if (error) {
      toast.error(error);
      return; // bail out before touching the network
    }

    // 2. Non-blocking transition — keeps UI interactive during the request.
    startTransition(async () => {
      const { data, error } = await signUp.email({
        name,
        email,
        image: imageUrl || undefined,
        password,
      });

      if (error) {
        const message =
          error.code === "USER_ALREADY_EXISTS"
            ? "An account with this email already exists."
            : (error.message ?? "Sign up failed. Please try again.");
        toast.error(message);
        return;
      }

      toast.success(`Welcome to RecipeHub, ${data?.user?.name ?? "Chef"}!`);
      router.push("/login");
    });
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={cn(
          "bg-card border border-border rounded-xl px-10 py-12 md:px-14 flex flex-col gap-7",
        )}
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-[clamp(26px,3vw,34px)] leading-tight tracking-[-0.02em] text-card-foreground">
            Join RecipeHub
          </h2>
          <p className="text-[14px] font-sans text-muted-foreground">
            Create your account and start sharing recipes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <FormField htmlFor="reg-name" label="Display name">
            <Input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Elena Marsh"
              autoComplete="name"
              required
              disabled={isPending}
            />
          </FormField>

          {/* Email */}
          <FormField htmlFor="reg-email" label="Email address">
            <Input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={isPending}
            />
          </FormField>

          {/* Image URL */}
          <FormField htmlFor="reg-image" label="Profile image URL" optional>
            <div className="relative">
              <ImageIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
                aria-hidden
              />
              <Input
                id="reg-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                autoComplete="photo"
                className="pl-8"
                disabled={isPending}
              />
            </div>
          </FormField>

          {/* Password */}
          <FormField htmlFor="reg-password" label="Password">
            <div className="relative">
              <Input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="pr-10"
                required
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
            {/* Inline strength checklist — only visible while typing */}
            {password.length > 0 && <PasswordStrength password={password} />}
          </FormField>

          <Button
            type="submit"
            variant="default"
            className="w-full h-10 font-sans text-[14px] font-medium mt-1"
            disabled={isPending}
          >
            {isPending ? "Creating account…" : "Create account"}
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground font-medium hover:text-primary transition-colors duration-150"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
