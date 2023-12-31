/**
 * Socket event data transfer object
 * @version 1.0 26/12/2023
 */
export interface SocketEvent<T> {
  msg: string;
  data: T;
}
