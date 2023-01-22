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
import { SocketContext } from '../../../context/SocketContext';
import { IOrder } from '../../../models/orders.model';
import { EventsOnSocket } from './interfaces/events-sockets.interface';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useFetchAndLoad } from '../../../hooks/useFetchAndLoad';
import { getOrdersToday } from './services/orders.service';
import { loadOrders, updateOrder } from '../../../redux';
import { useAsync } from '../../../hooks/useAsync';
import { SocketResponseOrder } from './interfaces/responses-sockets.interface';
import { ModalDeleteOrder } from './components/EditOrder/ModalDeleteOrder.component';



export const Orders = () => {

  const dispatch = useDispatch();

  const {loading, callEndpoint} = useFetchAndLoad();

  //const {enqueueSnackbar} = useSnackbar();

  const getOrdersCall = async () => await callEndpoint(getOrdersToday());

  const loadOrdersState = (data: IOrder[]) => { dispatch(loadOrders(data)); }

  useAsync(getOrdersCall, loadOrdersState, () => {}, []);


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


  const { socket } = useContext(SocketContext);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
 
     socket?.on(EventsOnSocket.newOrder, ({ order }: { order: IOrder }) => {
      
        console.log(order);
        enqueueSnackbar(`Se ha añadido un nuevo pedido`, {variant: 'success'});
 
       //dispatch(pedidoAddNew(pedido))
       
 
     });
 
     return () => {
       socket?.off(EventsOnSocket.newOrder);
     }
 
   }, [socket]);


    useEffect(() => {

    socket?.on(EventsOnSocket.updateOrder, ({ msg, order }: SocketResponseOrder) => {

     console.log('Se ha actualizado un pedido')
      dispatch(updateOrder(order!));
      enqueueSnackbar(`${msg}`, {variant: 'success'});

      

      //dispatch(pedidoAddNew(pedido))

    });


    }, [socket]);

   /*  useEffect(() => {

    socket?.on(EventsOnSocket.deleteOrder, ({ idOrder }: { idOrder: number }) => {

      enqueueSnackbar(`Se ha eliminado un pedido`, {variant: 'success'});

      //dispatch(pedidoAddNew(pedido))

    });


    }, [socket]); */

  /*  
 
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

      <ModalDeleteOrder />


    </>
  )
}


export default Orders