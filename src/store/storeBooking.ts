import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Booking {
  id: number;
  startDate: string;
  exitDate: string;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: number) => void;
  editBooking: (id: number) => void; // правильное имя, если ты хочешь передавать id
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],

      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),

      editBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((item) => item.id === id),
        })),

      removeBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((item) => item.id !== id),
        })),
    }),

    { name: "booking-storage" }
  )
);
