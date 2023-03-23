import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormControl, FormHelperText
} from '@mui/material/'

import { ICreateOrderDetail } from '../../../../../models/orders.model';
import { SocketContext } from '../../../../../context';
import { sharingInformationService } from '../../services/sharing-information.service';
import { OrderContext } from '../../context/Order.context';



interface Props {
  
}


export const ModalAddDetail: FC<Props> = ({ }) => {

  const { idPedido } = useParams();
  const [description, setDescription] = useState('');

  const subscription$ = sharingInformationService.getSubject();

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState<ICreateOrderDetail>();


  const {addDetail, updateDetail} = useContext(OrderContext);



  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  const crearDetalle = () => {

    updateDetail({...detail!, description})

   


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
              sx={{ width: 300 }}
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
          <Button onClick={crearDetalle}>Pedir producto</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

