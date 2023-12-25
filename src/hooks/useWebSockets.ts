import { useContext, useState } from "react";
import { SocketContext } from "../context";
import { SocketResponse } from "../models/socket-response.dto";

interface WebSocketOptions<TData> {
  onSuccess?: (resp: TData) => void;
  onError?: (resp: SocketResponse<unknown>) => void;
}

/**
 * Hook to use websockets
 * @version v1.0 24-12-2023
 */
export function useWebSocket<TData, TVariables>(
  eventMessage: string,
  options?: WebSocketOptions<SocketResponse<TData>>
) {
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);

  const mutate = async (
    data: TVariables,
    secondaryOptions?: WebSocketOptions<SocketResponse<TData>>
  ) => {
    setLoading(true);

    socket?.emit(eventMessage, data, (resp: SocketResponse<TData>) => {
      setLoading(false);

      if (resp.ok) {
        options?.onSuccess?.(resp);
        secondaryOptions?.onSuccess?.(resp);
      } else {
        options?.onError?.(resp);
        secondaryOptions?.onError?.(resp);
      }
    });
  };

  return {
    mutate,
    isLoading: loading,
  };
}
