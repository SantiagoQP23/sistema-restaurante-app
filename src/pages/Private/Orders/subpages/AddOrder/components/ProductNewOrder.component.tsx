
import { FC, useState, useContext } from 'react';

import { RemoveCircleOutline, AddCircleOutline, ShoppingCart } from '@mui/icons-material';
import { Card, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import { IProduct, ProductStatus } from '../../../../../../models/menu.model';
import { useCounter } from '../../../hooks/useCounter';
import { OrderContext } from '../../../context/Order.context';
import { ICreateOrderDetail } from '../../../../../../models/orders.model';
import { sharingInformationService } from '../../../services/sharing-information.service';

interface Props {
  product: IProduct
}


export const ProductNewOrder: FC<Props> = ({ product }) => {

  const { state: counter, increment, decrement } = useCounter(1,);

  const { details } = useContext(OrderContext);


  const openModal = () => {
    const detail: ICreateOrderDetail = { product, quantity: counter }

    sharingInformationService.setSubject(true, detail);

  }



  return (
    <Card>

      <CardContent sx={{ flex: '1 0 auto' }} >

        <Typography variant="h5" textAlign='center' mb={1}>{product.name}</Typography>

        <Typography variant="body1" textAlign='center'>$ {product.price}</Typography>

        <Box display='flex' justifyContent='center' alignItems='center' p={1}>

          {
            product.status === ProductStatus.AVAILABLE
              ?

              <Box display='flex' justifyContent='center' alignItems='center'>

                <IconButton
                  size="small"
                  onClick={decrement}
                >
                  <RemoveCircleOutline />
                </IconButton>

                <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
                <IconButton
                  size="small"
                  onClick={increment}
                >
                  <AddCircleOutline />
                </IconButton>

                {
                  !details.find(det => det.product.id === product.id)
                    ?
                    <Button
                      disabled={counter <= 0}
                      color='primary'
                      onClick={() => {
                        openModal();
                        /* newDetail({product, quantity: counter}) */
                      }}

                      size='small'
                    >
                      <ShoppingCart />

                    </Button>
                    : <Button
                      disabled

                    >Añadido</Button>

                }
              </Box>
              : <Typography variant='h6' color='info' align="center">Producto no disponible</Typography>
          }



        </Box>


      </CardContent>
    </Card>
  )
}