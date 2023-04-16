import { Client } from 'pg'

export const printHelloWorld = async (): Promise<void> => {
  const client = new Client({
    database: 'flight_school',
    user: 'flight_school_backend',
    password: 'b',
  })

  await client.connect()
  const res = await client.query('SELECT * FROM data.example_table', [])
  console.log(res.rows)

  await client.end()
}
