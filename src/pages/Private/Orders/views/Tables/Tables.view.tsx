import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { TitlePage } from '../../../components/TitlePage.component';
import { Container, Grid, Card, Button, Chip, CardActionArea, IconButton, Stack, Box, Tooltip } from '@mui/material';
import { selectOrders, selectTables, setActiveTable } from '../../../../../redux';
import { CardContent, Typography, CardHeader } from '@mui/material/';
import { Add, Edit, HelpOutline, LockClock, Paid, Person, PersonOutline, QuestionAnswer, Settings, TimerOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { OrderContext, OrderActionType } from '../../context/Order.context';
import { IOrder, ITable, TypeOrder } from '../../../../../models';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../../hooks';
import { DrawerOrder } from '../../components/DrawerOrder.component';
import { format } from 'date-fns';
import { LabelStatusOrder } from '../OrdersList/components/LabelStatusOrder.component';
import { index } from '../../../../Status/Maintenance/index';
import { Table } from './components/Table.component';



export const Tables = () => {

  const { tables } = useSelector(selectTables);

  const navigate = useNavigate();

  const dispatchRedux = useDispatch();

  const { state, dispatch } = useContext(OrderContext);

  const [order, setOrder] = useState<IOrder | null>(null);

  const { isOpen, handleClose, handleOpen } = useModal();

  const { orders } = useSelector(selectOrders);

  const ordersTakeAway = orders.filter(order => order.type === TypeOrder.TAKE_AWAY && !order.isClosed);



  const handleClickTable = (table: ITable) => {
    
    handleOpenDrawer(table);
    // if (table.isAvailable) {
    //   // Seleccionar mesa

    //   dispatch({
    //     type: OrderActionType.SET_TYPE_ORDER,
    //     payload: TypeOrder.IN_PLACE
    //   })
      
    //   dispatch({
    //     type: OrderActionType.SET_TABLE,
    //     payload: table
    //   })
      
    //   navigate('/orders/add/menu');
      
    //   // Redirigir a la página de productos
    // } else {
    //   // TODO Mostrar la orden de la mesa
    //   handleOpenDrawer(table);

    // }

  }

  const handleOpenDrawer = (table: ITable) => {

    dispatchRedux(setActiveTable(table));

    handleOpen();

  }

  const handleCloseDrawer = () => {
    dispatchRedux(setActiveTable(null));
    handleClose();
  }



  const createOrderTakeAway = () => {
    dispatch({
      type: OrderActionType.SET_TYPE_ORDER,
      payload: TypeOrder.TAKE_AWAY
    })

    navigate('/orders/add/menu');
  }


  return (
    <>

      <DrawerOrder
        open={isOpen}
        onClose={handleCloseDrawer}
      />

      <Container maxWidth='lg' >

        <TitlePage
          title='Pedidos'

          action={
            <Stack direction='row' spacing={1}>


              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={createOrderTakeAway}
                size='small'
              >
                Crear pedido para llevar
              </Button>

            </Stack>
          }

        />


        {
          ordersTakeAway.length >= 1 && (
            <>
              <Typography variant='h4'>
                Pedidos para llevar
              </Typography>


              <Grid container direction='row' my={2} spacing={1}>


                {
                  ordersTakeAway.map(order => (
                    <Grid item xs={12} md={6} lg={4} direction='row'>
                      <Card>
                        <CardActionArea
                          onClick={() => {
                            navigate(`/orders/list/edit/${order.id}`);
                          }}
                        >

                          <CardHeader
                            title={`Pedido #${order.num}`}
                            subheader={`Mesero: ${order.user.username}`}
                            action={
                              <LabelStatusOrder status={order.status} />

                            }
                          />
                          <Stack spacing={1} px={1} mb={1}>

                            <Stack direction='row' spacing={1} alignItems='center'
                              sx={{
                                maxWidth: 'auto', // Establecer el ancho máximo aquí
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}

                            >
                              {
                                order.details.map((detail, index) => (
                                  <Typography variant='body1' key={index}>
                                    {detail.quantity} {detail.product.name}
                                    {index < order.details.length - 1 ? ',' : '.'}
                                  </Typography>
                                ))
                              }

                            </Stack>

                            <Grid container spacing={1} alignItems='center'>

                              <Grid item xs={12}>
                                <Chip
                                  label={`${format(new Date(order.deliveryTime), 'dd/MM/yyyy HH:mm')}`}
                                  size='small'
                                  icon={<TimerOutlined />}
                                />

                              </Grid>

                              <Grid item xs={6}>
                                <Chip
                                  label={`Personas: ${order.people}`}
                                  size='small'
                                  icon={<Person />}
                                />
                              </Grid>

                              <Grid item xs={6}>
                                <Chip
                                  label={`Total: $${order.total}`}
                                  size='small'
                                  icon={<Paid />}

                                />



                              </Grid>
                            </Grid>




                          </Stack>


                        </CardActionArea>


                      </Card>
                    </Grid>
                  ))
                }

              </Grid>
            </>
          )
        }



        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>


          <Typography variant='h4'>
            Mesas
          </Typography>

          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
            <Button
              variant='outlined'
              startIcon={<Edit />}
              onClick={() => navigate('/tables')}
              size='small'
            >
              Editar
            </Button>

            <Tooltip
              title='Seleccione una mesa para ver su orden o crear un nuevo pedido'
            >
              <IconButton>

                <HelpOutline />
              </IconButton>

            </Tooltip>



          </Stack>
        </Stack>



        <Grid container spacing={2}>

          {
            tables.map(table => (
              <Grid key={table.id} item xs={6} md={3} lg={2}>

                <Table
                  table={table}
                  handleClickTable={handleClickTable}
                />


              </Grid>
            ))
          }
        </Grid>


      </Container>
    </>




  )
}