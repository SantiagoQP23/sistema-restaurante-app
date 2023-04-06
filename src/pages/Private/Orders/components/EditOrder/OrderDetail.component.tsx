import { FC, useContext } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Typography, Button, CircularProgress, } from '@mui/material';

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
import { statusModalDescriptionDetail, statusModalEditOrderDetail } from '../../services/orders.service';
import { DeleteOrderDetailDto } from '../../dto/delete-order-detail.dto';


interface Props {
  detail: IOrderDetail;
}

export const OrderDetail: FC<Props> = ({ detail }) => {

  const { state: counter, increment, decrement } = useCounter(detail.quantity, 1, 500, 1);

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


  const editDetail = () => {

    statusModalEditOrderDetail.setSubject(true, detail, activeOrder!.id);
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
          variant="h5"
          color="initial"

        >

          {detail.quantity} - {detail.product.name} ... $ {detail.product.price}
        </Typography>

        <Box display='flex' alignItems='center' gap={2}>

          {
            detail.qtyDelivered === 0 &&
            <IconButton
              size='small'


              color='error'
              onClick={deleteDetail}
            >
              <DeleteOutline />
            </IconButton>
          }



          <IconButton
            size='small'
            sx={{ color: 'primary.main' }}
          >
            <EditOutlined onClick={editDetail} />
          </IconButton>




          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              size={25}
              value={detail.qtyDelivered * 100 / detail.quantity}
              sx={{ color: detail.qtyDelivered === detail.quantity ? 'primary.main' : 'success.main' }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                sx={{ color: detail.qtyDelivered === detail.quantity ? 'primary.main' : 'success.main' }}

              >{detail.qtyDelivered}</Typography>
            </Box>
          </Box>

        </Box>



      </Box>


      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} >

          <Typography
            variant="body2"
            color={detail.description ? "darkslateblue" : ""}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {detail.description}

          </Typography>


        </Box>


      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

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
          {
            counter !== detail.quantity && counter > 0 && counter >= detail.qtyDelivered &&
            <IconButton
              disabled={!counter || counter === detail.quantity || counter < detail.qtyDelivered}
              color='primary'
              onClick={() => updateQuantityDetail()}
            >
              <SaveOutlined />
            </IconButton>

          }


        </Box>

        <Typography variant="body1" textAlign='right' fontWeight='bold'>$ {detail.amount}</Typography>


      </Box>



    </>
  )
}

