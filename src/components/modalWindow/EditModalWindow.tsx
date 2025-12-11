import { useEffect, useRef } from "react";
import BookingInput from "../BookingInput";
import Button from "../Button";
import { useBookingStore } from "../../store/storeBooking";

const EditModalWindow = ({ setIsOpening, selectedId }: any) => {
  const formRef = useRef<HTMLFormElement>(null);

  const editBooking = useBookingStore((s) => s.editBooking);

  const booking = useBookingStore((s) => {
    return s.bookings.find((b) => b.id === selectedId);
  });

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

    editBooking(selectedId, data);
    setIsOpening(false);
  };
  console.log(booking);
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
