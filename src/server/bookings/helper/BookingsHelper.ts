import { type Booking } from '../../../models/Booking'
import { type BookingRequest } from '../../../models/BookingRequest'

export interface BookingsHelper {
  post: (bookingRequest: BookingRequest) => Promise<void>
  get: () => Promise<Booking[]>
  put: (booking: Booking) => Promise<void>
  delete: (bookingId: number) => Promise<void>
}
