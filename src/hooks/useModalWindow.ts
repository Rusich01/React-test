import { useEffect, useRef, type FormEvent } from "react";
import { useBookingStore } from "../store/storeBooking";
import type { Booking, UseModalWindowProps } from "../types/type.modalWindow";
import { validateBooking } from "../functions/function";

export const useModalWindow = ({
  setIsOpening,
  selectedId,
  errorMessage,
  setErrorMessage,
}: UseModalWindowProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const bookings = useBookingStore((state) => state.bookings);

  const editBooking = useBookingStore((s) => s.editBooking);

  const booking = useBookingStore((s) =>
    // s.bookings.find((b) => b.id === selectedId)
    selectedId ? s.bookings.find((b) => b.id === selectedId) : null
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) {
        setIsOpening(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpening]);

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newBooking: Booking = {
      id: selectedId!,
      startDate: data.startDate as string,
      exitDate: data.exitDate as string,
    };

    if (newBooking.startDate >= newBooking.exitDate) {
      setErrorMessage(true);
      return;
    }

    if (validateBooking(newBooking, bookings)) {
      setErrorMessage(true);
      return;
    }
    if (!selectedId) return;
    editBooking(selectedId, data);
    setErrorMessage(false);
    setIsOpening(false);
  };
  return {
    formRef,
    handleChange,
    errorMessage,
    booking,
  };
};
