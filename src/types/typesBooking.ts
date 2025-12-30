export type UseModalWindowProps = {
  selectedId: string | null;
  setIsOpening: (value: boolean) => void;
  errorMessage: boolean;
  setErrorMessage: (value: boolean) => void;
};

export interface Booking {
  id: string;
  startDate: string;
  exitDate: string;
}

export interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: Booking["id"]) => void;
  editBooking: (id: Booking["id"], updatedData: Partial<Booking>) => void;
}
