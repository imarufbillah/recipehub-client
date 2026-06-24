const UserMenuSkeleton = () => (
  <div className="flex items-center gap-2 animate-pulse" aria-hidden="true">
    {/* Avatar circle */}
    <span className="size-8 rounded-full bg-muted shrink-0" />

    {/* First name — desktop only, matches hidden md:block text-[15px] */}
    <span className="hidden md:block h-3.5 w-14 rounded-sm bg-muted" />

    {/* Chevron */}
    <span className="size-3.5 rounded-sm bg-muted shrink-0" />
  </div>
);

export default UserMenuSkeleton;
