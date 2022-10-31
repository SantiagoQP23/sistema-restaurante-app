import React, { FC, useContext } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline, SaveOutlined } from '@mui/icons-material';
/* import { useCounter } from '../../hooks/useCounter';
import { IDetallePedido } from '../../interfaces';

import { SocketContext } from '../../context/SocketContext'; */
import { toast } from 'react-toastify';
import { IOrderDetail } from '../../../../models';
import { useCounter } from '../hooks';


interface Props {
  handleClose: () => void;
  detalle?: IOrderDetail;
  isOpen: boolean;
}

export const DespachoDetalle: FC<Props> = ({ handleClose, detalle, isOpen}) => {

  //const { socket } = useContext(SocketContext);

  // const { idPedido, idDetallePedido } = detalle;

  const { state: counter, increment, decrement } = useCounter();
  // const { state: counter, increment, decrement } = useCounter(
  //   detalle.cantEntregada, detalle.cantidad, detalle.cantEntregada);

  const despacharDetalle = () => {


    //console.log('Despachando', counter, detalle.producto.nombre);
    
   /*  socket?.emit(
      'despacharDetalle',
      { idPedido, idDetallePedido, cantidad: counter } as { idPedido: number, idDetallePedido: number, cantidad: number },
      ({ ok }: { ok: boolean }) => {

        if (!ok) {
          toast.error("No se pudo despachar el detalle");
        }
      }) */



    handleClose();
  }

  return (
    <>
    <Dialog open={isOpen} onClose={handleClose}>

      <DialogTitle>Despachar {'Arroz marinero'}</DialogTitle>
      <DialogContent>
        <Typography>Cantidad: {5}</Typography>

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
        <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
        <Button type='submit' variant='contained' onClick={despacharDetalle} disabled={false}>Despachar</Button>
        {/* <Button type='submit' variant='contained' onClick={despacharDetalle} disabled={counter > detalle.cantidad || counter <= detalle.cantEntregada}>Despachar</Button> */}

      </DialogActions>

                </Dialog>

    </>


  )
}
