import { FC, useContext } from 'react';
import { IOrder, TypeOrder } from "../../../../models";
import { Box, Drawer, Stack, useTheme, Typography, IconButton, Card, CardHeader, CardContent, Grid, List, ListItem, Chip, ListItemIcon, ListItemText, Button, ToggleButton, ToggleButtonGroup, Switch, CardActions, ListItemSecondaryAction } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectOrders, selectTables } from '../../../../redux';
import { CloseOutlined, Print, DeleteOutline, Edit, Add, Done, DoneRounded, CheckCircle, Pending, TimerOutlined, Notes, People, Person, Restaurant, TableRestaurant, TakeoutDining, Circle } from '@mui/icons-material';
import { Divider } from '@mui/material/';
import { ActiveOrder } from '../views';
import { LinearProgressWrapper, OrderDetails } from './EditOrder';
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


              </Stack>


            </Stack>

            <Divider />

            <Box px={2}>



            </Box>


            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>

              <Typography variant="h3" textAlign='center'  >
                Mesa {activeTable?.name}
              </Typography>

              <Button
                variant='contained'
                color='primary'
                startIcon={<Add />}
                onClick={handleAddOrder}
                size='small'
              >
                Añadir Pedido
              </Button>
            </Box>


            <Stack spacing={2} direction='column'>
              {
                ordersTable.map((order: IOrder) => (
                  <>

                    <Card>
                      <CardHeader

                        title={`Pedido N° ${order.num}`}
                        titleTypographyProps={{ variant: 'h4' }}

                        // subheader={
                        // }

                        subheaderTypographyProps={{ variant: 'h6', textAlign: 'center' }}
                        action={
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <LabelStatusOrder status={order.status} />
                            <LabelStatusPaid isPaid={order.isPaid} />



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
                              {/* <Typography variant='h5' textAlign='right'>Total</Typography> */}


                            </Grid>

                            <Grid
                              item
                              xs={8}
                              display='flex'
                              flexDirection='row'
                              gap={1}
                              alignItems='flex-end'
                              justifyContent='flex-end'
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
                                          variant='body1'

                                        >{detail.quantity}</Typography>

                                      </ListItemIcon>

                                      <ListItemText
                                        primary={detail.product.name}
                                      />

                                      <ListItemSecondaryAction
                                        sx={{
                                          width: 50
                                        }}
                                      >
                                        <LinearProgressWrapper
                                          value={(detail.qtyDelivered * 100) / detail.quantity}
                                          color="info"
                                          variant="determinate"
                                          sx={{
                                            width: '100%'
                                          }}
                                        />
                                        <Typography variant='subtitle1' fontSize={12}>{detail.qtyDelivered} / {detail.quantity}</Typography>
                                      </ListItemSecondaryAction>


                                    </ListItem>


                                  </>
                                ))
                              }

                            </List>
                          </Grid>

                        </Grid>


                      </CardContent>

                      <CardActions sx={{ justifyContent: 'right' }}>

                        <Button
                          startIcon={<Edit />}
                          variant='outlined'
                          size='small'
                          onClick={() => navigate(`/orders/list/edit/${order.id}`)}
                        >
                          Editar
                        </Button>

                      </CardActions>

                    </Card>



                  </>
                ))
              }
            </Stack>

            <Box>

              {
                ordersTable.length === 0 && (
                  <>
                    <Typography variant='h4' color='secondary' textAlign='center' my={5}>
                      Sin pedidos
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


            </Box>
          </Stack>



        </Box>


      </Drawer >

    </>
  )
}