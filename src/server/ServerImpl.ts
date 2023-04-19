import express, { type NextFunction, type Request, type Response, type Router } from 'express'
import { type Server } from './Server'
import { type BookingsError } from './bookings/router'

export class ServerImpl implements Server {
  app: express.Express
  config: ServerConfig

  constructor(
    private readonly bookingsRouter: Router,
    config?: Partial<ServerConfig>,
  ) {
    this.app = express()
    this.config = {
      ...defaultServerConfig,
      ...((config !== undefined) ? config : {}),
    }

    this.setup()
  }

  setup = (): void => {
    this.app.use(express.json())

    this.app.use('/bookings', this.bookingsRouter)
    this.app.use((error: BookingsError, req: Request, res: Response, next: NextFunction) => {
      res.statusMessage = error.payload
      res.status(error.status).send()
    })
  }

  start = (): void => {
    const port = this.config.port
    this.app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  }
}

export interface ServerConfig {
  port: number
}

const defaultServerConfig: ServerConfig = {
  port: 3000,
}
