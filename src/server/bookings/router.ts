import express, { type Request, type Response, type Router } from 'express'
import { type Booking, parseSerialBooking } from '../../models/Booking'
import { type BookingsHelper } from './helper/BookingsHelper'
import { type BookingRequest, parseSerialBookingRequest } from '../../models/BookingRequest'
import { checkSerialObjectType } from '../../util/checkSerialObjectType'

export enum BookingsErrorType {
  unknownError,
  couldNotParseBookingRequest,
  couldNotParseBooking,
  couldNotParseBookingId,
}

export interface BookingsError {
  status: number
  payload: any
}

const createBookingsError = (status: number, payload: any): BookingsError => ({ status, payload })

export const getBookingsRouter = (bookingsHelper: BookingsHelper): Router => {
  const router = express.Router()

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/', async (req, res, next) => {
    try {
      const bookings = await bookingsHelper.get()
      res.json(bookings)
    } catch (error) {
      next(createBookingsError(500, error))
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/', async (req: Request<any, any, unknown>, res, next) => {
    let bookingRequest: BookingRequest
    try {
      bookingRequest = parseSerialBookingRequest(req.body)
    } catch {
      next(createBookingsError(400, 'Could not parse booking request'))
      return
    }

    try {
      await bookingsHelper.post(bookingRequest)
      res.status(200).send()
    } catch (error) {
      next(createBookingsError(500, error))
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.put('/', async (req: Request<any, any, unknown>, res, next) => {
    let booking: Booking
    try {
      booking = parseSerialBooking(req.body)
    } catch {
      next(createBookingsError(400, 'Could not parse booking'))
      return
    }

    try {
      await bookingsHelper.put(booking)
      res.status(200).send()
    } catch (error) {
      next(createBookingsError(500, error))
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/', async (req: Request<unknown, any, unknown>, res, next) => {
    if (!checkSerialObjectType(req.body, { id: 1 })) {
      next(createBookingsError(400, 'Could not parse booking ID'))
      return
    }

    try {
      const bookingId = req.body.id
      await bookingsHelper.delete(bookingId)
      res.status(200).send()
    } catch (error) {
      next(createBookingsError(500, error))
    }
  })

  return router
}

// const setStatusMessageAndStatus = (res: Response, error: unknown, statusCode: number): void => {
//   res.statusMessage = typeof error === 'string' ? error : 'unknown error'
//   res.status(statusCode)
// }
