import Skeleton from "@/components/ui/Skeleton";

const ProfileLoading = () => (
  <div className="px-5 md:px-8 py-8 flex flex-col items-center animate-pulse">
    <div className="w-full max-w-xl">
      {/* Static page heading */}
      <div className="mb-8">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-3 w-56 mt-2" />
      </div>

      {/* ── Public Profile section ── */}
      <div className="flex flex-col gap-6">
        {/* Section label */}
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <Skeleton className="h-2.5 w-24" />
        </div>

        {/* Avatar + name block */}
        <div className="flex items-center gap-4">
          <Skeleton className="size-14 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>

        {/* Display Name field */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-10" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-2.5 w-56" />
        </div>

        {/* Bio textarea */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-8" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>

        {/* Save button row */}
        <div className="flex justify-between items-center pt-2 border-t border-border gap-4">
          <Skeleton className="h-3 w-56 hidden sm:block" />
          <Skeleton className="h-8 w-full sm:w-28 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileLoading;
