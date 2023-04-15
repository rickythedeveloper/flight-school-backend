import { start as startServer } from './server'
import { printHelloWorld as printHelloWorldFromDatabase } from './database'

startServer()

printHelloWorldFromDatabase()
  .catch((error) => {
    console.log('error', error)
  })
