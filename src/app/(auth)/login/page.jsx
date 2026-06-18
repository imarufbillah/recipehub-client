"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Login page — single-focus, no chrome.
 *
 * Layout: vertically centered card on background canvas.
 *  - Card: card token, radius-xl, hairline border, 48–56px internal padding.
 *  - Serif H2 greeting "Welcome back".
 *  - Email + password fields per Input Field pattern.
 *  - Hairline divider + muted "or" label.
 *  - Google auth as outline/secondary button (token system, not Google brand blue).
 *    Google's "G" icon (FcGoogle from react-icons) is the single allowed
 *    exception to the Lucide-only icon rule — it's a trust mark, not decor.
 *  - Bottom link to Register.
 *  - No background photo on this page — clean restraint is the statement.
 */

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  suffix,
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "w-full h-10 px-3 bg-background border border-input rounded-md",
          "text-[14px] font-sans text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
          "transition-all duration-150",
          suffix && "pr-10",
        )}
      />
      {suffix && (
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to better-auth signIn
    console.log("login", { email, password });
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={cn(
          "bg-card border border-border rounded-xl",
          "px-10 py-12 md:px-14",
          "flex flex-col gap-8",
        )}
      >
        {/* ── Serif greeting ── */}
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-[clamp(26px,3vw,34px)] leading-tight tracking-[-0.02em] text-card-foreground">
            Welcome back
          </h2>
          <p className="text-[14px] font-sans text-muted-foreground">
            Sign in to your RecipeHub account.
          </p>
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <InputField
            id="login-email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <InputField
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden />
                ) : (
                  <Eye className="size-4" aria-hidden />
                )}
              </button>
            }
          />

          {/* Forgot password — ghost link, right-aligned */}
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
          >
            Sign in
          </Button>
        </form>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-border" aria-hidden />
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans select-none">
            or
          </span>
          <span className="flex-1 h-px bg-border" aria-hidden />
        </div>

        {/* ── Google auth ── */}
        {/*
         * Styled as outline/secondary — inside the token system.
         * FcGoogle is the single allowed exception to Lucide-only: it's a
         * recognizable trust mark, not decorative iconography.
         */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-10 font-sans text-[14px] font-medium gap-2.5"
          onClick={() => console.log("google sign in")}
        >
          <FcGoogle className="size-4.5 shrink-0" aria-hidden />
          Continue with Google
        </Button>

        {/* ── Bottom link ── */}
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
