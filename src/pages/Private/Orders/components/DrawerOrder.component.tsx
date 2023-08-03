import { FC, useContext } from 'react';
import { IOrder, TypeOrder } from "../../../../models";
import { Box, Drawer, Stack, useTheme, Typography, IconButton, Card, CardHeader, CardContent, Grid, List, ListItem, Chip, ListItemIcon, ListItemText, Button, ToggleButton, ToggleButtonGroup, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectOrders, selectTables } from '../../../../redux';
import { CloseOutlined, Print, DeleteOutline, Edit, Add, Done, DoneRounded, CheckCircle, Pending, TimerOutlined, Notes, People, Person, Restaurant, TableRestaurant, TakeoutDining, Circle } from '@mui/icons-material';
import { Divider } from '@mui/material/';
import { ActiveOrder } from '../views';
import { OrderDetails } from './EditOrder';
import { format, formatDistance } from 'date-fns';
import { LabelStatusOrder } from '../views/OrdersList/components/LabelStatusOrder.component';
import { useNavigate } from 'react-router-dom';
import { OrderActionType, OrderContext } from '../context/Order.context';
import { es } from 'date-fns/locale';
import { LabelStatusPaid } from './LabelStatusPaid.component';
import { formatMoney } from '../../Common/helpers/format-money.helper';
import { Label } from '../../../../components/ui';
import { useUpdateTable } from '../hooks/useUpdateTable';



interface Props {
  open: boolean;
  onClose: () => void;
}


export const DrawerOrder: FC<Props> = ({
  open, onClose,
}) => {

  const theme = useTheme();

  const { dispatch } = useContext(OrderContext);

  const { orders } = useSelector(selectOrders);

  const { activeTable } = useSelector(selectTables);

  const ordersTable = orders.filter(order => order.table?.id === activeTable?.id);

  const { loading, updateTable } = useUpdateTable();




  const navigate = useNavigate();


  const handleAddOrder = () => {

    dispatch({ type: OrderActionType.SET_TABLE, payload: activeTable! });

    dispatch({ type: OrderActionType.SET_TYPE_ORDER, payload: TypeOrder.IN_PLACE });

    navigate('/orders/add/menu');



    onClose();
  }

  const handleChangeStatusTable = (value: boolean) => {

    if (activeTable) {

      updateTable({ tableId: activeTable.id, isAvailable: value });

    }



  }


  return (
    <>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          width: 'auto',
          zIndex: 10000,

          // minWidth: {xs: '100vw', sm: '100%', md: '100%', lg: '100%', xl: '100%'},

        }}


      >



        <Box
          sx={{
            display: 'flex',
            p: 1,
            [theme.breakpoints.down('sm')]:

              { width: '100vw' },
            [theme.breakpoints.up('sm')]:
              { width: 500, flexShrink: 0 },

            // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
          }}
        >

          <Stack direction='column' spacing={2} width='100%'>

            <Stack direction='row' justifyContent='space-between' alignItems='center'>

              <IconButton
                onClick={onClose}
              >
                <CloseOutlined />
              </IconButton>
              <Stack direction='row' spacing={1} >
                {/* <IconButton
                  color='inherit'
                >
                  <Print />
                </IconButton>

                <IconButton
                  color='error'
                >
                  <DeleteOutline />
                </IconButton> */}

                {
                  // !activeTable?.isAvailable && (

                  //   <Button
                  //     variant='contained'
                  //     color='primary'
                  //     size='small'
                  //     startIcon={<Add />}
                  //     onClick={handleAddOrder}
                  //   >
                  //     Añadir Pedido
                  //   </Button>

                  // )
                }

              </Stack>


            </Stack>

            <Divider />

            <Box px={2}>

              {/* <Typography variant="h4"  >

                Restaurante Doña Yoli
              </Typography> */}

              <Typography variant="h3" textAlign='center'  >
                Mesa {activeTable?.name}
                {/* Pedido N° {order.num} */}
              </Typography>

            </Box>


            <Stack spacing={2} direction='column'>
              {
                ordersTable.map((order: IOrder) => (
                  <>

                    <Card>
                      <CardHeader
                        title={`Pedido N° ${order.num}`}
                        titleTypographyProps={{ variant: 'h4', textAlign: 'center' }}

                        subheader={
                          <LabelStatusOrder status={order.status} />
                        }

                        subheaderTypographyProps={{ variant: 'h6', textAlign: 'center' }}
                        action={
                          <Stack direction='row' spacing={1}>

                            <IconButton aria-label="settings">
                              <Print />
                            </IconButton>
                            <IconButton
                              onClick={() => navigate(`/orders/list/edit/${order.id}`)}
                            >
                              <Edit
                              />
                            </IconButton>
                          </Stack>
                        }
                      />

                      <CardContent>

                        <Grid container spacing={1}>

                          <Grid container spacing={1} alignItems='center' px={1}>

                            <Grid item xs={12}>

                              <CardHeader

                                sx={{
                                  px: 1,
                                  py: 0.5
                                }}

                                avatar={<TimerOutlined />}
                                // title='Hora de entrega'
                                titleTypographyProps={{
                                  variant: 'subtitle2'

                                }}

                                subheaderTypographyProps={{
                                  variant: 'h5',
                                  color: 'inherith'
                                }}
                                subheader={`${formatDistance(new Date(order.deliveryTime), new Date(), {
                                  addSuffix: true,
                                  includeSeconds: true,
                                  locale: es
                                })}`}
                              />

                            </Grid>



                            <Grid item xs={6}>
                              <CardHeader
                                sx={{
                                  px: 1,
                                  py: 0.5
                                }}

                                avatar={order.type === TypeOrder.IN_PLACE ? <Restaurant /> : <TakeoutDining />}
                                // title='Orden'
                                titleTypographyProps={{
                                  variant: 'subtitle2'

                                }}

                                subheaderTypographyProps={{
                                  variant: 'h5',
                                  color: 'inherith'
                                }}
                                subheader={order.type === TypeOrder.IN_PLACE ? 'Para servir' : 'Para llevar'}
                              />


                            </Grid>

                            <Grid item xs={6}>
                              <CardHeader
                                sx={{
                                  px: 1,
                                  py: 0.5
                                }}


                                avatar={<People />}
                                // title='Personas'
                                titleTypographyProps={{
                                  variant: 'subtitle2'

                                }}

                                subheaderTypographyProps={{
                                  variant: 'h5',
                                  color: 'inherith'
                                }}
                                subheader={`${order.people}`}
                              />
                              <Card>


                              </Card>

                            </Grid>


                            {
                              order.type === TypeOrder.IN_PLACE && (
                                <>
                                  <Grid item xs={12}>
                                    <CardHeader
                                      sx={{
                                        px: 1,
                                        py: 0.5
                                      }}


                                      avatar={<TableRestaurant />}
                                      // title='Mesa'
                                      titleTypographyProps={{
                                        variant: 'subtitle2'

                                      }}

                                      subheaderTypographyProps={{
                                        variant: 'h5',
                                        color: 'inherith'
                                      }}
                                      subheader={`Mesa ${order.table?.name}` || 'No seleccionada'}
                                    />

                                    <Card>


                                    </Card>



                                  </Grid>


                                </>

                              )
                            }




                            <Grid item xs={12}>
                              <CardHeader
                                sx={{
                                  px: 1,
                                  py: 0.5
                                }}


                                avatar={

                                  <Person />

                                }
                                // title='Mesero'
                                titleTypographyProps={{
                                  variant: 'subtitle2'

                                }}

                                subheaderTypographyProps={{
                                  variant: 'h5',
                                  color: 'inherith'
                                }}
                                subheader={`${order.user.person.firstName} ${order.user.person.lastName}`}
                              />
                              <Card>


                              </Card>
                            </Grid>



                            {
                              order.notes
                              && (
                                <>
                                  <Grid item xs={12}>
                                    <CardHeader

                                      sx={{
                                        px: 1,
                                        py: 0.5
                                      }}


                                      avatar={<Notes />}
                                      title='Notas'
                                      titleTypographyProps={{
                                        variant: 'subtitle2'

                                      }}

                                      subheaderTypographyProps={{
                                        variant: 'h5',
                                        color: 'inherith'
                                      }}
                                      subheader={order.notes}
                                    />



                                  </Grid>
                                </>
                              )
                            }

                            <Grid item xs={4} display='flex' flexDirection='column' gap={1}>
                              {/* <Typography variant='h4'>Total</Typography> */}
                              <LabelStatusPaid isPaid={order.isPaid} />


                            </Grid>

                            <Grid
                              item
                              xs={8}
                              display='flex'
                              flexDirection='row'
                              gap={1}
                              alignItems='flex-end'
                            >

                              <Typography variant="h3">
                                {formatMoney(order.total)}

                              </Typography>


                            </Grid>

                          </Grid>





                          <Grid item xs={12}>

                            <Typography variant='h4' mt={2} textAlign='center'>
                              Productos
                            </Typography>

                            <List

                            >


                              {
                                order.details?.map((detail) => (
                                  <>
                                    <ListItem key={detail.id}>

                                      <ListItemIcon>
                                        <Typography
                                          variant='h4'
                                          color={detail.qtyDelivered === detail.quantity ? 'GrayText' : 'textPrimary'}


                                        >{detail.quantity}</Typography>
                                        {/* <Chip
                                          label={

                                          }
                                          variant={detail.qtyDelivered !== detail.quantity ? 'filled' : 'outlined'}
                                        /> */}

                                      </ListItemIcon>

                                      <ListItemText
                                        primary={detail.product.name}


                                      />

                                      {/* <Typography variant='h6'  >
                                        {detail.quantity} - {detail.product.name}
                                      </Typography> */}
                                    </ListItem>
                                    {/* <Typography variant='h6' >
                              ${detail.product.price}
                            </Typography> */}

                                  </>
                                ))
                              }

                            </List>
                          </Grid>



                        </Grid>


                      </CardContent>



                    </Card>



                  </>
                ))
              }
            </Stack>

            <Box>

              {
                ordersTable.length === 0 && (
                  <>
                    <Typography variant='h4' color='secondary' textAlign='center' mt={2}>
                      No hay pedidos
                    </Typography>

                    <Stack
                      alignItems='center'
                      mt={2}
                      spacing={5}
                    >
                      <Box>

                        <Switch
                          checked={activeTable?.isAvailable}
                          onChange={(e, value) => handleChangeStatusTable(value)}
                          inputProps={{ 'aria-label': 'controlled' }}
                          color={activeTable?.isAvailable ? 'success' : 'error'}
                        />

                        <Label
                          color={activeTable?.isAvailable ? 'success' : 'error'}
                        >
                          <Circle
                            sx={{ fontSize: 10, mr: 1 }}

                            color={activeTable?.isAvailable ? 'success' : 'error'}


                          />

                          {
                            activeTable?.isAvailable ? 'Disponible' : 'Ocupada'
                          }
                        </Label>
                      </Box>



                    </Stack>


                  </>

                )
              }

                    <Box display='flex' justifyContent='center' mt={2}>

                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<Add />}
                        onClick={handleAddOrder}
                      >
                        Añadir Pedido
                      </Button>
                    </Box>
            </Box>
          </Stack>



        </Box>


      </Drawer >

    </>
  )
}