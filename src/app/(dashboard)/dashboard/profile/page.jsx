"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Profile — user dashboard page.
 * Single-column form: display name, email (read-only if via OAuth),
 * bio, current password + new password.
 * All fields follow Input Field pattern: label above, border-input, radius-md,
 * ring on focus. Primary submit button bottom-right / full-width mobile.
 */

const FieldLabel = ({ htmlFor, children, optional }) => (
  <label
    htmlFor={htmlFor}
    className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
  >
    {children}
    {optional && (
      <span className="normal-case tracking-normal text-muted-foreground/60 ml-1">
        (optional)
      </span>
    )}
  </label>
);

const InputField = ({ id, className, ...props }) => (
  <input
    id={id}
    className={cn(
      "w-full h-9 px-3 bg-background border border-input rounded-md",
      "text-[14px] font-sans text-foreground placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
      "transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
);

const Field = ({ id, label, optional, children }) => (
  <div className="flex flex-col gap-1.5">
    <FieldLabel htmlFor={id} optional={optional}>
      {label}
    </FieldLabel>
    {children}
  </div>
);

const ProfilePage = () => {
  const [name, setName] = useState("Elena Marsh");
  const [bio, setBio] = useState(
    "Home cook based in San Francisco. I write recipes for people who actually want to taste what they're making.",
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleProfileSave = (e) => {
    e.preventDefault();
    console.log("profile saved", { name, bio });
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    console.log("password changed");
  };

  return (
    <div className="px-5 md:px-8 py-8 max-w-xl">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Profile
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Manage your public profile and account settings.
        </p>
      </div>

      {/* ── Profile form ── */}
      <form onSubmit={handleProfileSave} className="flex flex-col gap-6">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Public Profile
        </p>

        {/* Avatar row */}
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-[18px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.02em]">
              EM
            </span>
          </div>
          <div>
            <p className="text-[13px] font-sans text-foreground font-medium">
              Elena Marsh
            </p>
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
              Member
            </p>
          </div>
        </div>

        <Field id="profile-name" label="Display Name">
          <InputField
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your display name"
          />
        </Field>

        <Field id="profile-email" label="Email">
          <InputField
            id="profile-email"
            value="elena@recipehub.com"
            disabled
            type="email"
          />
          <p className="text-[11px] font-sans text-muted-foreground/70">
            Email cannot be changed here. Contact support if needed.
          </p>
        </Field>

        <Field id="profile-bio" label="Bio" optional>
          <textarea
            id="profile-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="A short bio visible on your public profile…"
            className={cn(
              "w-full px-3 py-2.5 bg-background border border-input rounded-md",
              "text-[14px] font-sans text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
              "transition-all duration-150 resize-none",
            )}
          />
        </Field>

        <div className="flex justify-between items-center pt-2 border-t border-border gap-4">
          <p className="text-[12px] font-sans text-muted-foreground hidden sm:block">
            Changes are visible to other users immediately.
          </p>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="w-full sm:w-auto px-6 font-sans text-[13px] font-medium shrink-0"
          >
            Save Profile
          </Button>
        </div>
      </form>

      {/* ── Password form ── */}
      <form onSubmit={handlePasswordSave} className="flex flex-col gap-6 mt-10">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Change Password
        </p>

        <Field id="current-password" label="Current Password">
          <InputField
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </Field>

        <Field id="new-password" label="New Password">
          <InputField
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </Field>

        <div className="flex justify-end pt-2 border-t border-border">
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto px-6 font-sans text-[13px] font-medium"
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
