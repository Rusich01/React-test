import { useBookingStore } from "../store/storeBooking";
import Button from "./Button";

const BookingItem = () => {
  const removeBooking = useBookingStore((state) => state.removeBooking);
  const bookings = useBookingStore((state) => state.bookings);

  return (
    <ul>
      {bookings.map((data, index) => (
        <li
          key={data.id}
          className={`flex border rounded p-2 items-center justify-between  ${
            index >= 1 ? "border-t-transparent -mt-0.5" : ""
          }`}
        >
          <div className="flex gap-2">
            <div>{data.startDate}</div>
            &gt;
            <div>{data.exitDate}</div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => removeBooking(data.id)}
              className="cursor-pointer bg-[oklch(0.63_0.26_25.89)] p-0.5 rounded-[5px] text-[15px]"
              text="Del"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingItem;
