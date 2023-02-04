import { LoadingButton } from "@mui/lab"
import { Dialog, DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { FC, useContext, useEffect, useState } from "react"
import { IOrder } from '../../../../../models/orders.model';
import { statusModalDeleteOrder } from '../../services/orders.service';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponse, SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { SocketContext } from '../../../../../context/SocketContext';


export const ModalDeleteOrder: FC = () => {


  const [order, setOrder] = useState<IOrder>();


  const [open, setOpen] = useState<boolean>(false);

  const subscription$ = statusModalDeleteOrder.getSubject();

  const {socket} = useContext(SocketContext); 

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
  }

  const submitDeleteOrder = () => {



  
      socket?.emit(EventsEmitSocket.deleteOrder, order!.id, (response: SocketResponseOrder) => {

        if (response.ok) {
        
          navigate('/orders');
        } else {
          enqueueSnackbar(response.msg, { variant: 'error' })
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

      <DialogTitle id="alert-dialog-title" >
        Eliminar pedido
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`¿Esta seguro de eliminar la orden?`}
          
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
        <LoadingButton variant='contained' color='error' onClick={submitDeleteOrder}>
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>

  )

}

