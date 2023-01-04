import { FC, useContext, useState, useEffect } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Typography, useTheme, Card, CardContent, CardHeader, Accordion, AccordionSummary, AccordionDetails, ToggleButtonGroup, ToggleButton, Divider } from '@mui/material';

import { toast } from 'react-toastify';

// Componentes

import { resetActiveOrder, selectOrders } from '../../../../redux';

import { SocketContext } from '../../../../context/';
import { PageTitle, PageTitleWrapper } from '../../../../components/ui';
import { Order } from '../components';
import { FilterOrders } from '../components/FilterOrders';
import { IOrder } from '../../../../models';
import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';

import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';



interface resp {
  ok: boolean
}



export const Clock: FC = () => {

  const [date, setDate] = useState(new Date());


  function tick() {
    setDate(new Date());
  }


  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, [])


  return (
    <>
      <Card>
        <CardContent>
          {
            format(new Date(), 'HH:mm EEEE dd MMMM yyyy')
          }
        </CardContent>
      </Card>
    </>
  )
}



export const ListOrders = () => {

  const { socket } = useContext(SocketContext);

  const [view, setView] = useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, date } = useSelector(selectOrders);

  const aniadirPedido = () => {
    dispatch(resetActiveOrder())

    navigate('add');

    socket?.emit('create-order');

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

      <Card sx={{ my: 1 }}>
        <CardContent>



          <Grid container display='flex' justifyContent='space-between' alignItems='center' my={1}>
            <Grid container item spacing={1}>
              <Grid item>
                <Clock />

              </Grid>



              <Grid item>



                <Card>
                  <CardContent>

                    <Typography variant="body1">Pedidos: {orders.length}</Typography>

                  </CardContent>
                </Card>
              </Grid>

              <Grid item>

                <Button>Filtrar</Button>
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


          </Grid>
        </CardContent>
      </Card>
      {/* 
      <Card>
        <Accordion>

          <CardHeader title={
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant='h5'>Filtros de pedidos</Typography>
            </AccordionSummary>
          }
          />
          <AccordionDetails>

            <CardContent>

              <Grid container spacing={1}>
                <FilterOrders />
                <Grid item xs={12}>

                </Grid>
              </Grid>
            </CardContent>
          </AccordionDetails>
        </Accordion>
      </Card>
 */}


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


      <ToggleButtonGroup
        orientation="horizontal"
        value={view}
        exclusive
        onChange={handleChange}
        size='small'
      >
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>

      </ToggleButtonGroup>


      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={4}  >

          <Order />

        </Grid>
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
