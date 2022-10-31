import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Button, CardActions, IconButton, Tooltip } from '@mui/material';

import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { ISection } from '../../../../../models';

import { setActiveSection } from '../../../../../redux';
import { useDispatch } from 'react-redux';

interface Props {
  seccion: ISection,
  eliminarSeccion: (seccion: ISection) => void;
  editarSeccion?: (seccion: ISection) => void;
}


export const Section: FC<Props> = ({ seccion, eliminarSeccion }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const editarCategorias = () => {
    dispatch(setActiveSection(seccion));
    navigate(`${seccion.name.toLowerCase()}`);
  }

  const editarSeccion = () => {
    dispatch(setActiveSection(seccion));
    navigate(`seccion`);
  }


  return (
    <>

      <Card >
        <CardContent>
          <Typography variant="h6" color="white">{seccion.name}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box >
            <Button
              size='small'
              variant="outlined"
              onClick={() => editarCategorias()}
            >
              Categorías
            </Button>
          </Box>
          <Box >
            <Tooltip title='Editar' >
              <IconButton color='primary'
                onClick={() => {
                  editarSeccion();
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title='Eliminar' >

              <IconButton color='error'
                onClick={() => { eliminarSeccion(seccion) }}
              >
                <DeleteOutlined />
              </IconButton>
            </Tooltip>


          </Box>

        </CardActions>
      </Card>

    </>
  )
}


{/*  <Button
              variant='text'
              
              onClick={() => {
                editarSeccion();
              }}>
              <EditOutlined />

            </Button>

            <Button
              variant='text'
              size='small'
              color='error'
              onClick={() => { eliminarSeccion(seccion) }}
            >
              <DeleteOutlined />

            </Button>
          </Box> */}


