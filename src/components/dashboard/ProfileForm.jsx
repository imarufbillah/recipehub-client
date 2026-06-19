"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/components/ui/FormField";

/**
 * ProfileForm — client component.
 *
 * Receives the server-fetched user object as a prop and seeds form state
 * from it. Keeps the profile page itself as a lean server component.
 *
 * Props:
 *  user — real better-auth user object:
 *    { name, email, image, role, plan, ... }
 */
const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Derive avatar initials from real name
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const roleLabel =
    user?.role === "admin"
      ? "Administrator"
      : user?.plan === "premium"
        ? "Premium Member"
        : "Member";

  const handleProfileSave = (e) => {
    e.preventDefault();
    // TODO: wire to API
    console.log("profile saved", { name, bio });
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    // TODO: wire to API
    console.log("password changed");
  };

  return (
    <>
      {/* ── Profile form ── */}
      <form onSubmit={handleProfileSave} className="flex flex-col gap-6">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Public Profile
        </p>

        {/* Avatar + identity row */}
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "avatar"}
                width={400}
                height={400}
                className="size-full object-cover rounded-full"
              />
            ) : (
              <span className="text-[18px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.02em]">
                {initials}
              </span>
            )}
          </div>
          <div>
            <p className="text-[13px] font-sans text-foreground font-medium">
              {user?.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
              {roleLabel}
            </p>
          </div>
        </div>

        <FormField htmlFor="profile-name" label="Display Name">
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your display name"
          />
        </FormField>

        <FormField htmlFor="profile-email" label="Email">
          <Input
            id="profile-email"
            value={user?.email ?? ""}
            disabled
            type="email"
          />
          <p className="text-[11px] font-sans text-muted-foreground/70">
            Email cannot be changed here. Contact support if needed.
          </p>
        </FormField>

        <FormField htmlFor="profile-bio" label="Bio" optional>
          <Textarea
            id="profile-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="A short bio visible on your public profile…"
            className="resize-none"
          />
        </FormField>

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

      {/* ── Password form (only for email/password accounts) ── */}
      <form onSubmit={handlePasswordSave} className="flex flex-col gap-6 mt-10">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Change Password
        </p>

        <FormField htmlFor="current-password" label="Current Password">
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </FormField>

        <FormField htmlFor="new-password" label="New Password">
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </FormField>

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
    </>
  );
};

export default ProfileForm;
