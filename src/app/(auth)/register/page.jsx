"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { cn } from "@/lib/utils";

/**
 * Register page — single-focus, no chrome.
 *
 * Same card layout as Login, with additions:
 *  - Name field above email.
 *  - Password requirement helper (PasswordStrength) beneath the password field:
 *    three inline lines that individually turn to success state as conditions
 *    are met while typing.
 *  - Confirm password field.
 *  - Same Google auth outline button.
 *  - Bottom link to Login.
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
  children,
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
    {/* Slot for helper content (e.g. PasswordStrength) */}
    {children}
  </div>
);

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to better-auth signUp
    console.log("register", { name, email, password });
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={cn(
          "bg-card border border-border rounded-xl",
          "px-10 py-12 md:px-14",
          "flex flex-col gap-7",
        )}
      >
        {/* ── Serif greeting ── */}
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-[clamp(26px,3vw,34px)] leading-tight tracking-[-0.02em] text-card-foreground">
            Join RecipeHub
          </h2>
          <p className="text-[14px] font-sans text-muted-foreground">
            Create your account and start sharing recipes.
          </p>
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <InputField
            id="reg-name"
            label="Display name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Elena Marsh"
            autoComplete="name"
          />

          <InputField
            id="reg-email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />

          {/* Password with inline strength helper */}
          <InputField
            id="reg-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
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
          >
            {/* Requirement helper — only shown once typing starts */}
            {password.length > 0 && <PasswordStrength password={password} />}
          </InputField>

          {/* Confirm password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="reg-confirm"
              className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="reg-confirm"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={passwordMismatch}
                className={cn(
                  "w-full h-10 px-3 pr-10 bg-background border rounded-md",
                  "text-[14px] font-sans text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
                  "transition-all duration-150",
                  passwordMismatch
                    ? "border-destructive focus:ring-destructive/30"
                    : "border-input",
                )}
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none"
                >
                  {showConfirm ? (
                    <EyeOff className="size-4" aria-hidden />
                  ) : (
                    <Eye className="size-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            {passwordMismatch && (
              <p className="text-[12px] font-sans text-destructive">
                Passwords don&apos;t match.
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full h-10 font-sans text-[14px] font-medium mt-1"
          >
            Create account
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
        <Button
          type="button"
          variant="outline"
          className="w-full h-10 font-sans text-[14px] font-medium gap-2.5"
          onClick={() => console.log("google sign up")}
        >
          <FcGoogle className="size-4.5 shrink-0" aria-hidden />
          Continue with Google
        </Button>

        {/* ── Bottom link ── */}
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
