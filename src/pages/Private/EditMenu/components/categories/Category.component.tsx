import React, { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom';

// Material UI
import { Typography, Grid, Box, Button, IconButton, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material/';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { ICategory } from '../../../../../models';
import { useAppDispatch, useModal } from '../../../../../hooks';
import { setActiveCategory } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { DeleteCategory } from './DeleteCategory.component';

interface Props {
  categoria: ICategory;
  eliminarCategoria: (categoria: ICategory) => void;
}


export const Category: FC<Props> = ({ categoria, eliminarCategoria }) => {


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const establecerCategoria = () => {
    navigate(`${categoria.name.toLowerCase()}`,);
    dispatch(setActiveCategory(categoria));

  }

  const editarCategoria = () => {
    dispatch(setActiveCategory(categoria))
    navigate('../category');
  }

  return (
    <>
      <Grid item xs={12} sm={4}  >
        <Card>
          <CardContent>
            <Typography variant="h6" align='center' color='white'>{categoria.name}</Typography>

            <Box display='flex' justifyContent='center'>
              <Button variant="text" size='small' onClick={() => establecerCategoria()} >
                Ver productos

              </Button>

            </Box>


            <Box display='flex' justifyContent='space-between'>

              <Button variant='text' size='small'
                color='error'
                onClick={() => eliminarCategoria(categoria)}
              >

                <DeleteOutlined />
                Eliminar
              </Button>

              <Button variant='text' size='small'
                onClick={() => editarCategoria()}
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
