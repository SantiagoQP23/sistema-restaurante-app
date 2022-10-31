import React, { FC, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
   DialogTitle, FormControl, FormHelperText} from '@mui/material/'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {DetallePedido} from '.';
import { SocketContext } from '../../context/SocketContext';
import { INuevoDetallePedido } from '../../interfaces';
import { INuevoDetalle } from '../../interfaces/sockets';
import { detalleAddNew, pedidoDetalleAddNew, pedidoUpdateDetalles, pedidoUpdateTotal, selectDetalles, selectPedidos } from '../../reducers';



interface Props{
  handleClose: () => void;
  open: boolean;
  detalle: INuevoDetallePedido;
}


export const AniadirProductosModal: FC<Props> = ({ handleClose, open, detalle }) => {

  const {idPedido} = useParams();
  const [descripcion, setDescripcion] = useState('');
  const { producto, cantidad, subtotal } = detalle;

  const total = useSelector(selectPedidos).pedidoActivo?.total;

  const dispatch = useDispatch();

  const {socket} = useContext( SocketContext);

  const crearDetalle = () => {

    const detalle = { idProducto: producto.idProducto, cantidad, descripcion, idPedido };

    socket?.emit('nuevoDetalle', {detalle}, ({nuevoDetalle, ok}: INuevoDetalle) => {
       
      if(ok){

        console.log("Añadiendo un nuevo detalle al pedido");
        // TODO recibir el detalle de pedido en el callback
        const { pedido, ...detalle } = nuevoDetalle;
        
        // TODO aniadir el detalle de pedido recibido
        dispatch(pedidoDetalleAddNew(detalle));
        
        dispatch(pedidoUpdateTotal(Number(total) + Number(detalle.subtotal)));


      }


    })
    

    handleClose();
  }

  return (
    <>

      <Dialog
        open={open}
        onClose={() => {
          handleClose()
          setDescripcion('');
        }}
      >
        <DialogTitle>Detalle del pedido</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {cantidad} - {detalle.producto.nombre}
          </DialogContentText>

          <FormControl fullWidth>
            <FormHelperText>Ingrese aquí los pedidos especiales del cliente</FormHelperText>
            <TextField
              id="descripcion-pedido"
              label="Detalle del pedido"
              margin="dense"
              multiline
              rows={4}
              defaultValue={descripcion}
              sx={{ width: 300 }}
              onBlur={(e) => {
                console.log(e.target.value);
                setDescripcion(e.target.value);

              }
              }

            />


          </FormControl>





        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              setDescripcion('');
            }}

          >Cancelar</Button>
          <Button onClick={crearDetalle}>Pedir producto</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AniadirProductosModal
