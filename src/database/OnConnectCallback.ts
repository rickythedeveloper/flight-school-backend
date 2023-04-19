import { type ClientBase } from 'pg'

export type OnConnectCallback<T> = (client: ClientBase) => Promise<T>
