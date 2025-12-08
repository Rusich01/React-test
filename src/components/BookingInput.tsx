const BookingForm = ({ type, id, text, className, name }: any) => {
  return (
    <label htmlFor={id}>
      {text}
      <input id={id} type={type} className={className} name={name} required />
    </label>
  );
};

export default BookingForm;
