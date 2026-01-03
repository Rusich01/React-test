export interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  editBooking: (id: string, updatedData: Partial<Booking>) => void;
  isOpened: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
  errorMessage: boolean;
  trueError: VoidFunction;
  falseError: VoidFunction;
}

export interface Booking {
  id: string;
  startDate: string;
  exitDate: string;
}

export interface propsWindowModal {
  selectedId: string;
}
