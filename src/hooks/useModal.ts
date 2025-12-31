import { useEffect, useRef } from "react";
import type { Booking, propsWindowModal } from "../type/typeBooking";
import { useBookingStore } from "../store/storeBooking";

export const useModalWindow = ({
  selectedId,
  setIsOpening,
  setErrorMessage,
}: propsWindowModal) => {
  const formRef = useRef<HTMLFormElement>(null);
  const bookings = useBookingStore((state) => state.bookings);

  const editBooking = useBookingStore((s) => s.editBooking);

  const booking = useBookingStore((s) => {
    return s.bookings.find((b) => b.id === selectedId);
  });

  const validateBooking = (newBooking: Booking, existing: Booking[]) => {
    return existing.some((b) => {
      if (b.id === newBooking.id) return false;

      return (
        newBooking.startDate < b.exitDate && newBooking.exitDate > b.startDate
      );
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) {
        setIsOpening(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpening]);

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
      setErrorMessage(true);
      return;
    }

    if (validateBooking(newBooking, bookings)) {
      setErrorMessage(true);
      return;
    }
    editBooking(selectedId, data);
    setErrorMessage(false);
    setIsOpening(false);
  };
  return {
    formRef,
    booking,
    handleChange,
  };
};
