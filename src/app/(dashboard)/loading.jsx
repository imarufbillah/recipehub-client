const DashboardLoading = () => {
  return (
    <div className="px-5 md:px-8 py-8 animate-pulse">
      {/* Page title skeleton */}
      <div className="mb-6">
        <div className="h-3.5 w-32 bg-muted rounded-sm mb-2" />
        <div className="h-3 w-52 bg-muted/60 rounded-sm" />
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-5 flex flex-col gap-3"
          >
            <div className="h-2.5 w-16 bg-muted rounded-sm" />
            <div className="h-6 w-10 bg-muted rounded-sm" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="border-b border-border px-5 py-3 flex gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2.5 bg-muted rounded-sm flex-1" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-border last:border-0 px-5 py-4 flex gap-6 items-center"
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className="h-3 bg-muted/50 rounded-sm flex-1"
                style={{ opacity: 1 - j * 0.1 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLoading;
