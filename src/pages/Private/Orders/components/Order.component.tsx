import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

import { Grid, Box, Button, IconButton, Typography, ButtonGroup, Card, CardContent, CardHeader, Divider } from '@mui/material';

import { DeleteOutline, DoneOutline, EditOutlined } from '@mui/icons-material';


import { IOrder } from '../../../../models';

import { SocketContext } from '../../../../context';

import { useAppDispatch } from '../../../../hooks';

import { setActiveOrder } from '../../../../redux/slices/orders/';

import { Label } from '../../../../components/ui';

//import '../../styles/estilos-pedido.css';
import { CardActions } from '@mui/material/';

interface Props {
  //pedido: IOrder
}


export const Order: FC<Props> = ({ }) => {

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

  /*  const editarPedido = () => {
     dispatch(pedidoStartSetActive(pedido));
     navigate(`/edit/${pedido.id}`);
 
   }
  */

  return (

    <>


      <Card>
        <CardHeader
          title={
            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="h6" fontWeight='bold'>Mesa 1</Typography>

              {
                true
                  ? (<Label color='success'>Activo</Label>)
                  : (<Label color='error'>Finalizado</Label>)
              }

            </Box>}
          subheader={formatDistance(new Date(), new Date(), {
            addSuffix: true,
            includeSeconds: true,
            locale: es

          })} />
        <Divider />
        <CardContent>

          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Typography variant="h6"  ><b>Cliente: </b>{'Lionel Andres Messi'}</Typography>


          </Box>

          <Box display='flex' >

            <Typography variant="body2" ><b>Mesero: </b>{'Santiago Quirumbay'}</Typography>



          </Box>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


          <Box>
            <IconButton
              onClick={finalizarPedido}
              color='success'
            >
              <DoneOutline />
            </IconButton>

            <IconButton

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

          <Typography variant="h5" >$ {20.00}</Typography>

        </CardActions>
      </Card>





    </>
  )


}

