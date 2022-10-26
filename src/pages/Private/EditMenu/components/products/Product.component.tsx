import React, { FC } from 'react'

import { Typography, Grid, Box, Button, Card, CardContent, IconButton, CardActions } from '@mui/material/';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const editProduct = () =>{
    dispatch(setActiveProduct(producto))
    navigate('../product')

  }



  return (
    <>

      <Grid item xs={12} sm={4} md={3} lg={3}>
        <Card >
          <CardContent>

            <Typography variant="h6" align='center' color='white' >{producto.name}</Typography>
            <Typography variant="subtitle2" color='primary' align='center'>$ {producto.price}</Typography>

            <Box display='flex' justifyContent='space-between'>

              <Button
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


            </Box>


          </CardContent>
        </Card>
      </Grid>

    </>
  )
}
