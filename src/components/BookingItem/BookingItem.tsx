import Button from "../BookingButton/Button";
import type { BookingItemProps } from "../../type/typeBooking";
import { useBookingStore } from "../../store/storeBooking";

const BookingItem = ({ setIsOpening, setSelectedId }: BookingItemProps) => {
  const removeBooking = useBookingStore((state) => state.removeBooking);
  const bookings = useBookingStore((state) => state.bookings);

  return (
    <ul>
      {bookings.map((booking) => (
        <li
          key={booking.id}
          className="bg-white shadow-md rounded-2xl px-4 py-4 flex justify-between items-center border border-gray-200 hover:bg-[#d8d8d8] transition duration-300"
        >
          <div className="text-gray-900 font-medium flex gap-1.5">
            <span>
              {booking.startDate} <span className="text-gray-400">→</span>
              {booking.exitDate}
            </span>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsOpening(true);
                setSelectedId(booking.id);
              }}
              className="cursor-pointer px-3 py-1 bg-yellow-300 hover:bg-yellow-400 text-black rounded-lg text-sm font-medium"
              text="Edit"
            />
            <Button
              onClick={() => removeBooking(booking.id)}
              className="cursor-pointer px-3 py-1 bg-red-400 hover:bg-red-500 text-white rounded-lg text-sm font-medium"
              text="Del"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingItem;
