import { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import { selectOrders } from '../../../../redux/slices/orders/orders.slice';
import { IOrderDetail } from "../../../../models";
import { statusModalEditOrderDetail } from "../services/orders.service";
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, DialogActions, Button, FormControl, FormHelperText, TextField, Grid } from '@mui/material';
import { useCounter, useOrders } from '../hooks';
import { RemoveCircleOutline, AddCircleOutline, CheckOutlined, Grid3x3, DeleteOutline } from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';
import { LoadingButton } from '@mui/lab';
import { DeleteOrderDetailDto } from '../dto/delete-order-detail.dto';
import { useDeleteOrderDetail } from '../hooks/useDeleteOrderDetail';



export const ModalEditOrderDetail = () => {


  const { activeOrder } = useSelector(selectOrders);

  const [detail, setDetail] = useState<IOrderDetail>();

  const [orderId, setOrderId] = useState<string>();

  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState(detail?.description || '');
  const [discount, setDiscount] = useState(detail?.discount || 0);

  const { loading: loadingDelete, deleteOrderDetail } = useDeleteOrderDetail();


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

  const { updateOrderDetail, loading } = useOrders();


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
      setCounterQtyDelivered(data.detalle.qtyDelivered);
      setCounterQty(data.detalle.quantity);
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
      ><b>{detail?.product.name}</b>
        <LoadingButton
          startIcon={<CheckOutlined />}
          variant='contained'
          onClick={deliverDetail}
          disabled={counterQtyDelivered === detail?.quantity}
          size='small'
          loading={loading}
        >{
            detail?.qtyDelivered === detail?.quantity ? 'Entregado' : 'Entregar'
          }</LoadingButton>
      </DialogTitle>
      <Divider />
      <DialogContent>


        <Grid container spacing={2}>


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

          <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
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



            </Box>



          </ Grid>
        </ Grid>





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
              >
                <DeleteOutline />
              </LoadingButton>
            )
          }

        </Box>
        <Box
          display='flex' gap={1}
        >

          <Button variant='outlined' onClick={closeModal}>Cerrar</Button>
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