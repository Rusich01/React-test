import type { Booking } from "../type/typeBooking";

export const validateBooking = (newBooking: Booking, existing: Booking[]) => {
  return existing.some((b) => {
    return (
      newBooking.startDate < b.exitDate && newBooking.exitDate > b.startDate
    );
  });
};
