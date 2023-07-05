import { LoadingButton } from "@mui/lab"
import { Dialog, DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Typography, Stack, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { FC, useContext, useEffect, useState } from "react"
import { IOrder, OrderStatus, TypeOrder } from '../../../../../models/orders.model';
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

  const { socket } = useContext(SocketContext);

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

      if (response.ok) {

        closeModal();

      } else {
        enqueueSnackbar(response.msg, { variant: 'error' });
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

      <DialogTitle id="alert-dialog-title" textAlign='center' variant='h3'>
        Pago de pedido
      </DialogTitle>
      <Divider />
      <DialogContent>


        <Stack spacing={1}>

          {/* {
            order?.client && (
              <Typography variant='h6' textAlign='left' >

                <b>Cliente: </b>{`${order?.client?.person.firstName} ${order?.client?.person.lastName}`}

              </Typography>

            )
          } */}

          <Typography variant='h6' textAlign='left' >


            <b>Mesa: </b>{`${order?.type === TypeOrder.IN_PLACE

              ?
              `Mesa ${order?.table?.name || ''}`
              : 'Para llevar'
              }`}

          </Typography>


          <Typography variant='h3' textAlign='center' >

            {`Total de la orden: $${order?.total}`}

          </Typography>
          <Divider />
          <Typography variant='h4' >Forma de pago</Typography>
          <RadioGroup name="use-radio-group" defaultValue="first" >
            <FormControlLabel value="first" label="Efectivo" control={<Radio />} />
            <FormControlLabel value="second" label="Transferencia" control={<Radio />} />
          </RadioGroup>

          <TextField
            label='Cantidad'
            variant='outlined'
            type='number'
            fullWidth

          />
          <Divider />

          <TextField
            label='Nota de venta'
            variant='outlined'
            type='number'
            fullWidth

          />

          <Button>
            Imprimir nota de venta
          </Button>



        </Stack>

      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={closeModal} >Cancelar</Button>
        <LoadingButton variant='contained' color='primary' onClick={submitPayOrder}>
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>

  )

}

