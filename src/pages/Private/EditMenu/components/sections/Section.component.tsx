import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Button, CardActions, IconButton, Tooltip, CardHeader, CardActionArea } from '@mui/material';

import { EditOutlined, DeleteOutlined, ToggleOff, ToggleOn, MoreHorizOutlined } from '@mui/icons-material';
import { ISection } from '../../../../../models';

import { setActiveCategories, setActiveCategory, setActiveProducts, setActiveSection, updateSection } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { Label } from '../../../../../components/ui';
import Switch from '@mui/material/Switch';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { updateSection as updateSectionS } from '../../services/menu.service';

interface Props {
  seccion: ISection,
  eliminarSeccion: (seccion: ISection) => void;
  handleOpenMenu: (event: any, seccion: ISection) => void;
}


export const Section: FC<Props> = ({ seccion, eliminarSeccion, handleOpenMenu }) => {

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

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenMenu(e, seccion)
                }}
              >
                <MoreHorizOutlined />
              </IconButton>
              // <Switch checked={seccion.isActive}
              //   onClick={(e) => {
              //     e.stopPropagation();
              //     changeStatusSection(seccion)

              //   }}
              //   color={seccion.isActive ? 'success' : 'warning'}
              // />

            }
          />



          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label color={seccion.isActive ? 'success' : 'error'}>{seccion.isActive ? 'Activo' : 'Eliminado'}</Label>
            {/* <Box >
              <Button
                size='small'
                onClick={
                  (e) => {
                    e.stopPropagation();
                    editarSeccion()
                  }
                }
              >
                Editar
              </Button>
            </Box>
               */}
            {/* <Box >
            <Tooltip title='Editar' >
              <IconButton color='primary'
                onClick={(e) => {
                  e.stopPropagation();
                  editarSeccion();
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>


          

          </Box> */}
            {/* <Switch checked={seccion.isActive} onClick={() => changeStatusSection(seccion)} color={seccion.isActive ? 'success' : 'warning'} /> */}

          </CardActions>
        </CardActionArea>


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


