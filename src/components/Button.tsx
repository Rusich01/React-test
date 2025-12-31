import type { ButtonProps } from "../type/typeBooking";

const Button = ({ text, className, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;
