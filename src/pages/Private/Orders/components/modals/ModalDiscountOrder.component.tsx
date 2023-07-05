import { AttachMoney } from "@mui/icons-material";
import { Typography, Dialog, DialogTitle, Button, DialogActions, DialogContent, DialogContentText, FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IOrder } from '../../../../../models/orders.model';
import {  statusModalDiscountOrder } from '../../services/orders.service';
import { SocketContext } from '../../../../../context/SocketContext';
import {  UpdateOrderDto } from '../../dto/update-order.dto';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from "../../../../../redux";
import { useSnackbar } from 'notistack';


export const ModalDiscountOrder = () => {

  const [open, setOpen] = useState(false);

  // const [order, setOrder] = useState<IOrder>();

  // const subscription$ = statusModalDiscountOrder.getSubject();

  // const {socket} = useContext(SocketContext);

  // const dispatch = useDispatch();

  // const [discount, setDiscount] = useState(0);

  // const {enqueueSnackbar} = useSnackbar();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   const value = Number(e.target.value);
  //   if (value < 0) {
  //     setDiscount(0);
  //     return;
      
  //   }

  //   if(value > (order!.amount * 0.05)) {
  //     return;
  //   }
  //   setDiscount(value);
  // }


  // const payOrder = () => {

  //   const data : UpdateOrderDto = {
  //     id: order!.id,
  //     discount
  //   }

  //   socket?.emit(EventsEmitSocket.updateOrder, data, ({ok, msg, order}: SocketResponseOrder) => {

  //     console.log('RESPUESTA DEL SERVIDOR', ok, msg, order);
  //     console.log('orden pagada', ok)
  //     if(ok) {
  //       console.log(order)
  //       dispatch(setActiveOrder(order!));
  //       setOpen(false);
  //     }else{
  //       enqueueSnackbar(msg, {variant: 'error'});


  //     }


  //   });

  //   setOpen(false);

  // }


  // useEffect(() => {
  //   subscription$.subscribe((data) => {
  //     setOrder(data.order);
  //     setDiscount(data.order.discount)
  //     setOpen(!!data.value);
  //   })
  // }, [])

  // if (!order) {
  //   return null;
  // }


  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
        // setDiscount(0);
      }}
    >
      {/* <DialogTitle id="alert-dialog-title" textAlign='center' variant='h4'>
        Descuento de pedido
      </DialogTitle>
      <DialogContent>
      
          <Typography variant='h6' mb={1}><b>Total: </b>$ {order?.amount}</Typography>
      

        <FormControl fullWidth>
         

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
           helperText={`El descuento debe ser menor a ${(order?.amount * 0.05).toFixed(2)}`}
          />


        </FormControl>





      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button
          onClick={() => {
            setOpen(false)
            setDiscount(0);
          }}
          

        >Cancelar</Button>
        <Button variant="contained" onClick={payOrder}>Descuento</Button>
      </DialogActions> */}
    </Dialog>

  )
}