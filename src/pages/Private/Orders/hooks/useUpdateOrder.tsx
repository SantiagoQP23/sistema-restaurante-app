import { useContext, useEffect, useState } from "react";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";
import { SocketContext } from "../../../../context";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../redux";
import { statusModalStartOrder } from "../services/orders.service";
import { IOrder } from "../../../../models";
import { useModal } from "../../../../hooks";



export const useUpdateOrder = () => {

  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
 

  const updateOrder = (updateOrderDto: UpdateOrderDto) => {

    setLoading(true);
    socket?.emit(EventsEmitSocket.updateOrder, updateOrderDto, (res: SocketResponseOrder) => {

      setLoading(false);
      if (res.ok) {

        dispatch(setActiveOrder(res.order!));
      }

      else {
        enqueueSnackbar(res.msg, { variant: 'error' });
      }

    });

    
  }

  return {
    loading,
    updateOrder

  }
}


export const useModalUpdateOrder = () => {

  const subscription$ = statusModalStartOrder.getSubject();

  const [order, setOrder] = useState<IOrder | null>();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {

    statusModalStartOrder.setSubject({value: false, order:  null});

  }

  const handleOpen = (order: IOrder) => {

    statusModalStartOrder.setSubject({value: true, order});

  }

  useEffect(() => {

    subscription$.subscribe((data) => {

      setOrder(data.order);
      setOpen(true);

    })

  },[])

  return {
    order,
    open,
    handleClose,
    handleOpen

  }


}