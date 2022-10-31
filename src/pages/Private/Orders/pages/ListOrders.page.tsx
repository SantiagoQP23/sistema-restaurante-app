import { useContext, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Typography, useTheme } from '@mui/material';

import { toast } from 'react-toastify';

// Componentes

import { resetActiveOrder, selectOrders } from '../../../../redux';

import { SocketContext } from '../../../../context/';
import { PageTitle, PageTitleWrapper } from '../../../../components/ui';
import { Order } from '../components';
import { FilterOrders } from '../components/FilterOrders';
import { IOrder } from '../../../../models';
import { useNavigate } from 'react-router-dom';


interface resp {
  ok: boolean
}



export const ListOrders = () => {

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, date } = useSelector(selectOrders);

  const aniadirPedido = () => {
    dispatch(resetActiveOrder())

    navigate('edit');

    //socket?.emit('nuevoDetalle', {detalle}, ({nuevoDetalle, ok}: INuevoDetalle) => {
    /* socket?.emit('nuevoPedido', {}, ({ ok }: { ok: boolean }) => {
      if (!ok) {
        toast.error("No se puedo añadir el pedido");
      }
    }); */
    //dispatch(pedidoStartAdded());
  }

  // Mostrar los orders de la date seleccionada
  return (

    <>


      <Grid container spacing={1}>
        <FilterOrders />
        <Grid item xs={12}>
          {/* <ContadorPedidos orders={orders} /> */}

        </Grid>
      </Grid>

      <Grid container display='flex' justifyContent='space-between' alignItems='center' my={1}>
        <Grid item>
          <Typography variant="h5">Pedidos: {orders.length}</Typography>

        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => aniadirPedido()}
          // disabled={date !== obtenerFechaActual()}
          >Añadir Pedido</Button>


        </Grid>

      </Grid>

      {/* ESTADOS DE PEDIDOS */}

      {
        /* Mensaje de no hay orders */
        !orders.length && (
          <Typography align='center' variant='body1'>No se encontraron orders de {/*  {formatDistance(new Date(`${date}`), new Date(), {
            addSuffix: true,
            includeSeconds: true,

          })} */}</Typography>
        )
      }

      {/* Lista de orders */}
      <Grid mt={2} container spacing={1}>
        <Grid item xs={12} md={6} lg={4}  >

          <Order />

        </Grid>
        <Grid item xs={12} md={6} lg={4}  >

          <Order />

        </Grid>
        <Grid item xs={12} md={6} lg={4}  >

          <Order />

        </Grid>
      </Grid>
      {/* <Grid  mt={2} container spacing={1}>
        {
          orders.length > 0 &&
          orders.map(p => (
            <Order key={p.id} pedido={p} />
          )
          )
        }
      </Grid> */}


    </>
  )

}
