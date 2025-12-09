import BookingForm from "../components/BookingInput";
import BookingItem from "../components/BookingItem";
import Button from "../components/Button";
import type { Booking } from "../store/storeBooking";
import { useBookingStore } from "../store/storeBooking";

const BookingsPage = () => {
  const addBooking = useBookingStore((state) => state.addBooking);
  const bookings = useBookingStore((state) => state.bookings);
  //
  const validateBooking = (newBooking: Booking, existing: Booking[]) => {
    return existing.some((b) => {
      return (
        newBooking.startDate <= b.exitDate && newBooking.exitDate >= b.startDate
      );
    });
  };
  //
  const handleForm = (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const booking = {
      id: Date.now(),
      startDate: data.startDate as string,
      exitDate: data.exitDate as string,
    };
    if (validateBooking(booking, bookings)) {
      return alert("These dates are already booked!");
    }
    addBooking(booking);
    form.reset();
  };

  return (
    <div className="flex w-[350px] m-12 mx-auto flex-col gap-2">
      <h1 className="text-[30px] font-semibold text-center">Booking Manager</h1>
      <div className=" flex justify-center  ">
        <form onSubmit={handleForm} className="flex gap-[15px] flex-col w-full">
          <BookingForm
            className="w-full p-4 border border-gray-300 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
            type="date"
            name="startDate"
            id="startDate"
          />
          <BookingForm
            className="w-full p-4 border border-gray-300 rounded-2xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
            type="date"
            name="exitDate"
            id="exitDate"
          />

          <Button
            text="Create booking"
            type="submit"
            className="cursor-pointer w-full py-4 bg-green-400 hover:bg-green-500 active:scale-95 transition rounded-full text-lg font-semibold text-black"
          />
        </form>
      </div>
      <BookingItem />
    </div>
  );
};

export default BookingsPage;
