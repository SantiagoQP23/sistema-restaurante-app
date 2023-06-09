import { LoadingButton } from "@mui/lab"
import { Dialog, DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { FC, useContext, useEffect, useState } from "react"
import { IOrder, OrderStatus } from '../../../../../models/orders.model';
import { statusModalPayOrder } from '../../services/orders.service';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponse } from '../../interfaces/responses-sockets.interface';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { SocketContext } from '../../../../../context/SocketContext';
import { UpdateOrderDto } from '../../dto/update-order.dto';


export const ModalPayOrder: FC = () => {


  const [order, setOrder] = useState<IOrder>();


  const [open, setOpen] = useState<boolean>(false);

  const subscription$ = statusModalPayOrder.getSubject();

  const {socket} = useContext(SocketContext); 

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
  }

  const submitPayOrder = () => {

    console.log('pagar orden');

    const data: UpdateOrderDto = { 
      id: order!.id,
      isPaid: true,
     };

    socket?.emit(EventsEmitSocket.updateOrder, data, (response: SocketResponse) => {

      console.log(response);

      if(response.ok) {
        
        closeModal();
        
      } else {
        enqueueSnackbar(response.msg, {variant: 'error'});
      }

    })

     
    

  }

  useEffect(() => {

    subscription$.subscribe((data) => {
      setOrder(data.order);
      setOpen(!!data.value);
    })
    
  }, [])


  return (

    <Dialog open={open} onClose={closeModal}>

      <DialogTitle id="alert-dialog-title" textAlign='center' variant='h4'>
        Cobrar pedido
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`¿Esta seguro de pagar la orden?`}
          
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          <b>Cliente: </b>{`${order?.client?.person.firstName} ${order?.client?.person.lastName}`}
          
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          <b>Mesa: </b>{`${order?.table?.name}`}
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} >Cancelar</Button>
        <LoadingButton variant='contained' color='primary' onClick={submitPayOrder}>
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>

  )

}

