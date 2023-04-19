import { type BookingRow } from '../database/BookingRow'
import { checkSerialObjectType } from '../util/checkSerialObjectType'

export interface Booking {
  id: number
  startTime: Date
  endTime: Date
  instructorId: number
  aircraftId: number
}

export interface SerialBooking {
  id: number
  startTime: string
  endTime: string
  instructorId: number
  aircraftId: number
}

export const parseSerialBooking = (obj: unknown): Booking => {
  if (!checkSerialObjectType(obj, exampleSerialBooking)) {
    throw new TypeError('Could not parse serial booking')
  }

  return getBookingFromSerialBooking(obj)
}

const exampleSerialBooking: SerialBooking = {
  id: 1,
  startTime: '2023-01-01T12:00:00.000Z',
  endTime: '2023-01-01T12:00:00.000Z',
  instructorId: 1,
  aircraftId: 1,
}

const getBookingFromSerialBooking = (serialBooking: SerialBooking): Booking => ({
  id: serialBooking.id,
  startTime: new Date(serialBooking.startTime),
  endTime: new Date(serialBooking.endTime),
  instructorId: serialBooking.instructorId,
  aircraftId: serialBooking.aircraftId,
})

export const getBookingFromBookingRow = (bookingRow: BookingRow): Booking => ({
  id: bookingRow.id,
  startTime: bookingRow.start_time,
  endTime: bookingRow.end_time,
  instructorId: bookingRow.instructor_id,
  aircraftId: bookingRow.aircraft_id,
})
