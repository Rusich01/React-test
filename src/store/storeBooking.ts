import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Booking {
  id: number;
  startDate: string;
  exitDate: string;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  removeBooking: (r: number) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],

      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),

      removeBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((item) => item.id !== id),
        })),
    }),
    { name: "booking-storage" }
  )
);
