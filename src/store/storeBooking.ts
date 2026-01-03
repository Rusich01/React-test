import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingStore } from "../type/typeBooking";

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],

      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),

      editBooking: (id, updatedData) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, ...updatedData } : booking
          ),
        })),

      removeBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((item) => item.id !== id),
        })),

      isOpened: false,
      openModal: () => set({ isOpened: true }),
      closeModal: () => set({ isOpened: false }),

      errorMessage: false,
      trueError: () => set({ errorMessage: true }),
      falseError: () => set({ errorMessage: false }),
    }),
    {
      name: "booking-storage",
      partialize: (state) => ({
        bookings: state.bookings,
      }),
    }
  )
);
