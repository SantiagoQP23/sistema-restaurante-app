import { LoadingButton } from "@mui/lab"
import { Dialog, DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Stack, Typography, Box } from '@mui/material';
import { FC, useContext, useEffect, useState } from "react"
import { IOrder, TypeOrder } from '../../../../../models/orders.model';
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

  const { socket } = useContext(SocketContext);

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

    setOpen(false);


  }

  useEffect(() => {

    subscription$.subscribe((data) => {
      setOrder(data.order);
      setOpen(!!data.value);
    })

  }, [])


  return (

    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>
        <Typography variant='h4' my={1} >¿Está seguro de eliminar la orden?</Typography>

      </DialogTitle>

      <DialogContent>


        <Stack spacing={1} direction='column' justifyContent='center'>
          <Box>

            <Typography variant="body1" color="text.primary"> {
              order?.type === TypeOrder.IN_PLACE

                ?
                `Mesa ${order?.table?.name}`
                : 'Para llevar'

            }</Typography>

          </Box>
          
          {
            order?.client &&

            (<Box>
              <Typography variant="caption" color="text.secondary">Cliente</Typography>
              <Typography variant="body1" color="text.primary">{`${order?.client?.person.firstName} ${order?.client?.person.lastName}`}</Typography>
            </Box>
            )
          }



        </Stack>


      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={closeModal} color="inherit">Cancelar</Button>
        <LoadingButton variant='contained' color='error' onClick={submitDeleteOrder}>
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>

  )

}

