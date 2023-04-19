import { type BookingsHelper } from './BookingsHelper'
import { type DatabaseHelper } from '../../../database/DatabaseHelper'
import { type Booking } from '../../../models/Booking'
import { type BookingRequest } from '../../../models/BookingRequest'

export class BookingsHelperImpl implements BookingsHelper {
  constructor(
    private readonly databaseHelper: DatabaseHelper,
  ) {}

  post = async (bookingRequest: BookingRequest): Promise<void> => {
    await this.databaseHelper.insertBooking(bookingRequest)
  }

  get = async (): Promise<Booking[]> => {
    return await this.databaseHelper.selectBookings()
  }

  put = async (booking: Booking): Promise<void> => {
    await this.databaseHelper.updateBooking(booking)
  }

  delete = async (bookingId: number): Promise<void> => {
    await this.databaseHelper.deleteBooking(bookingId)
  }
}
