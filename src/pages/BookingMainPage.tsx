import { useState } from "react";
import { useBookingStore } from "../store/storeBooking";
import ModalWindow from "../components/modalWindow/ModalWindow";
import BookingInput from "../components/BookingInput/BookingInput";
import Button from "../components/BookingButton/Button";
import BookingItem from "../components/BookingItem/BookingItem";
import { validateBooking } from "../functions/validationForm";

const BookingsPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    bookings,
    addBooking,
    isOpened,
    trueError,
    falseError,
    errorMessage,
  } = useBookingStore();

  const handelForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const booking = {
      id: Date.now().toString(),
      startDate: data.startDate as string,
      exitDate: data.exitDate as string,
    };

    if (validateBooking(booking, bookings)) {
      return trueError();
    }
    if (booking.startDate > booking.exitDate) {
      return trueError();
    }

    addBooking(booking);
    falseError();
    form.reset();
  };

  const styleModalWindow = `${
    isOpened
      ? "flex w-[350px] m-12 mx-auto flex-col gap-2 relative opacity-15"
      : "flex w-[350px] m-12 mx-auto flex-col gap-2 relative opacity-100"
  } `;

  return (
    <>
      <div className={styleModalWindow}>
        <h1 className="text-[30px] font-semibold text-center">
          Booking Manager
        </h1>
        <div className=" flex justify-center">
          <form
            onSubmit={handelForm}
            className="flex gap-[15px] flex-col w-full "
          >
            <BookingInput
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
              type="date"
              name="startDate"
              id="startDate"
            />

            <BookingInput
              className="w-full p-4 border border-gray-300 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
              type="date"
              name="exitDate"
              id="exitDate"
            />

            {errorMessage && (
              <span className="text-center text-red-500 text-[15px] font-bold animate-pulse">
                These dates are already booked!
              </span>
            )}

            <Button
              text="Create booking"
              type="submit"
              className="cursor-pointer w-full py-4 bg-green-400 hover:bg-green-500 active:scale-95 transition rounded-full text-lg font-semibold text-black"
            />
          </form>
        </div>

        <BookingItem setSelectedId={setSelectedId} />
      </div>
      <div className={`${isOpened ? "opacity-100" : "opacity-0"}`}>
        {isOpened && <ModalWindow selectedId={selectedId!} />}
      </div>
    </>
  );
};

export default BookingsPage;
