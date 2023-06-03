import { FC, useContext } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Typography, Button, CircularProgress, LinearProgress, TableCell, TableRow, Stack } from '@mui/material';

import { AddCircleOutline, RemoveCircleOutline, SaveOutlined, DeleteOutline, EditOutlined, CloseOutlined, CurtainsSharp, CheckCircle, Pending } from '@mui/icons-material';
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
import { styled, useTheme } from '@mui/material/styles';
import { useUpdateOrderDetail } from '../../hooks/useUpdateOrderDetail';


interface Props {
  detail: IOrderDetail;
}


const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }`
);


export const OrderDetail: FC<Props> = ({ detail }) => {

  const { state: counter, increment, decrement } = useCounter(detail.quantity, 1, 500, detail.qtyDelivered);

  const dispatch = useDispatch();

  const theme = useTheme();

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const {update, loading } = useUpdateOrderDetail();

  const editDescription = () => {
    statusModalDescriptionDetail.setSubject(true, detail);
  }


  const updateQuantity = () => {

    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail.id,
      quantity: counter
    }

    update(data);

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


      <TableRow>


        <TableCell align='center'>
          <Box display='flex' justifyContent='space-between' alignItems='center' >




            <IconButton
              onClick={() => {
                decrement()

              }}
            >
              <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
            <IconButton
              onClick={() => {
                increment()

              }}
            >
              <AddCircleOutline />
            </IconButton>

            {
              counter !== detail.quantity && counter > 0 && counter >= detail.qtyDelivered &&
              <IconButton
                disabled={!counter || counter === detail.quantity || counter < detail.qtyDelivered}
                color='primary'
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity()
                }}
              >
                <SaveOutlined />
              </IconButton>

            }
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant='h5' noWrap>{detail.product.name}</Typography>
          <Typography variant='body1'>$ {detail.product.price}</Typography>

        </TableCell>

        <TableCell>

          <Typography variant="body2" whiteSpace='pre-wrap'>

            {detail.description ? detail.description : "Normal"}


          </Typography>

        </TableCell>

        <TableCell align='center'>
         
            <Stack direction='row' alignItems='center' spacing={1} >

              <Typography variant='subtitle1'>{detail.qtyDelivered}</Typography>
              <LinearProgressWrapper
                value={(detail.qtyDelivered * 100) / detail.quantity}
                color="primary"
                variant="determinate"

              />
            </Stack>
         
        </TableCell>

        <TableCell align='center'>
          <Typography variant="body1" >$ {detail.product.price * counter}</Typography>
        </TableCell>

        <TableCell
          align='center'
        >
          <IconButton
            onClick={editDetail}
          >
            <EditOutlined />
          </IconButton>
        </TableCell>

      </TableRow>

    </>
  )
}

