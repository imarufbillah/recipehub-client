"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/components/ui/FormField";
import { updateUser } from "@/lib/apiClient.client";
import uploadToImgbb from "@/lib/uploadToImgbb";

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name ?? "");
  const [image, setImage] = useState(user?.image ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Derive avatar initials from real name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  // Preview: use the current image field value if it looks like a URL,
  // otherwise fall back to the saved session image
  const avatarSrc = image?.startsWith("http") ? image : (user?.image ?? null);

  const roleLabel =
    user?.role === "admin"
      ? "Administrator"
      : user?.plan === "premium"
        ? "Premium Member"
        : "Member";

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic client-side guard — ImgBB accepts up to 32MB but keep it sane
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setImage(url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err?.message ?? "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset so the same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Display name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      await updateUser(user.id, {
        name: name.trim(),
        image: image.trim() || null,
        bio: bio.trim() || null,
      });
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(err?.message ?? "Couldn't save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* ── Profile form ── */}
      <form onSubmit={handleProfileSave} className="flex flex-col gap-6">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Public Profile
        </p>

        {/* Avatar preview + upload trigger */}
        <div className="flex items-center gap-4">
          {/* Avatar circle — clicking it also triggers the file picker */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            aria-label="Change profile photo"
            className="relative size-14 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden group/avatar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={name || "avatar"}
                width={400}
                height={400}
                className="size-full object-cover rounded-full"
              />
            ) : (
              <span className="text-[18px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.02em]">
                {initials}
              </span>
            )}

            {/* Hover / uploading overlay */}
            <span
              className="absolute inset-0 rounded-full flex items-center justify-center bg-foreground/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-150"
              aria-hidden
            >
              {isUploading ? (
                <Loader2 className="size-4 text-background animate-spin" />
              ) : (
                <Upload className="size-4 text-background" />
              )}
            </span>
          </button>

          <div className="flex flex-col gap-1.5">
            <p className="text-[13px] font-sans text-foreground font-medium">
              {name || user?.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
              {roleLabel}
            </p>
            {/* Inline upload button as text alternative to clicking the avatar */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-[11px] font-sans text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors duration-150 w-fit disabled:opacity-50 disabled:pointer-events-none"
            >
              {isUploading ? "Uploading…" : "Change photo"}
            </button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImageUpload}
            aria-label="Upload profile photo"
          />
        </div>

        <FormField htmlFor="profile-name" label="Display Name">
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your display name"
            required
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
            disabled={isSaving || isUploading}
            className="w-full sm:w-auto px-6 font-sans text-[13px] font-medium shrink-0"
          >
            {isSaving ? "Saving…" : "Save Profile"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
