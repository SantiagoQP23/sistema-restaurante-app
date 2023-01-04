import { FC, useContext, useEffect, useState } from 'react'
import { formatDistance } from 'date-fns';

import { Card, CardHeader, Grid, CardContent, Box, Divider, Typography } from '@mui/material';
import { IOrder, IOrderDetail } from '../../../../models';
import { PendingDetail } from './PendingDetail.component';
import { Label } from '../../../../components/ui';
import { useModal } from '../../../../hooks';
import { DespachoDetalle } from './DespachoDetalle';
/* 
import { IPedido } from '../../interfaces'
import { IDetallePedido } from '../../interfaces/pedidos';

import { useModal } from '../../hooks';

import { Modal } from '../EditarMenu';
import { DetallePendiente, DespachoDetalle } from '.';
import { SocketContext } from '../../context/SocketContext';
import { IActualizarCantidadDetalle, IEliminarDetalle } from '../../interfaces/sockets';
import { pedidoSetActive } from '../../reducers';
import { ActiveOrder } from './PendingDetail.component';

 */

interface Props {
  pedido?: IOrder;
}

export const ActiveOrder: FC<Props> = ({ pedido }) => {


  //const { socket } = useContext(SocketContext);
  /* 
    const [detalleActivo, setDetalleActivo] = useState<null | IDetallePedido>(null);
  
    const [detalles, setDetalles] = useState<IDetallePedido[]>(pedido.detalles);
  
    const { isOpen, handleClose, handleClickOpen } = useModal();
   */
    const { isOpen, handleOpen, handleClose } = useModal();


  const despacharDetalle = (detalle: IOrderDetail) => {
    /*   setDetalleActivo(detalle);
      handleClickOpen();
   */




  }

  /*   useEffect(() => {
  
      socket?.on('nuevoDetalle', ({ nuevoDetalle }: { nuevoDetalle: IDetallePedido }) => {
  
        if (pedido.idPedido === nuevoDetalle.idPedido) {
          setDetalles(detalles => [...detalles, nuevoDetalle]);
  
        }
  
      });
  
      return () => {
        socket?.off('nuevoDetalle');
      }
  
    }, [socket]);
  
  
    useEffect(() => {
  
      socket?.on('eliminarDetalle', ({ idDetallePedido, idPedido }: { idDetallePedido: number, idPedido: number }) => {
  
        console.log("Eliminando un detalle pedido");
        if (pedido.idPedido === idPedido) {
          setDetalles(detalles => detalles.filter(detalle => detalle.idDetallePedido !== idDetallePedido));
  
        }
  
      });
  
      return () => {
        socket?.off('eliminarDetalle');
      }
  
    }, [socket]);
  
  
    useEffect(() => {
  
      socket?.on('actualizarCantidadDetalle', ({ detalle }: { detalle: IDetallePedido }) => {
  
        console.log("Actualizando");
  
        const { idDetallePedido } = detalle;
        if (pedido.idPedido === detalle.idPedido) {
  
          setDetalles(detalles => detalles.map(det => {
            if (det.idDetallePedido === idDetallePedido) {
              return detalle
            }
            return det
          }));
  
        }
  
        return () => {
          socket?.off('actualizarCantidadDetalle');
        }
  
      });
  
    }, [socket]);
  
    useEffect(() => {
  
      socket?.on('despacharDetalle', ({ detalle }: { detalle: IDetallePedido }) => {
  
        console.log("Actualizando");
  
        const { idDetallePedido } = detalle;
        if (pedido.idPedido === detalle.idPedido) {
  
          setDetalles(detalles => detalles.map(det => {
            if (det.idDetallePedido === idDetallePedido) {
              return detalle
            }
            return det
          }));
  
        }
  
        return () => {
          socket?.off('despacharDetalle');
        }
  
      });
  
    }, [socket]);
  
   */

  return (
    <>


      <Card>
        <CardHeader
          title={
            <Box display='flex' justifyContent='space-between' alignItems='center'>

              <Typography variant="body1" fontWeight='bold'>Mesa 1</Typography>


              <Label color='success'>
                {formatDistance(new Date(), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                 

                })}
                </Label>



            </Box>}
          subheader={'Santiago Quirumbay'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} >
              <PendingDetail despachar={handleOpen}/>
            </Grid>
            <Grid item xs={12} >
              <PendingDetail despachar={handleOpen}/>
            </Grid>
            <Grid item xs={12} >
              <PendingDetail despachar={handleOpen}/>
            </Grid>

          </Grid>

          {/* {detalles.length > 0 && detalles!.map(det => (

              <DetallePendiente detalle={det} key={det.idDetallePedido} despachar={despacharDetalle} />

            ))} */}
        </CardContent>

       

      </Card>

      <DespachoDetalle isOpen={isOpen} handleClose={handleClose} />
      {/* 
        <DespachoDetalle detalle={detalleActivo!} handleClose={handleClose} />
      */}
      {/*  <Modal open={isOpen} closeModal={handleClose}>
        <DespachoDetalle handleClose={handleClose} detalle={detalleActivo!} />
      </Modal> */}
    </>

  )
}
