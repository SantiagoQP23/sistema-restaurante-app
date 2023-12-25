/**
 * Response for websocket requests
 * @version v1.0 22-12-2023
 */
export interface SocketResponse<T> {
  ok: boolean;
  msg: string;
  data?: T;
}
