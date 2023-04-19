import { describe, expect, jest } from '@jest/globals'
import { getDeleteBookingQuery, getInsertBookingQuery, getSelectBookingsQuery, getUpdateBookingQuery } from './queries'
import { type BookingRow } from './BookingRow'
import { type Booking, getBookingFromBookingRow } from '../models/Booking'
import { type BookingRequest } from '../models/BookingRequest'

describe('queries', () => {
  describe('getSelectBookingsQuery', () => {
    it('should return the correct bookings', async () => {
      const bookingRows: BookingRow[] = [
        {
          id: 1,
          start_time: new Date(),
          end_time: new Date(),
          instructor_id: 1,
          aircraft_id: 1,
        },
        {
          id: 2,
          start_time: new Date(),
          end_time: new Date(),
          instructor_id: 1,
          aircraft_id: 1,
        },
      ]
      const result = { rows: bookingRows }
      const expected = bookingRows.map(bookingRow => getBookingFromBookingRow(bookingRow))

      const client: any = {
        query: jest.fn().mockImplementation(async () => { return result }),
      }
      const actual = await getSelectBookingsQuery()(client)

      expect(actual).toEqual(expected)
    })

    it('should throw whatever is thrown by the database query', async () => {
      const errorMessage = 'test error message'
      const client: any = {
        query: jest.fn().mockImplementation(async () => { throw new Error(errorMessage) }),
      }

      await expect(async () => { await getSelectBookingsQuery()(client) })
        .rejects
        .toThrow(errorMessage)
    })
  })

  describe('getInsertBookingQuery', () => {
    it('should throw whatever is thrown by the database query', async () => {
      const errorMessage = 'test error message'
      const client: any = {
        query: jest.fn().mockImplementation(async () => { throw new Error(errorMessage) }),
      }

      const bookingRequest: BookingRequest = {
        startTime: new Date(),
        endTime: new Date(),
        instructorId: 1,
        aircraftId: 1,
      }

      await expect(async () => { await getInsertBookingQuery(bookingRequest)(client) })
        .rejects
        .toThrow(errorMessage)
    })
  })

  describe('getDeleteBookingQuery', () => {
    it('should throw whatever is thrown by the database query', async () => {
      const errorMessage = 'test error message'
      const client: any = {
        query: jest.fn().mockImplementation(async () => { throw new Error(errorMessage) }),
      }

      await expect(async () => { await getDeleteBookingQuery(1)(client) })
        .rejects
        .toThrow(errorMessage)
    })
  })

  describe('getUpdateBookingQuery', () => {
    it('should throw whatever is thrown by the database query', async () => {
      const errorMessage = 'test error message'
      const client: any = {
        query: jest.fn().mockImplementation(async () => { throw new Error(errorMessage) }),
      }

      const booking: Booking = {
        id: 1,
        startTime: new Date(),
        endTime: new Date(),
        instructorId: 1,
        aircraftId: 1,
      }

      await expect(async () => { await getUpdateBookingQuery(booking)(client) })
        .rejects
        .toThrow(errorMessage)
    })
  })
})
