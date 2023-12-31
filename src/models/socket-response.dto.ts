/**
 * Response for websocket requests
 * @version v1.0 22-12-2023
 */
export interface SocketResponse {
  ok: boolean;
  msg: string;
}

/**
 * Response for websocket requests with data
 * @version v1.0 22-12-2023
 */
export interface SocketResponseData<T> extends SocketResponse {
  data?: T;
}
