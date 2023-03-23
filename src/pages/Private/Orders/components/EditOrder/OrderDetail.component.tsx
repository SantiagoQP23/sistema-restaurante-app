import { FC, useContext } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Typography, Button, } from '@mui/material';

import { AddCircleOutline, RemoveCircleOutline, SaveOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { IOrderDetail } from '../../../../../models';
import { useCounter } from '../../hooks';

import { Label } from '../../../../../components/ui';
import { SocketContext } from '../../../../../context/SocketContext';


import { UpdateOrderDetailDto } from '../../dto/update-order-detail.dto';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';
import { setActiveOrder } from '../../../../../redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { statusModalDescriptionDetail } from '../../services/orders.service';
import { DeleteOrderDetailDto } from '../../dto/delete-order-detail.dto';


interface Props {
  detail: IOrderDetail;
}

export const OrderDetail: FC<Props> = ({ detail }) => {

  const { state: counter, increment, decrement } = useCounter(detail.quantity);

  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const editDescription = () => {
    statusModalDescriptionDetail.setSubject(true, detail);
  }


  const updateQuantityDetail = () => {

    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail.id,
      quantity: counter
    }

    socket?.emit(EventsEmitSocket.updateOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      if (ok) {
        dispatch(setActiveOrder(order!))

      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }

    });


  }

  const deleteDetail = () => {

    const data: DeleteOrderDetailDto = {
      detailId: detail.id,
      orderId: activeOrder!.id
    }

    socket?.emit(EventsEmitSocket.deleteOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      if (ok) {
        dispatch(setActiveOrder(order!))

      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }

    });

  }


  return (
    <>



      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Typography
          variant="body1"
          color="initial"

        >

          {detail.product.name} - $ {detail.product.price}
        </Typography>


        {/* 
            */}
        {
          detail.qtyDelivered !== detail.quantity
            ? (
              <Box>
                <Label color='success'>Pendiente</Label>
                {
                  detail.qtyDelivered === 0 && <IconButton
                    aria-label="Eliminar detalle"
                    onClick={deleteDetail}
                    disabled={false}
                    color='error'
                  >
                    <DeleteOutline />
                  </IconButton>

                }
              </Box>
            )

            : <Label color='warning'>Entregado</Label>

        }


      </Box>


      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} >

          <Typography variant="body2" color={detail.description ? "orange" : ""}>
            {detail.description && detail.description}
            {
             
              <Button
                onClick={editDescription}
                variant="text"
              >
                {
                  !detail.description
                    ? 'Editar'
                    : <EditOutlined />

                }
              </Button>

            }

          </Typography>


        </Box>

        <Box alignContent="right" >
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <IconButton
              onClick={decrement}
            >
              <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
            <IconButton
              onClick={increment}
            >
              <AddCircleOutline />
            </IconButton>
            <IconButton
              disabled={!counter || counter === detail.quantity || counter < detail.qtyDelivered}
              color='primary'
              onClick={() => updateQuantityDetail()}
            >
              <SaveOutlined />
            </IconButton>
          </Box>


        </Box>
      </Box>

      <Typography variant="body1" textAlign='right' fontWeight='bold'>$ {detail.amount}</Typography>



    </>
  )
}

