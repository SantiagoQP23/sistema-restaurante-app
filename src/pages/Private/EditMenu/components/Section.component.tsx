import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';

import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { ISection } from '../../../../models';

import { setActiveSection } from '../../../../redux';
import { useDispatch } from 'react-redux';

interface Props {
  seccion: ISection,
  eliminarSeccion: (seccion: ISection) => void;
  editarSeccion: (seccion: ISection) => void;
}


export const Section: FC<Props> = ({ seccion, eliminarSeccion, editarSeccion }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const editarCategorias = () => {
    dispatch(setActiveSection(seccion));
    navigate(`${seccion.name.toLowerCase()}`);
  }


  return (
    <>
      <Grid item xs={12} sm={6} lg={4}>
        <Card >
          <CardContent>
            <Typography variant="h6" color="white" align='center'>{seccion.name}</Typography>
            <Box display='flex' justifyContent='center'>

              <Button
                size='small'
                variant="text"
                onClick={() => editarCategorias()}
              >
                Editar  Categorias
              </Button>

            </Box>

            <Box mt={1} display='flex' justifyContent='space-between' >

              <Button
                variant='text'
                onClick={() => {
                  editarSeccion(seccion);
                }}>

                <EditOutlined />
                Editar
              </Button>

              <Button
                variant='text'
                size='small'
                color='error'
                onClick={() => { eliminarSeccion(seccion) }}
              >
                <DeleteOutlined />
                Eliminar
              </Button>


            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}


