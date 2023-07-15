
import { FC } from 'react';

import { Drawer, Typography, Box, useMediaQuery, Card, TableContainer, TableHead, Table, TableBody, TableCell, TableRow, Grid, Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDrawerInvoiceStore } from '../../../store/drawerInvoiceStore';
import { format } from 'date-fns';
import { CardHeader, Divider } from '@mui/material/';
import { CloseOutlined, Delete, DeleteOutline, Print } from '@mui/icons-material';
import { PaymentMethod } from '../../../models/Invoice.model';
import { ModalDeleteInvoice } from '../../../components/modals/ModalDeleteInvoice.component';
import { Label } from '../../../../../../components/ui';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';





interface Props {
  open: boolean;
  handleClose: () => void;
}

export const DrawerInvoice: FC<Props> = ({ open, handleClose }) => {

  const theme = useTheme();

  const { activeOrder } = useSelector(selectOrders);

  const { activeInvoice, handleCloseDrawer, handleOpenModal } = useDrawerInvoiceStore(state => state);


  const handleOpenModalDelete = () => {

    handleOpenModal();

  }

  return (
    <>




      <div>

        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          sx={{
            width: 'auto',
            zIndex: 2000,

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
            {
              !activeInvoice
                ? (
                  <Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                      No hay factura seleccionada
                    </Typography>
                  </Box>
                )
                : (
                  <>

                    <Stack direction='column' spacing={2} width='100%'>

                      <Stack direction='row' justifyContent='space-between' alignItems='center'>

                        <IconButton
                          onClick={handleCloseDrawer}
                        >
                          <CloseOutlined />
                        </IconButton>


                        <Stack direction='row' spacing={1} >
                          {
                            !activeInvoice.isActive 
                              ? (
                                <>
                                  <Label
                                    color='error'

                                  >Anulada </Label>

                                </>
                              ) : !activeOrder?.isClosed && 
                              (
                                <>
                                  <IconButton
                                    color='inherit'
                                  >
                                    <Print />
                                  </IconButton>

                                  <IconButton
                                    color='error'
                                    onClick={handleOpenModalDelete}
                                  >
                                    <DeleteOutline />
                                  </IconButton>
                                </>
                              )
                          }

                        </Stack>


                      </Stack>
                      <Divider />

                      <Box px={2}>

                        <Typography variant="h4"  >

                          Restaurante Doña Yoli
                        </Typography>

                        <Typography variant="h4" textAlign='right' mt={2} >

                          Comprobante N° {activeInvoice.transactionNumber}
                        </Typography>

                      </Box>

                      <Grid container spacing={2}>

                        <Grid item xs={4}>
                          <Typography variant='subtitle2' fontSize={12} fontWeight='bold'>Fecha</Typography>
                        </Grid>

                        <Grid item xs={8}>
                          <Typography variant="body1" >
                            {format(new Date(activeInvoice.createdAt), 'dd/MM/yyy HH:mm')}
                          </Typography>

                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant='subtitle2' fontSize={12} fontWeight='bold'>Cliente</Typography>



                        </Grid>

                        <Grid item xs={8}>

                          <Typography variant="h6" >
                            {activeInvoice.client.person.lastName} {activeInvoice.client.person.firstName}


                          </Typography>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {activeInvoice.client.address}
                          </Typography>

                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {activeInvoice.client.person.numPhone}
                          </Typography>



                        </Grid>
                        <Grid item xs={4}>

                          <Typography variant='subtitle2' fontSize={12} fontWeight='bold'>Cobrado por </Typography>

                        </Grid>

                        <Grid item xs={8}>
                          <Typography>
                            {activeInvoice.user.person.lastName} {activeInvoice.user.person.firstName}

                          </Typography>




                        </Grid>
                        <Grid item xs={4}>

                          <Typography variant='subtitle2' fontSize={12} fontWeight='bold'>Método de pago</Typography>

                        </Grid>

                        <Grid item xs={8}>

                          <Typography>
                            {
                              activeInvoice.paymentMethod === PaymentMethod.CASH
                                ? 'Efectivo'
                                : 'Transferencia'
                            }

                          </Typography>
                        </Grid>
                        <Grid item xs={4}>

                          <Typography variant='subtitle2' fontSize={12} fontWeight='bold'>Cantidad pagada</Typography>

                        </Grid>

                        <Grid item xs={8}>

                          <Typography>
                            ${
                              activeInvoice.amountPaid
                            }

                          </Typography>
                        </Grid>
                        <Grid item xs={4}>

                          <Typography variant='subtitle2' fontSize={12} fontWeight='bold'>Cambio</Typography>

                        </Grid>

                        <Grid item xs={8}>

                          <Typography>
                            ${
                              activeInvoice.difference
                            }

                          </Typography>
                        </Grid>






                      </Grid>


                      <Card>
                        <CardHeader title="Productos" />
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableCell>
                                Cantidad
                              </TableCell>
                              <TableCell>
                                Producto
                              </TableCell>
                              <TableCell>
                                Precio
                              </TableCell>
                              <TableCell>
                                Total
                              </TableCell>


                            </TableHead>

                            <TableBody>
                              {
                                activeInvoice.details.map(detail => (
                                  <TableRow>

                                    <TableCell align='center'>
                                      {detail.quantity}
                                    </TableCell>
                                    <TableCell>
                                      {detail.orderDetail.product.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                      $ {detail.orderDetail.price}
                                    </TableCell>
                                    <TableCell align='right'>
                                      $ {detail.amount}
                                    </TableCell>
                                  </TableRow>
                                ))
                              }

                              <TableRow>
                                <TableCell colSpan={3} align='right'
                                  sx={{
                                    border: 'none'
                                  }}

                                >
                                  <Typography variant='subtitle1' color='textSecondary'>Subtotal</Typography>
                                </TableCell>
                                <TableCell
                                  align='right'
                                  sx={{
                                    border: 'none'
                                  }}

                                >
                                  <Typography variant='subtitle1' >${activeInvoice.amount}</Typography>
                                </TableCell>

                              </TableRow>

                              <TableRow>
                                <TableCell colSpan={3} align='right'
                                  sx={{
                                    border: 'none'
                                  }}

                                  size='small'
                                >
                                  <Typography variant='subtitle1' color='textSecondary'>Descuento</Typography>
                                </TableCell>
                                <TableCell
                                  align='right'

                                  sx={{
                                    border: 'none'
                                  }}

                                  size='small'
                                >
                                  <Typography variant='h5' color='error' > - ${activeInvoice.discount}</Typography>
                                </TableCell>


                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} align='right'>
                                  <Typography variant='h6' color='textSecondary'>Total</Typography>
                                </TableCell>
                                <TableCell
                                  align='right'
                                >
                                  <Typography variant='h4' >${activeInvoice.total}</Typography>
                                </TableCell>

                              </TableRow>


                            </TableBody>


                          </Table>


                        </TableContainer>

                      </Card>
                    </Stack>

                  </>
                )




            }
          </Box>

        </Drawer>
      </div>
    </>
  )
}