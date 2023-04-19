import { describe, expect, it, jest } from '@jest/globals'
import { ServerImpl } from './ServerImpl'
import { goodBookingsHelper } from './bookings/router.test'
import { getBookingsRouter } from './bookings/router'

describe('ServerImpl', () => {
  it('should start at the specified port', () => {
    const bookingsHelper = getBookingsRouter(goodBookingsHelper)
    const server = new ServerImpl(bookingsHelper, { port: 1000 })
    server.app.listen = jest.fn()
    server.setup = jest.fn()

    server.start()
    expect(server.app.listen).toBeCalledWith(1000, expect.any(Function))
  })
})
