import { FC, useContext } from 'react';
import { Add } from "@mui/icons-material";
import { Card, CardHeader, Box, Typography, Button, CardContent, Grid } from "@mui/material"
import { OrderDetail } from "./OrderDetail.component"
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/Order.context';
import { IOrderDetail } from '../../../../models';
import { ModalUpdateDetail } from './ModalUpdateDescriptionDetail.component';




interface Props {
  details: IOrderDetail[]
}


export const OrderDetails: FC<Props> = ({ details: orderDetails }) => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext);


  return (

    <>
      <Card>
        <CardHeader title={
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Typography variant="body1" fontWeight='bold'>Detalles de pedido</Typography>

            <Typography variant="subtitle1">Cantidad: {orderDetails.length}</Typography>
          </Box>
        } />


        <CardContent >
          {
            orderDetails.length === 0
              ? <Typography variant="body1" color="textSecondary" align='center'>No hay productos en este pedido</Typography>
              :
              <Grid container spacing={1}>
                {
                  orderDetails.map((detail) => (
                    <Grid key={detail.id} item xs={12}>

                      <OrderDetail detail={detail} />
                    </Grid>
                  ))
                }
                <ModalUpdateDetail />
              </Grid>
          }
        </CardContent>

      </Card>


    </>
  )
}