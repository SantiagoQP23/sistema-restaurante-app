import { useState, useEffect } from 'react';

import { useSelector } from "react-redux";
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { IOrderDetail } from "../../../../../models";
import { statusModalDeleteOrderDetail, statusModalEditOrderDetail } from "../../services/orders.service";
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, DialogActions, Button, FormControl, FormHelperText, TextField, Grid, Stack } from '@mui/material';
import { useCounter, useOrders } from '../../hooks';
import { RemoveCircleOutline, AddCircleOutline, CheckOutlined, Grid3x3, DeleteOutline, CloseFullscreen, Close, DoneAllOutlined } from '@mui/icons-material';
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
      qtyDelivered,
      quantity,
      description,
      discount
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
      setDiscount(data.detalle.discount);


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

          <Divider sx={{ my: 1 }} />


          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
            <Typography variant='h5'>Cantidad </Typography>
            <Box display='flex' alignItems='center'>

              <CounterInput
                value={quantity}
                onChange={handleChangeQuantity}
                min={detail?.qtyDelivered}

              />
            
            </Box>


          </ Grid>

          <Grid item xs={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography variant='h5'>Entregado </Typography>


            <Box display='flex' alignItems='center' justifyContent='space-between'>

              <CounterInput
                value={qtyDelivered}
                onChange={setQtyDelivered}
                min={0}
                max={detail?.quantity}
              />
            


            </Box>




          </ Grid>


          <Grid item xs={12} display='flex' justifyContent='center' mt={1}>
           
          </Grid>


        </ Grid>




      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          gap: 1
        }}
      >
      
          {
            detail?.qtyDelivered === 0 &&
            (
              <LoadingButton
                color='error'
                startIcon={<DeleteOutline />}

                onClick={deleteDetail}
                loading={loadingDelete}
                variant='text'
              >
                Eliminar
              </LoadingButton>
            )
          }

  

        
        {
              detail?.qtyDelivered !== detail?.quantity &&
              <LoadingButton
              
                onClick={deliverDetail}
                color='info'

                variant='contained'
                loading={loading}

              >
                <DoneAllOutlined />
              </LoadingButton>}

      

          <LoadingButton
            variant='contained'
            onClick={updateDetail}
            loading={loading}
          >Actualizar</LoadingButton>
       
      </DialogActions>



    </Dialog>
  )
}