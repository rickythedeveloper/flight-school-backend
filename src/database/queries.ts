import { type OnConnectCallback } from './OnConnectCallback'
import { type Booking, getBookingFromBookingRow } from '../models/Booking'
import { type BookingRow } from './BookingRow'
import { type BookingRequest } from '../models/BookingRequest'

export const getSelectBookingsQuery = (): OnConnectCallback<Booking[]> => {
  const getBookingsSql = `
    SELECT id, start_time, end_time, instructor_id, aircraft_id FROM data.bookings
  `
  return async (client) => {
    const result = await client.query<BookingRow>(getBookingsSql)
    const bookingRows = result.rows
    return bookingRows.map(bookingRow => getBookingFromBookingRow(bookingRow))
  }
}

export const getInsertBookingQuery = (bookingRequest: BookingRequest): OnConnectCallback<void> => {
  const addBookingSql = `
    INSERT INTO data.bookings (start_time, end_time, instructor_id, aircraft_id)
    VALUES ($1, $2, $3, $4)
  `
  const values = [bookingRequest.startTime, bookingRequest.endTime, bookingRequest.instructorId, bookingRequest.aircraftId]
  return async (client) => {
    await client.query(addBookingSql, values)
  }
}

export const getDeleteBookingQuery = (bookingId: number): OnConnectCallback<void> => {
  const removeBookingSql = `
    DELETE FROM data.bookings WHERE id = $1
  `
  const values = [bookingId]
  return async (client) => {
    await client.query(removeBookingSql, values)
  }
}

export const getUpdateBookingQuery = (booking: Booking): OnConnectCallback<void> => {
  const updateBookingSql = `
    UPDATE data.bookings
    SET (start_time, end_time, instructor_id, aircraft_id) = ($1, $2, $3, $4)
    WHERE id = $5
  `
  const values = [booking.startTime, booking.endTime, booking.instructorId, booking.aircraftId, booking.id]
  return async (client) => {
    await client.query(updateBookingSql, values)
  }
}
