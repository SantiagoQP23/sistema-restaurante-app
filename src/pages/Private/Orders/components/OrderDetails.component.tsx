import { useContext } from 'react';
import { Add } from "@mui/icons-material";
import { Card, CardHeader, Box, Typography, Button, CardContent, Grid } from "@mui/material"
import { OrderDetail } from "./OrderDetail.component"
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/Order.context';






export const OrderDetails = () => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext)


  return (

    <>
      <Card>
        <CardHeader title={
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Typography variant="body1" fontWeight='bold'>Detalles de pedido</Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('products')}

            >

              <Add />
              Añadir
            </Button>

          </Box>
        } />

        <CardContent >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <OrderDetail />
            </Grid>
          </Grid>
        </CardContent>

      </Card>
    </>
  )
}