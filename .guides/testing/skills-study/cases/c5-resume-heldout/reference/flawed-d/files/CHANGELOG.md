# Changelog

## 0.3.3

- Back-to-back bookings no longer count as conflicts, and a slot next to a booking is free: a booking ends just before its `end` minute.

## 0.3.2

- `conflicts` lists each overlapping pair once instead of twice.

## 0.3.1

- `isFree` ignores bookings in other rooms.

## 0.3.0

- First version with `overlaps`, `conflicts` and `isFree`.
