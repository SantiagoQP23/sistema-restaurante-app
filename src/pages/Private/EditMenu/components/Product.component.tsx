import React, { FC } from 'react'

import { Typography, Grid, Box, Button, Card, CardContent, IconButton, CardActions } from '@mui/material/';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { IProduct } from '../../../../models';



interface Props {
  producto: IProduct;
  editarProducto: (producto: IProduct) => void;
  eliminarProducto: (producto: IProduct) => void;
}

export const Product: FC<Props> = ({ producto, editarProducto, eliminarProducto }) => {
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
                onClick={() => editarProducto(producto)}
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
