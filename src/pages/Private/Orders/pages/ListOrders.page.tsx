import { useContext, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Typography, useTheme } from '@mui/material';

import { toast } from 'react-toastify';

// Componentes

import { selectOrders } from '../../../../redux';

import { SocketContext } from '../../../../context/';
import { PageTitle, PageTitleWrapper } from '../../../../components/ui';
import { Order } from '../components';


interface resp{
  ok: boolean
}


export const listOrders = () => {

  const { socket } = useContext(SocketContext);

  const { orders, date } = useSelector(selectOrders);

  const aniadirPedido = () => {

    //socket?.emit('nuevoDetalle', {detalle}, ({nuevoDetalle, ok}: INuevoDetalle) => {
    socket?.emit('nuevoPedido', {} , ({ok}: {ok: boolean}) => {
      if(!ok){
        toast.error("No se puedo añadir el pedido");
      }
    });
    //dispatch(pedidoStartAdded());
  }

  // Mostrar los orders de la date seleccionada
  return (

    <>
      <PageTitleWrapper>
        <PageTitle heading='listOrders' />
      </PageTitleWrapper>

     {/*  <Grid container spacing={1}>
        <FiltrosPedidos />
        <Grid item xs={12}>
          <ContadorPedidos orders={orders} />

        </Grid>
      </Grid> */}


      {/* ESTADOS DE PEDIDOS */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => aniadirPedido()}
        // disabled={date !== obtenerFechaActual()}
      >Añadir Pedido</Button>

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
      <Grid  mt={2} container spacing={1}>
        {
          orders.length > 0 &&
          orders.map(p => (
            <Order key={p.id} pedido={p} />
          )
          )
        }
      </Grid>


    </>
  )

}
