import { FC, useContext } from 'react';


import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { Box, IconButton, Typography, TextField, Button, ButtonGroup, Grid, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircleOutline, RemoveCircleOutline, SaveOutlined, DeleteOutline } from '@mui/icons-material';
import { IOrderDetail } from '../../../../models';
import { useCounter } from '../hooks';

import { Label } from '../../../../components/ui';

/* import { useCounter } from '../../hooks/useCounter';

import { SocketContext } from '../../context/SocketContext';
import { IDetallePedido, INuevoDetallePedido } from '../../interfaces';
import { ICallbackSocket } from '../../interfaces/sockets';
import { detalleDeleted, detalleSetActive, detalleUpdatedCantidad, pedidoDetalleActivo, pedidoDetalleCantidad, pedidoDetalleDeleted, pedidoUpdateTotal } from '../../reducers';
 */
interface Props {
  detalle?: IOrderDetail;
}

export const OrderDetail: FC<Props> = ({ detalle }) => {

  const { state: counter, increment, decrement } = useCounter(2);

  const deleteDetail = () => {

  }


  const updateDetail = () => {

  }


  /*  const { idPedido } = useParams();
 
   const dispatch = useDispatch();
 
 
   const { socket } = useContext(SocketContext);
 
   const eliminarDetalle = () => {
 
 
     Swal.fire({
       title: 'Estas seguro?',
       text: "Esta acción no se puede revertir!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Sí, eliminar'
     }).then((result) => {
       if (result.isConfirmed) {
 
         console.log(detalle.idDetallePedido);
 
         const detalleEliminar = {
           idDetallePedido: detalle.idDetallePedido,
           idPedido
         }
 
         socket?.emit('eliminarDetalle', detalleEliminar, ({ ok }: ICallbackSocket) => {
 
           // TODO leer el ok en el callbacke
           if (ok) {
             // TODO Eliminar el detalle de pedido
             dispatch(pedidoDetalleDeleted(detalle.idDetallePedido));
 
             dispatch(pedidoUpdateTotal(Number(totalPedido) - Number(detalle.subtotal)))
 
           }
 
         }
         )
 
 
       }
     })
 
 
 
   }
 
   const actualizarDetalle = () => {
 
     const cantidad = Math.abs(counter - detalle.cantidad);
 
     const detalleActualizar = {
       idDetallePedido: detalle.idDetallePedido,
       idPedido,
       cantidad: counter,
       descripcion: ''
 
     }
 
     socket?.emit('actualizarCantidadDetalle', { detalleActualizar }, (data: ICallbackSocket) => {
 
       
       if (data.ok) {
       
         dispatch(pedidoDetalleActivo(detalle));
         
         dispatch(pedidoDetalleCantidad(counter));
 
         const subtotal = cantidad * detalle.producto.precio;
         const aumentar = counter > detalle.cantidad;
 
         const total = aumentar
           ? Number(totalPedido) + Number(subtotal)
           : Number(totalPedido) - Number(subtotal);
 
         dispatch(pedidoUpdateTotal(total));
       }
 
     })
 
   }
  */
  return (
    <>


      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>

            <Typography
              variant="h6"
              color="initial"
              fontWeight='bold'
              >

              {'Filete de pescado'}
            </Typography>

            {/* 
            */}
            {
              true
                ? (
                  <Box>
                    <Label color='success'>Pendiente</Label>
                    <IconButton
                      aria-label="Eliminar detalle"
                      onClick={deleteDetail}
                      disabled={false}
                      color='error'
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                )

                : <Label color='warning'>Entregado</Label>

            }


          </Box>
          <Typography variant="body2" color="initial">
            {'Sin arroz'}
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }} mt={2}>
              <Typography variant="body1" color="initial">
                $ {4}

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
                  disabled={!counter || counter === 3}
                  color='primary'
                  onClick={() => updateDetail()}
                >
                  <SaveOutlined />
                </IconButton>
              </Box>


            </Box>
          </Box>

          <Typography variant="h6" textAlign='right'>$ {8}</Typography>

          {/* 


            */}
        </CardContent>
      </Card>


    </>
  )
}


{/*   <ButtonGroup size='large' variant="text" >
                    <Button
                      aria-label=""
                      onClick={decrement}
                      color='primary'
                      variant='outlined'

                    >
                      <RemoveIcon color='primary' />

                    </Button> */}

{/*  <Box sx={{ width: 60, display: "inline-block" }} >
                      <TextField
                        id="cantidad"
                        value={counter}
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: 'center', border: 'none' } }}

                      />

                    </Box>
 */}
{/*     <Button
                      aria-label=""
                      onClick={increment}
                      color='primary'
                      variant='outlined'

                    >
                      <AddIcon color='primary' />
                    </Button> */}




{/* </ButtonGroup> */ }