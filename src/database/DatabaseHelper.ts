import { type Booking } from '../models/Booking'
import { type BookingRequest } from '../models/BookingRequest'

export interface DatabaseHelper {
  selectBookings: () => Promise<Booking[]>
  insertBooking: (booking: BookingRequest) => Promise<void>
  deleteBooking: (bookingId: number) => Promise<void>
  updateBooking: (booking: Booking) => Promise<void>
}
