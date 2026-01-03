import { useEffect, useRef } from "react";
import type { Booking, propsWindowModal } from "../type/typeBooking";
import { useBookingStore } from "../store/storeBooking";
import { validateBooking } from "../functions/validationForm";

export const useModalWindow = ({ selectedId }: propsWindowModal) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { bookings, closeModal, trueError, falseError } = useBookingStore();

  const editBooking = useBookingStore((s) => s.editBooking);

  const booking = useBookingStore((s) =>
    s.bookings.find((b) => b.id === selectedId)
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newBooking: Booking = {
      id: selectedId,
      startDate: data.startDate as string,
      exitDate: data.exitDate as string,
    };

    if (newBooking.startDate >= newBooking.exitDate) {
      trueError();
      return;
    }

    if (validateBooking(newBooking, bookings)) {
      trueError();
      return;
    }
    editBooking(selectedId, newBooking);
    falseError();
    closeModal();
  };
  return {
    formRef,
    booking,
    handleChange,
  };
};
