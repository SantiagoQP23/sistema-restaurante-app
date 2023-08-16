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

    // await callEndpoint(updateSectionS(seccion.id, { isActive: !seccion.isActive }))
    //   .then((resp) => {
    //     const { data } = resp;
    //     console.log(data.section)

    //     dispatch(updateSection({ ...seccion, isActive: !seccion.isActive }))

    //   })
    //   .catch((err) => {

    //     enqueueSnackbar('Ya existe', { variant: 'error' })

    //   });

  }


  return (
    <>

      <Card

      >
        <CardActionArea
          onClick={() => editarCategorias()}
        >

         

          <CardContent>

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1
              

            }}>
              <Label color={seccion.isActive ? 'success' : 'error'}>{seccion.isActive ? 'Activo' : 'Eliminado'}</Label>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenMenu(e, seccion)
                }}
              >
                <MoreHorizOutlined />
              </IconButton>
            </Box>

            <Typography variant='h4'>
              {seccion.name}

            </Typography>
            <Typography variant='subtitle1' mt={1}>
              Categorías: <Label color='info'>{seccion.categories.length}</Label>
              {/* {`Categorías: ${seccion.categories.length}`} */}
            </Typography>

          </CardContent>

        </CardActionArea>


      </Card>

    </>
  )
}



