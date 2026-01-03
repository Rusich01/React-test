import type { Booking } from "../type/typeBooking";

export const validateBooking = (newBooking: Booking, existing: Booking[]) => {
  return existing.some((b) => {
    if (b.id === newBooking.id) return false;
    return (
      newBooking.startDate < b.exitDate && newBooking.exitDate > b.startDate
    );
  });
};
