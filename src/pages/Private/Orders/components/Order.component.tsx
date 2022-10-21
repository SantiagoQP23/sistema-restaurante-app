import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

import { Grid, Box, Button, IconButton, Typography, ButtonGroup, Card, CardContent } from '@mui/material';

import { DeleteOutline, DoneOutline, EditOutlined } from '@mui/icons-material';


import { IOrder } from '../../../../models';

import { SocketContext } from '../../../../context';

import { useAppDispatch } from '../../../../hooks';

import { pedidoStartSetActive } from '../../../../redux/slices/orders/';

import { Label } from '../../../../components/ui';

import '../../styles/estilos-pedido.css';

interface Props {
  pedido: IOrder
}


export const Order: FC<Props> = ({ pedido }) => {

  const { socket } = useContext(SocketContext);



  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const eliminarPedido = () => {
/* 
    Swal.fire({
      title: '¿Quieres eliminar el pedido?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
     
      if (result.isConfirmed) {

        socket?.emit('eliminarPedido', { idPedido: pedido.idPedido }, ({ok}: { ok: boolean }) => {

          console.log("Pedido eliminado", ok);

          if (!ok) {

            toast.error('No se pudo eliminar el pedido');
          }
        })
      }
    }) */
  }

  const finalizarPedido = () => {

   /*  Swal.fire({
      title: '¿Quieres finalizar el pedido?',
      showCancelButton: true,
      confirmButtonText: 'Finalizar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("finalizar el pedido: ", pedido.idPedido);
        dispatch(pedidoStartUpdatedEstado(pedido.idPedido));
      }
    }) */
  }

  const editarPedido = () => {
    dispatch(pedidoStartSetActive(pedido));
    navigate(`/edit/${pedido.id}`);

  }


  return (

    <>

      <Grid item xs={12} md={6} lg={4}  >
        <Box >

          <Card>
            <CardContent>

              <Box display='flex' justifyContent='space-between'>

                <Typography variant="body1" >Cliente: {pedido.client.lastNames}</Typography>

                {
                  pedido.isDelivered
                    ? (<Label color='success'>Activo</Label>)
                    : (<Label color='error'>Finalizado</Label>)
                }

              </Box>

              <Box display='flex' justifyContent='space-between'>

                <Typography variant="subtitle2" >{pedido.user.fullName}</Typography>

                <Typography
                  variant="subtitle1"
                >
                  {formatDistance(new Date(`${pedido.createdAt}T${pedido.createdAt}`), new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                    locale: es

                  })}
                </Typography>

              </Box>

              <Box display='flex' justifyContent='space-between'>

                <Box>
                  <IconButton
                    onClick={finalizarPedido}
                    color='success'
                  >
                    <DoneOutline />
                  </IconButton>

                  <IconButton
                    onClick={() => editarPedido()}
                    color='primary'
                  >
                    <EditOutlined />
                  </IconButton>

                  <IconButton
                    onClick={eliminarPedido}
                    color='error'
                  >
                    <DeleteOutline />
                  </IconButton>
                </Box>


               {/*  <ButtonGroup variant="outlined" >

                  <Button
                    aria-label="menu"
                    onClick={finalizarPedido}

                  >
                    <DoneIcon />
                  </Button>

                  <Button
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    onClick={eliminarPedido}
                    color='error'

                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup> */}

                <Typography variant="h6" >$ {pedido.amount}</Typography>
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Grid>



    </>
  )


}

