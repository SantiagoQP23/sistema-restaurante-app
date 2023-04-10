import { FC, useContext } from 'react';
import { Box, Typography, Grid, Divider, Button } from '@mui/material';
import { OrderDetail } from "../../../components/EditOrder/OrderDetail.component"
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../../context/Order.context';
import { IOrderDetail } from '../../../../../../models';
import { ModalUpdateDetail } from '../../../components/EditOrder/ModalUpdateDescriptionDetail.component';
import { AddShoppingCartOutlined } from '@mui/icons-material';




interface Props {
  details: IOrderDetail[]
}


export const OrderDetails: FC<Props> = ({ details: orderDetails }) => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext);


  return (

    <>

      <Box display='flex' justifyContent='space-between' alignItems='center'>

        <Typography variant="h4" fontWeight='bold'>Productos</Typography>

        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('products')}
          size='small'
        >
          <AddShoppingCartOutlined />

        </Button>

      </Box>
      <Divider sx={{ my: 1 }} />

      {
        orderDetails.length === 0
          ? <Typography variant="body1" color="textSecondary" align='center'>No hay productos en este pedido</Typography>
          :
          <Grid container spacing={1}>
            {
              orderDetails.map((detail) => {

                if (detail.isActive)
                  return (
                    <Grid key={detail.id} item xs={12}>

                      <OrderDetail detail={detail} />
                     
                    </Grid>
                  )
              })
            }
            <ModalUpdateDetail />
          </Grid>
      }


    </>
  )
}