import { IOrder } from "../../../../../../models";
import { FC, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, IconButton } from '@mui/material';
import { pedidoStart } from '../../../../../../redux/slices/orders/orders.thunks';
import { statusModalAddOrder } from "../../../services/orders.service";
import { useModal } from "../../../../../../hooks";
import { ArrowBackIos, Close, Edit, Print } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


interface Props {
 
}


export const ModalAddOrder: FC<Props> = ({  }) => {

  const {handleClose, handleOpen, isOpen, setOpen} = useModal();

  const [order, setOrder] = useState<IOrder>();

  const suscription$ = statusModalAddOrder.getSubject();

  const navigate = useNavigate();



  useEffect(() => {

    suscription$.subscribe((resp) => {

      setOpen(resp.value)

      setOrder(resp.order);

      // console.log('resp', resp)
      // if (resp) {
      //   closeModal();
      // }
    })

    return () => {
      
    }
  }, [])


  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle
        
          sx={{
            display: 'flex',
            justifyContent: 'right',
          }}
          
        >

          <IconButton
            onClick={handleClose}
          >
            <Close />
          </IconButton>

        </DialogTitle>


        <DialogContent sx={{textAlign: 'center'}}>
          <Typography variant='h3' mb={5}>Haz añadido un nuevo pedido</Typography>

          <Typography variant='h4' mb={3}>Pedido N° {order?.num}</Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Print />}
            disabled
          >
            Imprimir pedido
          </Button>




        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >

          <Button
            startIcon={<ArrowBackIos />}
            onClick={() => navigate('/orders')}
          >
            Ir a pedidos

          </Button>


          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => navigate(`/orders/list/edit/${order?.id}`)}
          >
            Editar
          </Button>

        </DialogActions>

      </Dialog>





    </>
  )
}