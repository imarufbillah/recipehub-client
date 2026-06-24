import Skeleton from "@/components/ui/Skeleton";

/**
 * Profile — heading, subtitle, section label, and all field labels are static.
 * Dynamic (API/session): avatar image, displayed name, role badge, and input values.
 */
const ProfileLoading = () => (
  <div className="px-5 md:px-8 py-8 flex flex-col items-center">
    <div className="w-full max-w-xl">
      {/* Static page heading */}
      <div className="mb-8">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Profile
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Manage your public profile and account settings.
        </p>
      </div>

      <div className="flex flex-col gap-6 animate-pulse">
        {/* Static section label */}
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Public Profile
        </p>

        {/* Avatar + name — dynamic (session data) */}
        <div className="flex items-center gap-4">
          <Skeleton className="size-14 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>

        {/* Display Name field — label static, input value dynamic */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
            Display Name
          </p>
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        {/* Email field — label static, value dynamic */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
            Email
          </p>
          <Skeleton className="h-9 w-full rounded-md" />
          <p className="text-[11px] font-sans text-muted-foreground/70">
            Email cannot be changed here. Contact support if needed.
          </p>
        </div>

        {/* Bio textarea — label static, value dynamic */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
            Bio
            <span className="ml-1.5 text-muted-foreground normal-case tracking-normal font-normal">
              (optional)
            </span>
          </p>
          <Skeleton className="h-20 w-full rounded-md" />
        </div>

        {/* Save button row */}
        <div className="flex justify-between items-center pt-2 border-t border-border gap-4">
          <p className="text-[12px] font-sans text-muted-foreground hidden sm:block">
            Changes are visible to other users immediately.
          </p>
          <Skeleton className="h-8 w-full sm:w-28 rounded-md shrink-0" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileLoading;
