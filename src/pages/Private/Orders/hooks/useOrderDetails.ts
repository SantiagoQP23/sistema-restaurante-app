import { CreateOrderDetailDto } from "../dto/create-order.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { useSnackbar } from "notistack";
import { useEmitWebSocketsEvent } from "../../../../hooks";
import { IOrder } from "../../../../models";
import { DeleteOrderDetailDto, UpdateOrderDetailDto } from "../dto";

/**
 * Custom hook to create a new order detail with websockets
 * @version 1.0 28-12-2023
 */
export const useCreateOrderDetail = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<IOrder, CreateOrderDetailDto>(
    EventsEmitSocket.addOrderDetail,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "success" });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "error" });
      },
    }
  );
};

/**
 * Custom hook to update an order detail with websockets
 * @version 1.0 28-12-2023
 */
export const useUpdateOrderDetail = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<IOrder, UpdateOrderDetailDto>(
    EventsEmitSocket.updateOrderDetail,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "success" });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "error" });
      },
    }
  );
};

/**
 * Custom hook to delete an order detail with websockets
 * @version 1.0 28-12-2023
 */
export const useDeleteOrderDetail = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<IOrder, DeleteOrderDetailDto>(
    EventsEmitSocket.deleteOrderDetail,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "success" });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "error" });
      },
    }
  );
};
