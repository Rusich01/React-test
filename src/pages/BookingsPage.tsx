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
  const haendelForm = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
  };

  return (
    <div className="flex w-[350px] m-12 mx-auto flex-col gap-2">
      <h1 className="text-[30px] font-semibold text-center">Booking Manager</h1>
      <div className=" flex justify-center  ">
        <form
          onSubmit={haendelForm}
          className="flex gap-[15px] flex-col w-full"
        >
          <BookingForm
            className={"border rounded p-2 w-full"}
            type="date"
            name="startDate"
            id="startDate"
          />
          <BookingForm
            className={"border rounded p-2 w-full"}
            type="date"
            name="exitDate"
            id="exitDate"
          />

          <Button
            text="Create booking"
            type="submit"
            className="cursor-pointer bg-[oklch(0.79_0.2_165.4)] py-[5px] px-2.5 rounded-2xl"
          />
        </form>
      </div>
      <BookingItem />
    </div>
  );
};

export default BookingsPage;
