import React, { FC } from 'react'

import { Typography, Grid, Box, Button, Card, CardContent, IconButton, CardActions, CardMedia, Tooltip, Switch, CardHeader } from '@mui/material/';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { IProduct } from '../../../../../models';
import { setActiveProduct } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Label } from '../../../../../components/ui';
import { ProductStatus, ProductStatusSpanish } from '../../../../../models/menu.model';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { updateProduct as updateProductS } from '../../services/sections.service';
import { updateProduct } from '../../../../../redux/slices/menu/menu.thunks';
import { useAppDispatch } from '../../../../../hooks/useRedux';



interface Props {
  producto: IProduct;

  eliminarProducto: (producto: IProduct) => void;
}

export const Product: FC<Props> = ({ producto, eliminarProducto }) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();


  const editProduct = () => {
    dispatch(setActiveProduct(producto))
    navigate('../product')

  }

  const changeStatusProduct = async (product: IProduct) => {

    await callEndpoint(updateProductS(product.id, { isActive: !product.isActive }))
      .then((res) => {
        dispatch(updateProduct({ ...product, isActive: !product.isActive }));

      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' })
      })


  }


  return (
    <>


      <Card
      // sx={{ 
      //   display: 'flex',
      //    }} 
      >
        {/* <CardMedia
          component="img"
          sx={{ width: 160 }}
          image={producto.images ? producto.images : '/static/images/products/no-image.png'}
          alt="Product"
        /> */}

      


        <CardContent >

          <Box display='flex' justifyContent='space-between'>

            <Typography variant='h4' >{producto.name}</Typography>
            <Typography variant="body1" >

              {
                producto.isActive
                  ? <Label color='info'>

                    {ProductStatusSpanish[`${producto.status as ProductStatus}`]}

                  </Label>
                  : <Label color='error'>
                    Eliminado
                  </Label>
              }
            </Typography>
          </Box>

          <Typography variant="body1" >$ {producto.price}</Typography>
          <Typography  >{producto.description ? producto.description : 'No se ha añadido descripción'}</Typography>



          {/* <Typography variant="body1" color='white' >Categoría: {producto.category.name}</Typography> */}
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>

          <Tooltip title='Editar'>

            <IconButton
              color='primary'
              onClick={() => editProduct()}

            >
              <EditOutlined />
            </IconButton>
          </Tooltip>
          <Switch checked={producto.isActive} onClick={() => changeStatusProduct(producto)} color={producto.isActive ? 'success' : 'error'} />




        </CardActions>




      </Card>


    </>
  )
}
            /*   <Button
variant='text'
color='error'
onClick={() => eliminarProducto(producto)}
>
<DeleteOutline />
Eliminar
</Button>

<Button
color='primary'
onClick={() => editProduct()}
variant='text'
>
<EditOutlined />
Editar
</Button>
*/