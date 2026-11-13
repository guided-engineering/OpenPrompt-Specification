/**
 * Bookings are { id, room, start, end }, with start and end in minutes from
 * midnight. A booking occupies its room from start up to, but not including,
 * end.
 */

/** Do two bookings need the same room at the same time? */
export function overlaps(a, b) {
  return a.room === b.room && a.start < b.end && b.start < a.end;
}

/** Ids of every pair of bookings that overlap, in input order. */
export function conflicts(bookings) {
  const pairs = [];
  for (let i = 0; i < bookings.length; i += 1) {
    for (let j = i + 1; j < bookings.length; j += 1) {
      if (overlaps(bookings[i], bookings[j])) pairs.push([bookings[i].id, bookings[j].id]);
    }
  }
  return pairs;
}

/** Is the room free from start up to, but not including, end? */
export function isFree(bookings, room, start, end) {
  return !bookings.some((b) => b.room === room && b.start <= end && start <= b.end);
}
