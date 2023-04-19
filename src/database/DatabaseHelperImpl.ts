import { Pool } from 'pg'
import { type DatabaseHelper } from './DatabaseHelper'
import { type Booking } from '../models/Booking'
import { type OnConnectCallback } from './OnConnectCallback'
import { getDeleteBookingQuery, getInsertBookingQuery, getSelectBookingsQuery, getUpdateBookingQuery } from './queries'
import { type BookingRequest } from '../models/BookingRequest'

export class DatabaseHelperImpl implements DatabaseHelper {
  private readonly pool: Pool

  constructor() {
    this.pool = new Pool(poolConfig)
  }

  selectBookings = async (): Promise<Booking[]> => {
    try {
      return await this.connectToPoolClient(getSelectBookingsQuery())
    } catch {
      throw new Error('Could not get bookings')
    }
  }

  insertBooking = async (bookingRequest: BookingRequest): Promise<void> => {
    try {
      await this.connectToPoolClient(getInsertBookingQuery(bookingRequest))
    } catch {
      throw new Error('Could not add booking')
    }
  }

  deleteBooking = async (bookingId: number): Promise<void> => {
    try {
      await this.connectToPoolClient(getDeleteBookingQuery(bookingId))
    } catch (error) {
      throw new Error(`Could not remove booking with ID: ${bookingId}`)
    }
  }

  updateBooking = async (booking: Booking): Promise<void> => {
    try {
      await this.connectToPoolClient(getUpdateBookingQuery(booking))
    } catch {
      throw new Error(`Could not update booking with ID: ${booking.id}`)
    }
  }

  private readonly connectToPoolClient = async <T> (
    onConnect: OnConnectCallback<T>,
  ): Promise<T> => {
    const client = await this.pool.connect()
    try {
      return await onConnect(client)
    } finally {
      client.release()
    }
  }
}

const poolConfig = {
  database: 'flight_school',
  user: 'flight_school_backend',
  password: 'b',
}
