/** Shared display formatting. */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * How long ago a listing was posted, in plain words.
 *
 * Recent listings read relatively ("3 days ago") because that is what a renter
 * actually cares about; anything older than a month falls back to a date, since
 * "posted 94 days ago" is noise.
 */
export const formatPostedAt = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const posted = new Date(iso);
  const elapsed = Date.now() - posted.getTime();
  if (Number.isNaN(posted.getTime()) || elapsed < 0) return "";

  if (elapsed < HOUR) {
    const minutes = Math.max(1, Math.floor(elapsed / MINUTE));
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }
  if (elapsed < DAY) {
    const hours = Math.floor(elapsed / HOUR);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (elapsed < 30 * DAY) {
    const days = Math.floor(elapsed / DAY);
    return days === 1 ? "Yesterday" : `${days} days ago`;
  }
  return posted.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

/** Full date for tooltips and the detail page, e.g. "10 August 2026". */
export const formatPostedDate = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const posted = new Date(iso);
  if (Number.isNaN(posted.getTime())) return "";
  return posted.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
};
