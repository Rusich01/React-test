import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  text: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, className, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;
