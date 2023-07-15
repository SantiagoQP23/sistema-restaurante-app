import { FC, useContext } from 'react';
import { IOrder, TypeOrder } from "../../../../models";
import { Box, Drawer, Stack, useTheme, Typography, IconButton, Card, CardHeader, CardContent, Grid, List, ListItem, Chip, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTables } from '../../../../redux';
import { CloseOutlined, Print, DeleteOutline, Edit, Add, Done, DoneRounded, CheckCircle, Pending } from '@mui/icons-material';
import { Divider } from '@mui/material/';
import { ActiveOrder } from '../views';
import { OrderDetails } from './EditOrder';
import { format } from 'date-fns';
import { LabelStatusOrder } from '../views/OrdersList/components/LabelStatusOrder.component';
import { useNavigate } from 'react-router-dom';
import { OrderActionType, OrderContext } from '../context/Order.context';



interface Props {
  open: boolean;
  onClose: () => void;
}


export const DrawerOrder: FC<Props> = ({
  open, onClose,
}) => {

  const theme = useTheme();

  const {dispatch} = useContext(OrderContext);

  const { activeTable } = useSelector(selectTables);

  const navigate = useNavigate();


  const handleAddOrder = () => {

    dispatch({type: OrderActionType.SET_TABLE, payload: activeTable!});

    dispatch({type: OrderActionType.SET_TYPE_ORDER, payload: TypeOrder.IN_PLACE});

    navigate('/orders/add/menu');



    onClose();
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

                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<Add />}
                  onClick={handleAddOrder}
                >
                  Añadir Pedido
                </Button>


              </Stack>


            </Stack>

            <Divider />

            <Box px={2}>

              <Typography variant="h4"  >

                Restaurante Doña Yoli
              </Typography>

              <Typography variant="h4" textAlign='right' mt={2} >
                Mesa {activeTable?.name}
                {/* Pedido N° {order.num} */}
              </Typography>

            </Box>


            <Stack spacing={2} direction='column'>
              {
                activeTable?.orders?.map((order: IOrder) => (
                  <>

                    <Card>
                      <CardHeader
                        title={`Pedido N° ${order.num}`}
                        subheader={
                          <Typography variant='h5' color={order.isClosed ? 'secondary' : 'success.main'} textTransform='uppercase'>{order.isClosed ? 'cerrado' : 'Abierto'}</Typography>
                        }
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

                          <Grid container spacing={2} alignItems='center'>

                            <Grid item xs={4}>
                              <Typography variant='body2' color='secondary'>Hora de entrega</Typography>
                            </Grid>

                            <Grid item xs={8}>
                              <Typography variant="body1" >
                                {format(new Date(order.deliveryTime), 'dd/MM/yyy HH:mm')}
                              </Typography>

                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant='body2' color='secondary'>Personas</Typography>

                            </Grid>

                            <Grid item xs={8}>

                              <Typography variant="h6" >
                                {order.people}

                              </Typography>

                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant='body2' color='secondary'>Estado de preparación</Typography>

                            </Grid>

                            <Grid item xs={8}>

                              <LabelStatusOrder status={
                                order.status

                              } />
                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant='body2' color='secondary'>Estado de pago</Typography>

                            </Grid>

                            <Grid item xs={8}>

                              <Chip
                                label={order.isPaid ? 'Pagado' : 'Por pagar'}
                                color={order.isPaid ? 'success' : 'warning'}
                                icon={order.isPaid ? <CheckCircle /> : <Pending />}
                                clickable={false}
                                variant='outlined'
                                
                              />
                            </Grid>

                            
                          

                            <Grid item xs={4}>
                              <Typography variant='body2' color='secondary'>Total</Typography>

                            </Grid>

                            <Grid item xs={8}>

                              <Typography variant="h4">
                                $ {order.total}

                              </Typography>

                            </Grid>
                          </Grid>

                         
                         

                          <Grid item xs={12}>

                            <Typography variant='h4' color='textSecondary' mt={1}>
                              Productos
                            </Typography>

                            <List
                              sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1,
                                
                              }}
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

                          {/* <Grid item xs={4}>
                            <Typography variant='h6' color='textSecondary' >
                              Subtotal
                            </Typography>


                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant='h4' >
                              ${order.total}
                            </Typography>

                          </Grid> */}

                        </Grid>


                      </CardContent>



                    </Card>



                  </>
                ))
              }
            </Stack>



          </Stack>

        </Box>


      </Drawer>

    </>
  )
}