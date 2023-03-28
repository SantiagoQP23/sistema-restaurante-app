import { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { IOrderDetail } from "../../../../models";
import { statusModalEditOrderDetail } from "../services/orders.service";
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, DialogActions, Button, FormControl, FormHelperText, TextField, Grid } from '@mui/material';
import { useCounter, useOrders } from '../hooks';
import { RemoveCircleOutline, AddCircleOutline, CheckOutlined, Grid3x3 } from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';



export const ModalEditOrderDetail = () => {


  const { activeOrder } = useSelector(selectOrders);

  const [detail, setDetail] = useState<IOrderDetail>();

  const [orderId, setOrderId] = useState<string>();

  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState(detail?.description || '');
  const [discount, setDiscount] = useState(detail?.discount || 0);


  const {
    state: counterQtyDelivered,
    increment: incrementQtyDelivered,
    decrement: decrementQtyDelivered,
    setCounter: setCounterQtyDelivered
  } = useCounter(0, 1, detail?.quantity);

  const {
    state: counterQty,
    increment: incrementQty,
    decrement: decrementQty,
    setCounter: setCounterQty
  } = useCounter(0, 1, 100, detail?.qtyDelivered);

  const { updateOrderDetail } = useOrders();


  const subscription$ = statusModalEditOrderDetail.getSubject();


  const updateDetail = () => {

    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered: counterQtyDelivered,
      quantity: counterQty,
      description,
      discount
    }

    updateOrderDetail(data)

    closeModal()


  }

  const deliverDetail = () => {
    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered: detail?.quantity,

    }

    updateOrderDetail(data)
    closeModal()
  }

  const closeModal = () => {
    setOpen(false)
  }



  useEffect(() => {

    subscription$.subscribe((data) => {

      setDetail(data.detalle);
      setOpen(data.value)
      setOrderId(data.orderId)
      setCounterQtyDelivered(data.detalle.qtyDelivered)
      setCounterQty(data.detalle.quantity)

    })

  }, []);




  return (
    <Dialog open={open} onClose={closeModal}>

      <DialogTitle><b>{detail?.product.name}</b></DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h5'>Cantidad: </Typography>
            <Box display='flex' alignItems='center'>

              <IconButton
                onClick={decrementQty}
              >
                <RemoveCircleOutline />
              </IconButton>

              <Typography sx={{ width: 40, textAlign: 'center' }}>{counterQty}</Typography>
              <IconButton
                onClick={incrementQty}
              >
                <AddCircleOutline />
              </IconButton>
            </Box>

          </ Grid>

          <Grid item xs={12}>
            <FormHelperText>Ingrese aquí los pedidos especiales del cliente</FormHelperText>
            <TextField
              id="descripcion-pedido"
              label="Notas"
              margin="dense"
              multiline
              rows={4}
              defaultValue={detail?.description}
              fullWidth

              onBlur={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);

              }
              }

            

            />
          </Grid>

          <Grid item xs={12}>

            <TextField
              id="descripcion-pedido"
              label="Descuento"
              margin="dense"
              type='number'
              defaultValue={detail?.discount}
              fullWidth
              onBlur={(e) => {
                console.log(e.target.value);
                setDiscount(Number(e.target.value));

              }
              }

              inputProps={{
                min: 0,
                max: detail?.product.price,
                step: 0.25
              }}



            />

          </Grid>

          <Grid item xs={12} >
            <Typography>Cantidad entregada: </Typography>


            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Box display='flex' alignItems='center'>

                <IconButton
                  onClick={decrementQtyDelivered}
                >
                  <RemoveCircleOutline />
                </IconButton>

                <Typography sx={{ width: 40, textAlign: 'center' }}>{counterQtyDelivered}</Typography>
                <IconButton
                  onClick={incrementQtyDelivered}
                >
                  <AddCircleOutline />
                </IconButton>

              </Box>


              <Button
                startIcon={<CheckOutlined />}
                variant='contained'
                onClick={deliverDetail}
                disabled={counterQtyDelivered === detail?.quantity}
              >{
                  counterQtyDelivered === detail?.quantity ? 'Entregado' : 'Entregar'
              }</Button>
            </Box>



          </ Grid>
        </ Grid>





      </DialogContent>
      <DialogActions >
        <Button variant='outlined' onClick={closeModal}>Cerrar</Button>
        <Button
          variant='contained'
          onClick={updateDetail}
        >Actualizar</Button>
      </DialogActions>



    </Dialog>
  )
}