import type { BookingInputProps } from "../../type/typeBooking";

const BookingInput = ({
  type,
  id,
  text,
  className,
  name,
  defaultValue,
}: BookingInputProps) => {
  return (
    <label htmlFor={id}>
      {text}
      <input
        id={id}
        type={type}
        className={className}
        name={name}
        defaultValue={defaultValue}
        required
      />
    </label>
  );
};

export default BookingInput;
