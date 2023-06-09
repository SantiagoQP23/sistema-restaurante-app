import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormControl, FormHelperText, Typography, Box, IconButton, Stack, Divider
} from '@mui/material/'

import { ICreateOrderDetail } from '../../../../../models/orders.model';
import { SocketContext } from '../../../../../context';
import { sharingInformationService } from '../../services/sharing-information.service';
import { OrderActionType, OrderContext } from '../../context/Order.context';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';

import { CreateOrderDetailDto } from "../../dto/create-order-detail.dto";
import { useOrders } from '../../hooks/useOrders';
import { LoadingButton } from '@mui/lab';
import { useCreateOrder } from '../../hooks/useCreateOrder';
import { useCreateOrderDetail } from '../../hooks/useCreateOrderDetail';
import { useCounter } from '../../hooks';
import { RemoveCircleOutline, AddCircleOutline, Remove, Add } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { InputBase } from '@mui/material';
import { CounterInput } from '../CounterInput.component';




interface Props {

}


export const ModalAddDetail: FC<Props> = ({ }) => {

  const { idPedido } = useParams();
  const [description, setDescription] = useState('');

  const subscription$ = sharingInformationService.getSubject();

  const [detail, setDetail] = useState<ICreateOrderDetail>();

  const [quantity, setQuantity] = useState(detail?.quantity || 1);


  const { activeOrder } = useSelector(selectOrders);

  const [open, setOpen] = useState(false);



  const { dispatch } = useContext(OrderContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { createOrderDetail, loading } = useCreateOrderDetail();


  const handleQuantityChange = (value: number) => {


    setQuantity(value);

  }


  const crearDetalle = () => {

    if (activeOrder) {
      const data: CreateOrderDetailDto = {
        orderId: activeOrder.id,
        productId: detail!.product.id,
        quantity
      }

      if (description) {
        data.description = description;
      }

      console.log({ data })

      createOrderDetail(data);

    } else {

      dispatch({ type: OrderActionType.ADD_DETAIL, payload: { ...detail!, quantity, description } })
    }

    enqueueSnackbar(`${detail?.product.name} agregado`, {
      variant: 'success',


    })


    // updateDetail({...detail!, description})

    setDescription('');
    setOpen(false)
  }

  useEffect(() => {
    subscription$.subscribe((data) => {

      setDetail(data.detalle)
      setOpen(!!data.value);
      setDescription(data.detalle?.description || '');
      // setCounter(data.detalle?.quantity || 1);

    })
  }, [])



  return (
    <>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setDescription('');
        }}

      >
        {/* <DialogTitle>Añadir Producto</DialogTitle> */}

        <DialogContent>

          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1" >{detail?.product.category.name}</Typography>
              <Typography variant="h4" >{detail?.product.name}</Typography>

            </Box>
            <Typography variant="h4"  >${detail?.product.price}</Typography>

            {
              detail?.product.description && (
                <Box>

                  {/* <Typography variant="subtitle1" >Descripción</Typography> */}
                  <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }} >{detail?.product.description}</Typography>
                </Box>
              )
            }

            <Divider />

            <FormControl fullWidth>
              <TextField
                id="descripcion-pedido"
                label="Notas"
                margin="dense"
                multiline
                rows={4}
                defaultValue={description}

                onBlur={(e) => {
                  console.log(e.target.value);
                  setDescription(e.target.value);

                }
                }


              />


            </FormControl>

            <Stack
              direction='row' alignItems='center' justifyContent='space-between'
              my={2}
            >
              <Typography variant="h5" >Cantidad</Typography>

              <CounterInput
                value={detail?.quantity || 1}
                onChange={handleQuantityChange}


              />
              {/* <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography> */}



            </Stack>

          </Stack>













        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={() => {
              setOpen(false)
              setDescription('');
            }}

          >Cancelar</Button>
          <LoadingButton
            onClick={crearDetalle}
            variant="contained"
            loading={loading}
            startIcon={<ShoppingCartIcon />}

          >Añadir</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

