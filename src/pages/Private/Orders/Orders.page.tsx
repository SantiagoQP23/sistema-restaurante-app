import { useContext, useEffect } from 'react'

import { Outlet, Route, useLocation } from "react-router-dom";

import { Container } from '@mui/material';

import { toast } from 'react-toastify';
/* 



import { useFecha } from '../hooks/useFecha';
import { useAppDispatch } from '../hooks/useRedux';

import { SocketContext } from '../context/SocketContext';
import { IPedido } from '../interfaces';
import { pedidoAddNew, pedidoDeleted } from '../reducers';
 */
import { RoutesWithNotFound } from '../../../helpers';
import { PageTitleWrapper, PageTitle } from '../../../components/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderProvider } from './context/Order.context';



export const Orders = () => {

  /*  const dispatch = useAppDispatch();
   const location = useLocation();
 
   const { setFecha, fecha: fechaPedidos } = useFecha();
 
   const cargarPedidos = (fecha: string) => {
     dispatch(pedidoStartLoaded(fecha));
   }
 
 
  */
  /*   // Cargar los pedidos cuando cambia la fecha
    useEffect(() => {
  
      //cargarPedidos(fechaPedidos);
  
      // eslint-disable-next-line 
  
    }, [fechaPedidos]); */


  //const { socket } = useContext(SocketContext);

  /*  useEffect(() => {
 
     socket?.on('nuevoPedido', ({ pedido }: { pedido: IPedido }) => {
 
 
       dispatch(pedidoAddNew(pedido))
       toast.success("Se ha añadido un nuevo pedido");
 
     });
 
     return () => {
       socket?.off('nuevoPedido');
     }
 
   }, [socket]);
 
   useEffect(() => {
 
     socket?.on('eliminarPedido', ({ idPedido }: { idPedido: number }) => {
 
       dispatch(pedidoDeleted(idPedido));
       toast.success("Se ha eliminado un  pedido");
 
     });
 
     return () => {
       socket?.off('eliminarPedido');
     }
 
   }, [socket]);
  */
  // Establecer la fecha de los pedidos a mostrar
  useEffect(() => {
    /*  fecha
       ? setFecha(fecha[0]!)
       : setFecha(); */

    //dispatch(pedidoStartLoaded(date));

  }, []);

  return (
    <>
      <PageTitleWrapper>
        <PageTitle heading='Pedidos ' />
      </PageTitleWrapper>


      <Container maxWidth="lg">
        <OrderProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Outlet />

            {/*  <RoutesWithNotFound >
          <Route index element={<Pedidos />} />
          <Route path="editar/:idPedido" element={<EditarPedido />} />
          <Route path="editar/:idPedido/productos" element={<AniadirProductos />} />
          <Route path='pendientes' element={<PedidosPendientes />} />
        </RoutesWithNotFound> */}

          </LocalizationProvider>
        </OrderProvider>

      </Container>
      {/* <Footer /> */}

    </>
  )
}


export default Orders