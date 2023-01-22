import { useEffect, useState, useContext } from 'react';
import { Container, Grid } from '@mui/material';
import { Outlet, useLocation, } from 'react-router-dom';
import { PageTitleWrapper, PageTitle } from '../../../components/ui';
import { DespachoDetalle } from './components';
/* import queryString from 'query-string';


import { useFecha } from '../hooks/useFecha';
import { fetchConToken } from '../helpers/fetch';

import { IDetallePedido } from '../interfaces/pedidos';
import { SocketContext } from '../context/SocketContext';
import { IActualizarCantidadDetalle, IEliminarDetalle, INuevoDetallePendiente } from '../interfaces/sockets';

import { pedidoStartLoaded } from '../actions';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectPedidos } from '../reducers/pedidosSlice';

import { PageTitle } from '../components/ui/PageTitle';
import { PageTitleWrapper } from '../components/ui/PageTitleWraper';
import { FiltrosPedidos } from '../components/Pedidos';
import { PedidoPendiente } from '../components/pedidosPendientes/';
 */

export const ActiveOrders = () => {
/* 
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pedidos } = useAppSelector(selectPedidos);

  // Obtener la fecha del url
  let { fecha = '' } = queryString.parse(location.search);

  const { setFecha, fecha: fechaPedidos } = useFecha();

  const cargarPedidos = (fecha: string) => {
    dispatch(pedidoStartLoaded(fecha));
  }

  // Establecer la fecha de los pedidos a mostrar
  useEffect(() => {
    fecha
      ? setFecha(fecha[0]!)
      : setFecha();

  }, []);

  // Cargar los pedidos cuando cambia la fecha
  useEffect(() => {

    cargarPedidos(fechaPedidos);

    // eslint-disable-next-line 
  }, [fechaPedidos]);

 */

  return (
    <>

      <PageTitleWrapper>
        <PageTitle heading='Pedidos Pendientes' />
      </PageTitleWrapper>

      <Container maxWidth='lg' >
        <Outlet />

      </Container>

      <DespachoDetalle />

      {/* Filtro por mesero */}
     {/*  <Grid container spacing={1} mb={2}>
        <FiltrosPedidos />
      </Grid>

      <Grid container spacing={1}>
        {pedidos.length > 0 && pedidos.map(p => (
          <PedidoPendiente pedido={p} key={p.idPedido} />

        )
        )}

      </Grid> */}

    </>

  )
}

export default ActiveOrders;