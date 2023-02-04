import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

import { Grid, Box, Button, IconButton, Typography, ButtonGroup, Card, CardContent, CardHeader, Divider } from '@mui/material';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import { DeleteOutline, DoneOutline, EditOutlined } from '@mui/icons-material';


import { IOrder } from '../../../../../models';

import { SocketContext } from '../../../../../context';

import { useAppDispatch } from '../../../../../hooks';

import { setActiveOrder } from '../../../../../redux/slices/orders';

import { Label } from '../../../../../components/ui';

//import '../../styles/estilos-pedido.css';
import { CardActions } from '@mui/material/';
import { useSnackbar } from 'notistack';
import { SocketResponse } from '../../interfaces/responses-sockets.interface';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { statusModalDeleteOrder } from '../../services/orders.service';
import { OrderStatus, OrderStatusSpanish } from '../../../../../models/orders.model';

interface Props {
  order: IOrder
}


export const Order: FC<Props> = ({ order }) => {

  const { socket } = useContext(SocketContext);

  const { client, user, table } = order;

  const orderDelivered = order.details.find(detail => detail.qtyDelivered > 0);


  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const eliminarPedido = () => {

    statusModalDeleteOrder.setSubject(true, order)

  }




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






  return (

    <>


      <Card>
        <CardHeader
          title={
            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="body1" fontWeight='bold'>Mesa {table?.name}</Typography>

              {
               <Label color='info'>{OrderStatusSpanish[`${order.status as OrderStatus}`]}</Label>
              }

            </Box>}


          subheader={
            <Typography variant="subtitle1">
              {


                formatDistance(new Date(order.createdAt), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es
                })
              }
            </Typography>
          }

        />
        <Divider />
        <CardContent>

          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Typography variant="body1"  ><b>Cliente: </b>{client
              ? `${client.person.firstName} ${client.person.lastName}`
              : '-'}
            </Typography>


          </Box>

          <Box display='flex' >

            <Typography variant="body2" ><b>Mesero: </b>{`${user.person.firstName} ${user.person.lastName}`}</Typography>



          </Box>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


          <Box>
            {/* <IconButton
              onClick={finalizarPedido}
              color='success'
            >
              <DoneOutline />
            </IconButton> */}

            <IconButton

              color='primary'
              onClick={() => { navigate(`edit/${order.id}`) }}
            > {
                order.status !== OrderStatus.PAID ? <EditOutlined /> : <AssignmentOutlinedIcon />
              }
            </IconButton>

            {
              order.status === OrderStatus.PENDING &&  !orderDelivered && (
                <IconButton
                  onClick={eliminarPedido}
                  color='error'
                >

                  <DeleteOutline />
                </IconButton>

              )

            }
          </Box>

          <Typography variant="body1" >$ {order.amount}</Typography>

        </CardActions>
      </Card>





    </>
  )


}

