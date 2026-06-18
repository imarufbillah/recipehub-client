/**
 * Magazine pull-quote card — overlaps the bottom-left corner of the hero image.
 * Card token background, hairline border, small serif dish name + muted meta line.
 * Server component — purely presentational.
 */
const HeroCaptionCard = ({ dish, meta }) => {
  return (
    <div className="bg-card border border-border rounded-lg px-5 py-4 max-w-55 shadow-none">
      {/* Dish name — H3 scale but kept tight, serif */}
      <p className="font-heading text-[17px] leading-snug tracking-[-0.01em] text-card-foreground">
        {dish}
      </p>

      {/* Meta line — caption/micro style */}
      <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
        {meta}
      </p>
    </div>
  );
};

export default HeroCaptionCard;
