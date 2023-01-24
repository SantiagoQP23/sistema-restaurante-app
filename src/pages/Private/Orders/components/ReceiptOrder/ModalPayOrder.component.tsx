import { AttachMoney } from "@mui/icons-material";
import { Typography, Dialog, DialogTitle, Button, DialogActions, DialogContent, DialogContentText, FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IOrder } from '../../../../../models/orders.model';
import { statusModalPayOrder } from '../../services/orders.service';
import { SocketContext } from '../../../../../context/SocketContext';
import { PayOrderDto } from '../../dto/update-order.dto';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from "../../../../../redux";
import { useSnackbar } from 'notistack';


export const ModalPayOrder = () => {

  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState<IOrder>();

  const subscription$ = statusModalPayOrder.getSubject();

  const {socket} = useContext(SocketContext);

  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0);

  const {enqueueSnackbar} = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = Number(e.target.value);
    if (value < 0) {
      setDiscount(0);
      return;
      
    }

    if(value > (order!.amount * 0.05)) {
      return;
    }
    setDiscount(value);
  }


  const payOrder = () => {

    const data : PayOrderDto = {
      id: order!.id,
      discount
    }

    socket?.emit(EventsEmitSocket.payOrder, data, ({ok, msg, order}: SocketResponseOrder) => {

      console.log('RESPUESTA DEL SERVIDOR', ok, msg, order);
      console.log('orden pagada', ok)
      if(ok) {
        console.log(order)
        dispatch(setActiveOrder(order!));
        setOpen(false);
      }else{
        enqueueSnackbar(msg, {variant: 'error'});


      }


    });

    setOpen(false);

  }


  useEffect(() => {
    subscription$.subscribe((data) => {
      setOrder(data.order);
      setOpen(!!data.value);
    })
  }, [])


  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
        setDiscount(0);
      }}
    >
      <DialogTitle>Pagar pedido</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <Typography variant='h6'>Total: {order?.amount}</Typography>
        </DialogContentText>

        <FormControl fullWidth>
          {
            order &&
            <FormHelperText>El descuento debe ser menor a {(order?.amount * 0.05).toFixed(2)}</FormHelperText> 

          }

          <TextField
            label="Descuento"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            margin='dense'
            fullWidth
            type='number'
            inputProps={{
              step: 0.25,
            }}

            onChange={handleChange}
           value={discount}
          />


        </FormControl>





      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false)
            setDiscount(0);
          }}
          

        >Cancelar</Button>
        <Button variant="contained" onClick={payOrder}>Pagar</Button>
      </DialogActions>
    </Dialog>

  )
}