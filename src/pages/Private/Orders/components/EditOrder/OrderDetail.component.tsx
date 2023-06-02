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
                  updateQuantityDetail()
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

      {/* <Box
        sx={{
         p: 1,
          borderRadius: '5px',
          // border: `1px solid ${

          //   detail.qtyDelivered === detail.quantity ? theme.colors.success.main : theme.colors.warning.main
          //   }`,
          // color: `${

          //   detail.qtyDelivered === detail.quantity ? theme.colors.success.main : theme.colors.warning.main
          //   }`,


          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            cursor: 'pointer'
          }

        }}
        onClick={editDetail}
      >
 

        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between', gap: 1,  alignItems: 'center',
          }}
        >



          <Typography
            variant="h5"

          >

            {detail.product.name} - $ {detail.product.price}


       
          </Typography>

          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                size={25}
                value={detail.qtyDelivered * 100 / detail.quantity}
                sx={{ color: detail.qtyDelivered === detail.quantity ? 'success.main' : 'warning.main' }}
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
                  sx={{ color: detail.qtyDelivered === detail.quantity ? 'success.main' : 'warning.main' }}

                >{detail.qtyDelivered}</Typography>
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
              onClick={
                (e) => {
                  e.stopPropagation();
                  decrement()

                }
              
              }
            >
              <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
            <IconButton
              onClick={
                (e) => {
                  e.stopPropagation();
                  increment()

                } 
                
              }
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
                  updateQuantityDetail()
                }}
              >
                <SaveOutlined />
              </IconButton>

            }


          </Box>

          <Typography variant="body1" textAlign='right' fontWeight='bold'>$ {detail.amount}</Typography>


        </Box> */}
      {/* <LinearProgressWrapper
          value={(detail.qtyDelivered * 100) / detail.quantity}
          color="primary"
          variant="determinate"
        /> */}

      {/* </Box> */}



    </>
  )
}

