import { FC, useContext } from 'react';
import { Box, Typography, Grid, Divider, Button, Card, CardHeader, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
import { OrderDetail } from "./OrderDetail.component"
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../../context/Order.context';
import { IOrder, IOrderDetail } from '../../../../../../models';
import { ModalUpdateDetail } from '../../../components/EditOrder/ModalUpdateDescriptionDetail.component';
import { AddShoppingCartOutlined } from '@mui/icons-material';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';




interface Props {
  order: IOrder
}


export const OrderDetails: FC<Props> = ({ order }) => {


  const navigate = useNavigate();

  const { details } = order;


  return (

    <>

      <Card>

        <CardHeader

          title='Productos'
          action={
            <Button

              color="primary"
              onClick={() => navigate('products')}
              size='small'
              variant='contained'
              startIcon={
                <AddShoppingCartOutlined />
              }

            >
              Agregar
            </Button>

          }
        />


        <Divider />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
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
                  Estado
                </TableCell>
                <TableCell>
                  Subtotal
                </TableCell>
                <TableCell align='center'>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                details.length === 0
                  ? (<TableRow>
                    <TableCell colSpan={5}>

                      <Typography variant='body1' align='center' my={5}>No se han añadido productos</Typography>
                    </TableCell>
                  </TableRow>)
                  :


                  details.map((detail) => {

                    if (detail.isActive)
                      return (

                        <OrderDetail key={detail.id} detail={detail} />



                      )
                  })


              }




              <TableRow
                sx={{
                  border: 'none'
                }}

              >
                <TableCell

                  colSpan={4} align='right'
                  sx={{
                    border: 'none'
                  }}

                  size='small'

                >
                  <Typography variant='subtitle1' color='textSecondary'>Subtotal</Typography>
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    border: 'none'
                  }}

                  
                >
                  <Typography variant='h6' >{formatMoney(order.total)}</Typography>
                </TableCell>

              </TableRow>
              {/*
              <TableRow>
                <TableCell colSpan={4} align='right'
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
                  <Typography variant='h6' color='error' > - ${order.discount}</Typography>
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    border: 'none'
                  }}

                  size='small'
                >
                  <Button

                    color="primary"
                  >
                    Aplicar
                  </Button>
                </TableCell>

              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align='right'>
                  <Typography variant='h6' color='textSecondary'>Total</Typography>
                </TableCell>
                <TableCell
                  align='right'
                >
                  <Typography variant='h4' >${order.total}</Typography>
                </TableCell>

              </TableRow> */}

            </TableBody>
            {/* <Stack>
                <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
                  <Typography variant='subtitle1' color='textSecondary'>Subtotal</Typography>
                  <Typography variant='h6' >${order.amount}</Typography>

                </Stack>
                <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
                  <Typography variant='subtitle1' color='textSecondary'>Descuento</Typography>
                  <Typography variant='h6' color='error' > - ${order.discount}</Typography>
                  <Button

                    color="primary"
                  >
                    Aplicar
                  </Button>

                </Stack>
                <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
                  <Typography variant='h6' color='textSecondary'>Total</Typography>
                  <Typography variant='h4' >${order.total}</Typography>

                </Stack>


              </Stack> */}
          </Table>
        </TableContainer>
        {/* <Stack m={1} mx={3} spacing={1}>
          <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
            <Typography variant='subtitle1' color='textSecondary'>Subtotal</Typography>
            <Typography variant='h6' width={120} textAlign='right' >${order.amount}</Typography>

          </Stack>
          <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
            <Box display='flex' alignItems='center'>
              <Typography variant='subtitle1' color='textSecondary'>Descuento</Typography>
              <Button

                color="primary"
              >
                Aplicar
              </Button>

            </Box>

            <Typography variant='h6' color='error' width={120} textAlign='right' > - ${order.discount}</Typography>

          </Stack>
          <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
            <Typography variant='h6' color='textSecondary'>Total</Typography>
            <Typography variant='h4' width={120} textAlign='right'>${order.total}</Typography>

          </Stack>


        </Stack> */}

        <ModalUpdateDetail />

      </Card>

    </>
  )
}