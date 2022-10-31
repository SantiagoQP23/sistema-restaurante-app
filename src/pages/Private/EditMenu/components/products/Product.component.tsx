import React, { FC } from 'react'

import { Typography, Grid, Box, Button, Card, CardContent, IconButton, CardActions, CardMedia, Tooltip } from '@mui/material/';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { IProduct } from '../../../../../models';
import { setActiveProduct } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



interface Props {
  producto: IProduct;

  eliminarProducto: (producto: IProduct) => void;
}

export const Product: FC<Props> = ({ producto, eliminarProducto }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const editProduct = () => {
    dispatch(setActiveProduct(producto))
    navigate('../product')

  }



  return (
    <>


      <Card sx={{ display: 'flex' }} >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/products/no-image.png"
          alt="Product"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

          <CardContent >

            <Typography variant="h6" color='white' >{producto.name}</Typography>
            <Typography variant="body1" color='white' >$ {producto.price}</Typography>
            <Typography variant="body1" color='white' >Descripcion: {producto.description}</Typography>
            <Typography variant="body1" color='white' >Stock: {producto.stock}</Typography>
            <Typography variant="body1" color='white' >Categoría: {producto.category.name}</Typography>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>



            <Tooltip title='Editar'>

              <IconButton
                color='primary'
                onClick={() => editProduct()}

              >
                <EditOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title='Eliminar'>

              <IconButton

                color='error'
                onClick={() => eliminarProducto(producto)}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>


          </CardActions>
        </Box>



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