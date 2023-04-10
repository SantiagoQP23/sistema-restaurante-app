import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Button, CardActions, IconButton, Tooltip, CardHeader, CardActionArea } from '@mui/material';

import { EditOutlined, DeleteOutlined, ToggleOff, ToggleOn } from '@mui/icons-material';
import { ISection } from '../../../../../models';

import { setActiveCategories, setActiveCategory, setActiveProducts, setActiveSection, updateSection } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { Label } from '../../../../../components/ui';
import Switch from '@mui/material/Switch';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { updateSection as updateSectionS } from '../../services/sections.service';

interface Props {
  seccion: ISection,
  eliminarSeccion: (seccion: ISection) => void;
  editarSeccion?: (seccion: ISection) => void;
}


export const Section: FC<Props> = ({ seccion, eliminarSeccion }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();

  const editarCategorias = () => {
    dispatch(setActiveSection(seccion));
    navigate(`${seccion.name.toLowerCase()}`);
  }

  const editarSeccion = () => {
    dispatch(setActiveSection(seccion));

    dispatch(setActiveCategories(seccion!.categories))

    if (seccion!.categories.length > 0) {
      dispatch(setActiveCategory(seccion!.categories[0]))

      dispatch(setActiveProducts(seccion!.categories[0].products))

    } else {

      dispatch(setActiveProducts([]))
    }






    navigate(`seccion`);
  }

  const changeStatusSection = async (seccion: ISection) => {

    await callEndpoint(updateSectionS(seccion.id, { isActive: !seccion.isActive }))
      .then((resp) => {
        const { data } = resp;
        console.log(data.section)

        dispatch(updateSection({ ...seccion, isActive: !seccion.isActive }))

      })
      .catch((err) => {

        enqueueSnackbar('Ya existe', { variant: 'error' })

      });

  }


  return (
    <>

      <Card

      >
        <CardActionArea
         onClick={() => editarCategorias()}
        >

          <CardHeader
            title={seccion.name}
            subheader={`Categorías: ${seccion.categories.length}`}
            action={

              <Label color={seccion.isActive ? 'success' : 'error'}>{seccion.isActive ? 'Activo' : 'Eliminado'}</Label>
            }
          />
        </CardActionArea>



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

            <Switch checked={seccion.isActive} onClick={() => changeStatusSection(seccion)} color={seccion.isActive ? 'success' : 'warning'} />

            {
              //   seccion.isActive
              //   ? 
              // <Tooltip title='Eliminar' >

              //   <IconButton 
              //   color='success'
              //     onClick={() => { activateSection(seccion) }}
              //     >
              //   <ToggleOn />
              //   </IconButton>
              // </Tooltip>
              // : 
              // <Tooltip title='Activar' >
              //   <IconButton 
              //   color='error'
              //     onClick={() => { activateSection(seccion) }}
              //   >
              //   <ToggleOff />
              //   </IconButton>
              // </Tooltip>

            }


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


