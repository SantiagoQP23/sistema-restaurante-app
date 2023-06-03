import { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { IOrderDetail } from "../../../../models";
import { statusModalEditOrderDetail } from "../services/orders.service";
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, DialogActions, Button, FormControl, FormHelperText, TextField, Grid, Stack } from '@mui/material';
import { useCounter, useOrders } from '../hooks';
import { RemoveCircleOutline, AddCircleOutline, CheckOutlined, Grid3x3, DeleteOutline, CloseFullscreen, Close } from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';
import { LoadingButton } from '@mui/lab';
import { DeleteOrderDetailDto } from '../dto/delete-order-detail.dto';
import { useDeleteOrderDetail } from '../hooks/useDeleteOrderDetail';
import { useUpdateOrderDetail } from '../hooks/useUpdateOrderDetail';



export const ModalEditOrderDetail = () => {

  const { activeOrder } = useSelector(selectOrders);

  const [detail, setDetail] = useState<IOrderDetail>();

  const [orderId, setOrderId] = useState<string>();

  const [open, setOpen] = useState(false);


  // form
  const [description, setDescription] = useState(detail?.description || '');
  const [discount, setDiscount] = useState(detail?.discount || 0);

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
      qtyDelivered: qtyDeliveredCounter.state,
      quantity: qtyCounter.state,
      description,
      discount
    }

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

    const data: DeleteOrderDetailDto = {
      detailId: detail!.id,
      orderId: activeOrder!.id
    }

    deleteOrderDetail(data)
    closeModal()



  }



  useEffect(() => {

    subscription$.subscribe((data) => {

      setDetail(data.detalle);
      setOpen(data.value);
      setOrderId(data.orderId);
      qtyDeliveredCounter.setCounter(data.detalle.qtyDelivered);
      qtyCounter.setCounter(data.detalle.quantity);
      setDescription(data.detalle.description);
      setDiscount(data.detalle.discount);

    })

  }, []);




  return (
    <Dialog open={open} onClose={closeModal}>

      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}


      >
        <b>{detail?.product.name}</b>

        <IconButton>
          <Close onClick={closeModal} />
        </IconButton>

      </DialogTitle>



      <DialogContent>




        <Grid container spacing={1}>


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

          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
            <Typography variant='h5'>Cantidad </Typography>
            <Box display='flex' alignItems='center'>

              <IconButton
                onClick={qtyCounter.decrement}
              >
                <RemoveCircleOutline />
              </IconButton>

              <Typography sx={{ width: 40, textAlign: 'center' }}>{qtyCounter.state}</Typography>
              <IconButton
                onClick={qtyCounter.increment}
              >
                <AddCircleOutline />
              </IconButton>
            </Box>


          </ Grid>

          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography variant='h5'>Entregado </Typography>


            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Box display='flex' alignItems='center'>

                <IconButton
                  onClick={qtyDeliveredCounter.decrement}
                >
                  <RemoveCircleOutline />
                </IconButton>

                <Typography sx={{ width: 40, textAlign: 'center' }}>{qtyDeliveredCounter.state}</Typography>
                <IconButton
                  onClick={qtyDeliveredCounter.increment}
                >
                  <AddCircleOutline />
                </IconButton>

              </Box>




            </Box>




          </ Grid>


        </ Grid>

        <Stack direction='row' justifyContent='center' mt={1}>




        </Stack>


      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Box>
          {
            detail?.qtyDelivered === 0 &&
            (
              <LoadingButton
                color='error'

                onClick={deleteDetail}
                loading={loadingDelete}
                variant='text'
              >
                <DeleteOutline />
              </LoadingButton>
            )
          }

        </Box>
        <Box
          display='flex' gap={1}
        >

          {
            detail?.qtyDelivered !== detail?.quantity &&
            <LoadingButton
              startIcon={<CheckOutlined />}
              variant='outlined'
              onClick={deliverDetail}

              size='small'
              loading={loading}
            >
              Entregar
            </LoadingButton>}

          <LoadingButton
            variant='contained'
            onClick={updateDetail}
            loading={loading}
          >Actualizar</LoadingButton>
        </Box>
      </DialogActions>



    </Dialog>
  )
}