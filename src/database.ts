import { Client } from 'pg'

export const printHelloWorld = async (): Promise<void> => {
  const client = new Client()
  await client.connect()
  const res = await client.query('SELECT $1::text as message', ['Hello world from database!'])
  console.log(res.rows[0].message)
  await client.end()
}
