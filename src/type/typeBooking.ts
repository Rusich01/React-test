import type {
  ButtonHTMLAttributes,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";

export interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  editBooking: (id: string, updatedData: Partial<Booking>) => void;
}

export interface Booking {
  id: string;
  startDate: string;
  exitDate: string;
}

export interface propsWindowModal {
  selectedId: string;
  setIsOpening: (value: boolean) => void;
  setErrorMessage: (value: boolean) => void;
  errorMessage?: boolean;
}

export type BookingItemProps = {
  setIsOpening: Dispatch<SetStateAction<boolean>>;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
};

export type BookingInputProps = {
  text?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type ButtonProps = {
  text: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
