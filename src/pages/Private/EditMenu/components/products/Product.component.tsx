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
          sx={{ width: 180 }}
          image="/static/images/products/no-image.png"
          alt="Product"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

          <CardContent >
            <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" color='white' >{producto.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" >{producto.description ? producto.description: 'No se ha añadido descripción'}</Typography>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant="h6" color='orangered' >$ {producto.price}</Typography>
              <Typography variant="body1" >Stock: {producto.stock}</Typography>
            </Grid>
            <Grid item xs={12}>
            </Grid>

            </Grid>
            {/* <Typography variant="body1" color='white' >Categoría: {producto.category.name}</Typography> */}
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