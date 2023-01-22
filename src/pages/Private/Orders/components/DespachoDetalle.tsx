import React, { FC, useEffect, useState, useContext } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline, SaveOutlined } from '@mui/icons-material';
/* import { useCounter } from '../../hooks/useCounter';
import { IDetallePedido } from '../../interfaces';

import { SocketContext } from '../../context/SocketContext'; */
import { IOrderDetail } from '../../../../models';
import { useCounter } from '../hooks';
import { statusModalDispatchDetail } from '../services/orders.service';
import { SocketContext } from '../../../../context/SocketContext';
import { useSnackbar } from 'notistack';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';


interface Props {
}

export const DespachoDetalle: FC<Props> = ({ }) => {

  //const { socket } = useContext(SocketContext);

  // const { idPedido, idDetallePedido } = detalle;
  const subscription$ = statusModalDispatchDetail.getSubject();

  const [detail, setDetail] = useState<IOrderDetail>()

  const { state: counter, increment, decrement, setCounter } = useCounter(0, detail?.quantity);

  const [open, setOpen] = useState(false);

  const [orderId, setorderId] = useState('')

  const {activeOrder} = useSelector(selectOrders);



  const {socket} = useContext(SocketContext);

  const {enqueueSnackbar} = useSnackbar();

  // const { state: counter, increment, decrement } = useCounter(
  //   detalle.cantEntregada, detalle.cantidad, detalle.cantEntregada);


  


  const despacharDetalle = () => {

    console.log('Despachando detalle')

    const data: UpdateOrderDto = {
      id: orderId,
      orderDetail: {
        id: detail!.id,
        qtyDelivered: counter
      }

    }

    socket?.emit(EventsEmitSocket.updateqtyDeliveredDetail, data, ({ok, msg, order}: SocketResponseOrder) => {

      if(ok) {
        
      
      } else {
        enqueueSnackbar(msg, {variant: 'error'});
      }

     })


    //console.log('Despachando', counter, detalle.producto.nombre);

    /*  socket?.emit(
       'despacharDetalle',
       { idPedido, idDetallePedido, cantidad: counter } as { idPedido: number, idDetallePedido: number, cantidad: number },
       ({ ok }: { ok: boolean }) => {
 
         if (!ok) {
           toast.error("No se pudo despachar el detalle");
         }
       }) */



    setOpen(false)
  }


  useEffect(() => {

    subscription$.subscribe((data) => {

      console.log('Despachando detalle')
      setDetail(data.detalle);
      setOpen(data.value)
      setorderId(data.orderId)
      setCounter(data.detalle.qtyDelivered)

    })

  }, []);

  return (
    <>
      <Dialog open={open} onClose={() => {
        setOpen(false)
      }}>

        <DialogTitle>Despachar {detail?.product.name}</DialogTitle>
        <DialogContent>
          <Typography>Cantidad: {detail?.quantity}</Typography>

          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Box>

              <Typography>Cantidad entregada: </Typography>
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
              </Box>
            </Box>

          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' onClick={() => { setOpen(false) }}>Cancelar</Button>
          <Button type='submit' variant='contained' onClick={despacharDetalle} disabled={false}>Despachar</Button>
          {/* <Button type='submit' variant='contained' onClick={despacharDetalle} disabled={counter > detalle.cantidad || counter <= detalle.cantEntregada}>Despachar</Button> */}

        </DialogActions>

      </Dialog>

    </>


  )
}
