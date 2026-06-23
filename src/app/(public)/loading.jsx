const PublicLoading = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Hero area skeleton */}
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-24 lg:py-32">
        <div className="flex flex-col gap-5 max-w-lg">
          <div className="h-3 w-20 bg-muted rounded-sm" />
          <div className="h-10 w-3/4 bg-muted rounded-sm" />
          <div className="h-10 w-1/2 bg-muted/70 rounded-sm" />
          <div className="h-4 w-2/3 bg-muted/50 rounded-sm mt-2" />
          <div className="h-10 w-32 bg-muted rounded-md mt-2" />
        </div>
      </div>

      {/* Card grid skeleton */}
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card overflow-hidden"
            >
              <div className="aspect-4/3 bg-muted" />
              <div className="p-6 flex flex-col gap-3">
                <div className="h-2.5 w-16 bg-muted/60 rounded-sm" />
                <div className="h-5 w-4/5 bg-muted rounded-sm" />
                <div className="h-3 w-1/2 bg-muted/50 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicLoading;
