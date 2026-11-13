# Changelog

## 0.3.3

- Back-to-back bookings no longer count as conflicts: `overlaps`, `conflicts` and `isFree` treat a booking's end as free, so a booking or slot may start exactly when another ends.

## 0.3.2

- `conflicts` lists each overlapping pair once instead of twice.

## 0.3.1

- `isFree` ignores bookings in other rooms.

## 0.3.0

- First version with `overlaps`, `conflicts` and `isFree`.
