
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Card, CardContent, Typography, Button, TextField, Box, ButtonGroup, IconButton } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RemoveCircleOutline, AddCircleOutline, SaveOutlined } from '@mui/icons-material';
import { IProduct } from '../../../../models';
import { Product } from '../../Menu/components';
import { useCounter } from '../hooks';

/* 
import { Producto } from '../Menu/';
import { useCounter } from '../../hooks/useCounter';
import { IProducto } from '../../interfaces';
import { INuevoDetallePedido } from '../../interfaces/pedidos';
import { PedidosState, selectPedidos } from '../../reducers';
 */
interface Props {
  producto: IProduct;
  abrirModal: () => void;
  setDetalle?: (detalle: any) => void;
}

export const ProductAdd: FC<Props> = ({ producto, abrirModal, setDetalle }) => {
  const { state: counter, increment, decrement } = useCounter(1);

  const [subtotal, setSubtotal] = useState(counter * producto.price);
 /* 
  const { pedidoActivo } = useSelector(selectPedidos);




  */
 
 useEffect(() => {
   setSubtotal(counter * producto.price);

 }, [counter]) 

  return (
    <>


      <Product  product={producto} />

      <Card>

        <Box display='flex' justifyContent='space-between' p={1}>


          <Typography variant="h6" > $ {subtotal}</Typography>

          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <IconButton
              onClick={decrement}
              >
              <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
            <IconButton
              onClick={increment}
              >
              <AddCircleOutline />
            </IconButton>
            <IconButton
              disabled={counter <= 0}
              color='primary'
              onClick={() => {
                abrirModal();
              }}
              >
              <ShoppingCartIcon />
            </IconButton>
          </Box>

        </Box>



      </Card>

    </>
  )
}

              /* setDetalle({
                idPedido: pedidoActivo!.idPedido,
                cantidad: counter,
                descripcion: '',
                subtotal,
                producto,
              }) */