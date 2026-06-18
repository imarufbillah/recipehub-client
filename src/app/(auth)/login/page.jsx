"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FormField from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login", { email, password });
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
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none"
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
          >
            Sign in
          </Button>
        </form>

        {/* shadcn Separator with "or" label — replaces hand-rolled h-px spans */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans select-none">
            or
          </span>
          <Separator className="flex-1" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-10 font-sans text-[14px] font-medium gap-2.5"
          onClick={() => console.log("google sign in")}
        >
          <FcGoogle className="size-4.5 shrink-0" aria-hidden />
          Continue with Google
        </Button>

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
