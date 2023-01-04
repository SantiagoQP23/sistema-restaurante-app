import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Grid, Card, CardContent, Typography, TextField } from '@mui/material';

import { MenuAddProduct } from '../components/MenuAddProduct.component';
import { DataClient } from '../components';
import { TableOrder } from '../components/TableOrder.component';


import { useContext } from 'react';
import { Add } from "@mui/icons-material";
import { CardHeader, Box, } from "@mui/material"
import { OrderDetail } from "./../components"
import { OrderContext } from '../context/Order.context';
import { NewOrderDetail } from '../components/NewOrderDetail.component';






const People: FC = () => {

  return (
    <>
      <Card>
        <CardContent>
          <TextField
            type='number'
            label='Personas'
            value={10}
          />
        </CardContent>
      </Card>
    </>
  )
}


export const OrderDetails = () => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext)


  return (

    <>
      <Card>
        <CardHeader title={
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Typography variant="body1" fontWeight='bold'>Detalles de pedido</Typography>

          </Box>
        } />

        <CardContent >
          <Grid container spacing={1}>
            {
              details.map((detail) => (

                <Grid key={detail.product.name} item xs={12}>
                  <NewOrderDetail detalle={detail} />
                </Grid>

              ))

            }
          </Grid>
        </CardContent>

      </Card>
    </>
  )
}



export const AddOrder = () => {

  const navigate = useNavigate();

  const { amount, reset } = useContext(OrderContext);

  const cancelOrder = () => {
    navigate(-1);
    reset();
  }

  return (
    <>
      <Card sx={{mb: 2}}>
        <CardContent>
          <Grid container spacing={1} justifyContent='space-between' >
            <Grid item >

              <Typography variant='h6'>Nuevo pedido</Typography>
            </Grid>
            
            <Grid item display='flex' justifyContent='right' alignItems='center'>

              <Button variant='outlined' onClick={cancelOrder}>Cancelar</Button>
              {/* <Typography variant='body2'>$ {amount}</Typography> */}
              <Button variant='contained' > ${amount} Create Order</Button>
            </Grid>
            
          </Grid>

        </CardContent>
      </Card>

      <Grid container spacing={1} alignItems='start'>
        <Grid item xs={12} md={6}>
          <MenuAddProduct />

        </Grid>
        <Grid container spacing={1} item xs={12} md={6}>
          <Grid item xs={12} md={6}>
            <TableOrder />
          </Grid>
          <Grid item xs={12} md={6}>
            <People />
          </Grid>

          <Grid item xs={12} >
            <DataClient />
          </Grid>
          <Grid item xs={12}>
            <OrderDetails />

          </Grid>
        </Grid>
      </Grid>


    </>
  )
}