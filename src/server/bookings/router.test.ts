import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { getBookingsRouter } from './router'
import { type Booking } from '../../models/Booking'
import { type BookingsHelper } from './helper/BookingsHelper'
import { ServerImpl } from '../ServerImpl'
import { type BookingRequest } from '../../models/BookingRequest'

const bookingsUrl = '/bookings'

describe('getBookingRouter', () => {
  it('should return 500 for bad bookings helper', async () => {
    const router = getBookingsRouter(badBookingsHelper)
    const server = new ServerImpl(router)
    const getResponse = await request(server.app).get(bookingsUrl)
    const postResponse = await request(server.app).post(bookingsUrl).send(bookingRequest)
    const putResponse = await request(server.app).put(bookingsUrl).send(booking1)
    const deleteResponse = await request(server.app).delete(bookingsUrl).send({ id: 1 })

    expect(getResponse.statusCode).toBe(500)
    expect(postResponse.status).toBe(500)
    expect(putResponse.status).toBe(500)
    expect(deleteResponse.status).toBe(500)
  })

  describe('get', () => {
    it('should return bookings if successful', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).get(bookingsUrl)
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(bookings))
    })
  })

  describe('post', () => {
    it('should return 400 if the body is not valid', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).post(bookingsUrl).send({ hello: 10 })
      expect(response.statusCode).toBe(400)
    })

    it('should succeed with correct configurations', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).post(bookingsUrl).send(bookingRequest)
      expect(response.statusCode).toBe(200)
    })
  })

  describe('put', () => {
    it('should return 400 if the body is not valid', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).put(bookingsUrl).send({ hello: 10 })
      expect(response.statusCode).toBe(400)
    })

    it('should succeed with correct configurations', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).put(bookingsUrl).send(booking1)
      expect(response.statusCode).toBe(200)
    })
  })

  describe('delete', () => {
    it('should return 400 if the body is invalid', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).delete(bookingsUrl).send({ hello: 10 })
      expect(response.statusCode).toBe(400)
    })

    it('should succeed with correct configurations', async () => {
      const router = getBookingsRouter(goodBookingsHelper)
      const server = new ServerImpl(router)
      const response = await request(server.app).delete(bookingsUrl).send({ id: 5 })
      expect(response.statusCode).toBe(200)
    })
  })
})

const bookingRequest: BookingRequest = {
  startTime: new Date(),
  endTime: new Date(),
  instructorId: 1,
  aircraftId: 1,
}

const booking1: Booking = {
  id: 1,
  startTime: new Date(),
  endTime: new Date(),
  instructorId: 1,
  aircraftId: 1,
}

const booking2: Booking = {
  id: 2,
  startTime: new Date(),
  endTime: new Date(),
  instructorId: 1,
  aircraftId: 1,
}

const bookings = [booking1, booking2]

export const goodBookingsHelper: BookingsHelper = {
  post: async () => {},
  get: async (): Promise<Booking[]> => {
    return bookings
  },
  put: async () => {},
  delete: async () => {},
}

const postErrorMessage = 'test post error'
const getErrorMessage = 'test get error'
const putErrorMessage = 'test put error'
const deleteErrorMessage = 'test delete error'
const badBookingsHelper: BookingsHelper = {
  post: async () => {
    throw new Error(postErrorMessage)
  },
  get: async (): Promise<Booking[]> => {
    throw new Error(getErrorMessage)
  },
  put: async () => {
    throw new Error(putErrorMessage)
  },
  delete: async () => {
    throw new Error(deleteErrorMessage)
  },
}
