import { DatabaseHelperImpl } from './database/DatabaseHelperImpl'
import { type Server } from './server/Server'
import { type ServerConfig, ServerImpl } from './server/ServerImpl'
import { BookingsHelperImpl } from './server/bookings/helper/BookingsHelperImpl'
import { getBookingsRouter } from './server/bookings/router'

export class Application {
  private readonly server: Server

  constructor(
    serverConfig?: Partial<ServerConfig>,
  ) {
    const databaseHelper = new DatabaseHelperImpl()
    const bookingsHelper = new BookingsHelperImpl(databaseHelper)
    const bookingsRouter = getBookingsRouter(bookingsHelper)

    this.server = new ServerImpl(bookingsRouter, serverConfig)
  }

  start = (): void => {
    this.server.start()
  }
}
