import { useEffect, useRef } from "react";
import BookingInput from "../BookingInput";
import Button from "../Button";
import { useBookingStore, type Booking } from "../../store/storeBooking";

const EditModalWindow = ({
  setIsOpening,
  selectedId,
  errorMessage,
  setErrorMessage,
}: any) => {
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

  const handleChange = (e: any) => {
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

  return (
    <div
      className="absolute w-[400px]  inset-0
           top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-3xl"
    >
      <form
        onSubmit={handleChange}
        ref={formRef}
        className="bg-[color-mix(in_oklab,#f2f2f2_90%,transparent)]
            p-6 rounded-3xl  w-full 
            border border-white/30 
            shadow-[0_10px_40px_0_rgba(0,0,0,0.35)]
            "
      >
        <div className="flex flex-col gap-1.5 w-full p-3.5">
          <BookingInput
            className="w-full p-4 rounded-2xl border border-gray-300 
         bg-white text-gray-700 font-medium
         focus:ring-2 focus:ring-blue-400 focus:border-transparent 
         outline-none shadow-sm"
            type="date"
            name="startDate"
            id="startDate"
            defaultValue={booking?.startDate}
          />
          <BookingInput
            className="w-full p-4 rounded-2xl border border-gray-300 
         bg-white text-gray-700 font-medium
         focus:ring-2 focus:ring-blue-400 focus:border-transparent 
         outline-none shadow-sm"
            type="date"
            name="exitDate"
            id="exitDate"
            defaultValue={booking?.exitDate}
          />
          {errorMessage && (
            <p className="text-center text-red-500 text-[15px] font-bold animate-pulse">
              This date is not available.
            </p>
          )}
          <Button
            text="Edit booking"
            type="submit"
            className=" mt-5 cursor-pointer w-full py-4 bg-[oklch(0.78_0.12_254.9)] hover:bg-blue-500 active:scale-95 transition rounded-full text-lg font-semibold text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default EditModalWindow;
