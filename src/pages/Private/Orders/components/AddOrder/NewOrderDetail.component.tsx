import { FC, useContext, useEffect } from 'react';


import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { Box, IconButton, Typography, TextField, Button, ButtonGroup, Grid, Card, CardContent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircleOutline, RemoveCircleOutline, SaveOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ICreateOrderDetail, IOrderDetail } from '../../../../../models';
import { useCounter } from '../../hooks';

import { Label } from '../../../../../components/ui';
import { OrderContext } from '../../context/Order.context';
import { sharingInformationService } from '../../services/sharing-information.service';

/* import { useCounter } from '../../hooks/useCounter';

import { SocketContext } from '../../context/SocketContext';
import { IDetallePedido, INuevoDetallePedido } from '../../interfaces';
import { ICallbackSocket } from '../../interfaces/sockets';
import { detalleDeleted, detalleSetActive, detalleUpdatedCantidad, pedidoDetalleActivo, pedidoDetalleCantidad, pedidoDetalleDeleted, pedidoUpdateTotal } from '../../reducers';
import { OrderContext } from '../context/Order.context';
 */
interface Props {
  detalle: ICreateOrderDetail;
}

export const NewOrderDetail: FC<Props> = ({ detalle }) => {

  const { state: counter, increment, decrement } = useCounter(detalle.quantity);

  const { updateDetail, deleteDetail } = useContext(OrderContext);

  const update = () => {
    updateDetail({ ...detalle, quantity: counter })

  }

  const deleteDet = () => {

    deleteDetail(detalle.product.name);

  }

  const editDescription = () => {

    sharingInformationService.setSubject(true, detalle);

  }


  useEffect(() => {
    update();

  }, [counter])



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



      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body1"
            color="initial"
          >

            {detalle.product.name} -
          </Typography>

          <Typography variant='subtitle1'>
            $ {detalle.product.price}
          </Typography>
        </Box>




      </Box>


      <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>

        <Typography variant="body2" color={detalle.description ? "orange" : "gray"}>

          {detalle.description ? detalle.description : "Normal"}
          <IconButton
            onClick={editDescription}
          >
            <EditOutlined />
          </IconButton>

        </Typography>

        <Box alignContent="right" >
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            {
              counter > 1
                ?
                <IconButton
                  onClick={() => {
                    decrement()

                  }}
                >
                  <RemoveCircleOutline />
                </IconButton>
                :
                <IconButton
                  aria-label="Eliminar detalle"
                  onClick={deleteDet}
                  disabled={false}
                  color='error'
                >
                  <DeleteOutline />
                </IconButton>
            }

            <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
            <IconButton
              onClick={() => {
                increment()

              }}
            >
              <AddCircleOutline />
            </IconButton>

            <Typography variant="body1" textAlign='right' fontWeight='bold'>$ {detalle.product.price * counter}</Typography>
          </Box>



        </Box>
      </Box>


      {/* 


            */}


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