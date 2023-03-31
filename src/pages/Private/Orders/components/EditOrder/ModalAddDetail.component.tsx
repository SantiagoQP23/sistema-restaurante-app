import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormControl, FormHelperText
} from '@mui/material/'

import { ICreateOrderDetail } from '../../../../../models/orders.model';
import { SocketContext } from '../../../../../context';
import { sharingInformationService } from '../../services/sharing-information.service';
import { OrderContext } from '../../context/Order.context';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';

import { CreateOrderDetailDto } from "../../dto/create-order-detail.dto";
import { useOrders } from '../../hooks/useOrders';




interface Props {

}


export const ModalAddDetail: FC<Props> = ({ }) => {

  const { idPedido } = useParams();
  const [description, setDescription] = useState('');

  const subscription$ = sharingInformationService.getSubject();

  const { activeOrder } = useSelector(selectOrders);

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState<ICreateOrderDetail>();


  const { addDetail, updateDetail } = useContext(OrderContext);

  const { enqueueSnackbar } = useSnackbar();

  const {createOrderDetail} = useOrders();


  const crearDetalle = () => {

    if(activeOrder){
      const data: CreateOrderDetailDto = {
        orderId: activeOrder.id,
        productId: detail!.product.id,
        quantity: detail!.quantity
      }

      if (description) {
        data.description = description;
      }

      createOrderDetail(data);
    } else {

      addDetail({ ...detail!, description })
    }





    enqueueSnackbar(`${detail?.product.name} agregado`, { variant: 'success' })



    // updateDetail({...detail!, description})

    setDescription('');
    setOpen(false)
  }

  useEffect(() => {
    subscription$.subscribe((data) => {

      setDetail(data.detalle)
      setOpen(!!data.value);

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
        <DialogTitle>Detalle del pedido</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {detail?.quantity} - {detail?.product.name}
          </DialogContentText>

          <FormControl fullWidth>
            <FormHelperText>Ingrese aquí los pedidos especiales del cliente</FormHelperText>
            <TextField
              id="descripcion-pedido"
              label="Detalle del pedido"
              margin="dense"
              multiline
              rows={4}
              defaultValue={description}

              onBlur={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);

              }
              }

              autoFocus

            />


          </FormControl>





        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              setDescription('');
            }}

          >Cancelar</Button>
          <Button
            onClick={crearDetalle}
            variant="contained"
            
          >Pedir producto</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

