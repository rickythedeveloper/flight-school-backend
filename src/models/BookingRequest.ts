import { type Booking, type SerialBooking } from './Booking'
import { checkSerialObjectType } from '../util/checkSerialObjectType'

export type BookingRequest = Omit<Booking, 'id'>
type SerialBookingRequest = Omit<SerialBooking, 'id'>

export const parseSerialBookingRequest = (obj: unknown): BookingRequest => {
  if (!checkSerialObjectType(obj, exampleSerialBookingRequest)) {
    throw new TypeError('Missing filed(s) in the booking request')
  }

  return getBookingRequestFromSerialBookingRequest(obj)
}

const exampleSerialBookingRequest: SerialBookingRequest = {
  startTime: '2023-01-01T12:00:00.000Z',
  endTime: '2023-01-01T12:00:00.000Z',
  instructorId: 1,
  aircraftId: 1,
}

const getBookingRequestFromSerialBookingRequest = (serialBookingRequest: SerialBookingRequest): BookingRequest => ({
  startTime: new Date(serialBookingRequest.startTime),
  endTime: new Date(serialBookingRequest.endTime),
  aircraftId: serialBookingRequest.aircraftId,
  instructorId: serialBookingRequest.instructorId,
})
