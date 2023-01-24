import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormControl, FormHelperText
} from '@mui/material/'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ICreateOrderDetail, IOrderDetail } from '../../../../../models/orders.model';
import { SocketContext } from '../../../../../context';
import { sharingInformationService } from '../../services/sharing-information.service';
import { OrderContext } from '../../context/Order.context';
import { statusModalDescriptionDetail } from '../../services/orders.service';
import { UpdateOrderDto } from '../../dto/update-order.dto';
import { selectOrders, setActiveOrder } from '../../../../../redux/slices/orders/orders.slice';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { useSnackbar } from 'notistack';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';



interface Props {
  // handleClose: () => void;
  // open: boolean;
  // detalle: ICreateOrderDetail;
}


export const ModalUpdateDetail: FC<Props> = ({ }) => {

  const { idPedido } = useParams();
  
  const subscription$ = statusModalDescriptionDetail.getSubject();

  const [open, setOpen] = useState(false);
  
  const [detail, setDetail] = useState<IOrderDetail>();
  
  const [description, setDescription] = useState(detail?.description || '');

  const {} = useContext(OrderContext);


 //const { product, quantity } = detalle;

  // const total = useSelector(selectPedidos).pedidoActivo?.total;

  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  const {activeOrder} = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  /*
  const crearDetalle = () => {

    updateDetail({...detail!, description})

    //const detalle = { idProducto: producto.idProducto, cantidad, descripcion, idPedido };

     socket?.emit('nuevoDetalle', {detalle}, ({nuevoDetalle, ok}:) => {
       
      if(ok){

        console.log("Añadiendo un nuevo detalle al pedido");
        // TODO recibir el detalle de pedido en el callback
        const { pedido, ...detalle } = nuevoDetalle;
        
        // TODO aniadir el detalle de pedido recibido
        //dispatch(pedidoDetalleAddNew(detalle));
        
        //dispatch(pedidoUpdateTotal(Number(total) + Number(detalle.subtotal)));


      }


    }) 
    
    
    setOpen(false)
  }
  */

  const updateDetail = () => {

    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      orderDetail: {
        id: detail!.id,
        description
      }
    }

    console.log(data)

    socket?.emit(EventsEmitSocket.updateOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      if (ok) {
        dispatch(setActiveOrder(order!))

      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }


    });

    setOpen(false)


  }

  useEffect(() => {
    subscription$.subscribe((data) => {

      setDetail(data.detalle)
      setOpen(!!data.value);
      
    })
  }, [])



  return (
    <>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setDescription('');
        }}
      >
        <DialogTitle>Detalle del pedido</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {detail?.quantity} - {detail?.product.name}
          </DialogContentText>

          <FormControl fullWidth>
            <FormHelperText>Ingrese aquí los pedidos especiales del cliente</FormHelperText>
            <TextField
              id="descripcion-pedido"
              label="Detalle del pedido"
              margin="dense"
              multiline
              rows={4}
              defaultValue={detail?.description}
              sx={{ width: 300 }}
              onBlur={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);

              }
              }

              autoFocus

            />


          </FormControl>





        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              setDescription('');
            }}

          >Cancelar</Button>
          <Button onClick={updateDetail}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

