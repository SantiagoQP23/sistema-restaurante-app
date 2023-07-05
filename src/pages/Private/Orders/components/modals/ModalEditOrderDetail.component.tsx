import { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { IOrderDetail } from "../../../../../models";
import { statusModalDeleteOrderDetail, statusModalEditOrderDetail } from "../../services/orders.service";
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, DialogActions, Button, FormControl, FormHelperText, TextField, Grid, Stack, InputLabel } from '@mui/material';
import { useCounter, useOrders } from '../../hooks';
import { RemoveCircleOutline, AddCircleOutline, CheckOutlined, Grid3x3, DeleteOutline, CloseFullscreen, Close, DoneAllOutlined, Delete } from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../../dto/update-order-detail.dto';
import { LoadingButton } from '@mui/lab';
import { DeleteOrderDetailDto } from '../../dto/delete-order-detail.dto';
import { useDeleteOrderDetail } from '../../hooks/useDeleteOrderDetail';
import { useUpdateOrderDetail } from '../../hooks/useUpdateOrderDetail';
import { CounterInput } from '../CounterInput.component';



export const ModalEditOrderDetail = () => {

  const { activeOrder } = useSelector(selectOrders);

  const [detail, setDetail] = useState<IOrderDetail>();

  const [orderId, setOrderId] = useState<string>();

  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(detail?.quantity || 1);
  const [qtyDelivered, setQtyDelivered] = useState(detail?.qtyDelivered || 1);


  // form
  const [description, setDescription] = useState(detail?.description || '');
  const [price, setPrice] = useState(detail?.price || 0);

  const { loading: loadingDelete, deleteOrderDetail } = useDeleteOrderDetail();



  const qtyCounter = useCounter(0, 1, 100, detail?.qtyDelivered)

  const qtyDeliveredCounter = useCounter(0, 1, detail?.quantity);

  // const {
  //   state: counterQty,
  //   increment: incrementQty,
  //   decrement: decrementQty,
  //   setCounter: setCounterQty
  // } = useCounter(0, 1, 100, detail?.qtyDelivered);

  const { update, loading } = useUpdateOrderDetail();


  const subscription$ = statusModalEditOrderDetail.getSubject();


  const updateDetail = () => {

    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered,
      quantity,
      description,
      price
    }

    console.log(data);

    update(data)

    closeModal()


  }

  const deliverDetail = () => {
    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered: detail?.quantity,

    }

    update(data)
    closeModal()
  }

  const closeModal = () => {
    setOpen(false)
  }

  const deleteDetail = () => {

    statusModalDeleteOrderDetail.setSubject(true, detail!, orderId!);
    closeModal();

  }

  const handleChangeQuantity = (value: number) => {

    setQuantity(value);

  }



  useEffect(() => {

    subscription$.subscribe((data) => {

      setDetail(data.detalle);
      setOpen(data.value);
      setOrderId(data.orderId);
      setQuantity(data.detalle.quantity);
      setQtyDelivered(data.detalle.qtyDelivered);
      qtyDeliveredCounter.setCounter(data.detalle.qtyDelivered);

      qtyCounter.setCounter(data.detalle.quantity);
      setDescription(data.detalle.description);
      setPrice(data.detalle.price);


    })

  }, []);




  return (
    <Dialog
      open={open}
      onClose={closeModal}

    >

      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}


      >
        <b>{detail?.product.name}</b>

        <IconButton
          onClick={closeModal}
        >
          <Close />
        </IconButton>

      </DialogTitle>



      <DialogContent>




        <Grid container spacing={1} alignItems='center'>


          <Grid item xs={12}>
            {/* <FormHelperText>Ingrese aquí los pedidos especiales del cliente</FormHelperText> */}
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

          <Grid item xs={4}>
            <InputLabel htmlFor="qty">Precio</InputLabel>
            </Grid>

          <Grid item xs={8}>

            <TextField
              id="descripcion-pedido"
            
              margin="dense"
              type='number'
              defaultValue={detail?.price}
              fullWidth
              onBlur={(e) => {
                console.log(e.target.value);
                setPrice(Number(e.target.value));

              }
              }
              size='small'

              inputProps={{
                min: 0,
               
                step: 0.25
              }}



            />


          {/* <Divider sx={{ my: 1 }} /> */}

        
            </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="qty">Cantidad</InputLabel>
          </Grid>
          <Grid item xs={8} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' >

            <CounterInput
              value={quantity}
              onChange={handleChangeQuantity}
              min={detail?.qtyDelivered}
              
              />

          </ Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="qty">Entregado</InputLabel>
          </Grid>

          <Grid item xs={8} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>

            <Box display='flex' alignItems='center' justifyContent='space-between'>

              <CounterInput
                value={qtyDelivered}
                onChange={setQtyDelivered}
                min={0}
                max={detail?.quantity}
              />



            </Box>




          </ Grid>


          <Grid item xs={12} display='flex' justifyContent='right' mt={1}>

            <LoadingButton
              variant='contained'
              onClick={updateDetail}
              loading={loading}
              color='info'
            >Actualizar</LoadingButton>

          </Grid>


        </ Grid>




      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: detail?.qtyDelivered! > 1 ? 'right' : 'space-between',
          gap: 1,
          px: 2
        }}
      >

        {
          detail?.qtyDelivered === 0 &&
          (
            <LoadingButton
              color='error'
              // startIcon={<DeleteOutline />}

              onClick={deleteDetail}
              loading={loadingDelete}
              variant='text'
            >
              <Delete />
            </LoadingButton>
          )
        }




        {
             /*  detail?.qtyDelivered !== detail?.quantity &&
              <LoadingButton
              
                onClick={deliverDetail}
                color='info'

                variant='contained'
                loading={loading}

              >
                <DoneAllOutlined />
              </LoadingButton> */}

        <Button
          color='inherit'
          variant='outlined'
          startIcon={<CheckOutlined />}
          size='small'
          onClick={deliverDetail}
        >
          Entregado
        </Button>





      </DialogActions>



    </Dialog>
  )
}