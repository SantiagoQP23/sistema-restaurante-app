import { FC } from 'react'

import { useNavigate } from 'react-router-dom';

// Material UI
import { Typography, Grid, Box, Button, IconButton, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, CardActions, Tooltip } from '@mui/material/';


import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { ICategory } from '../../../../../models';
import { setActiveCategory, setActiveProducts } from '../../../../../redux';
import { useDispatch } from 'react-redux';
import { Label } from '../../../../../components/ui';
import Switch from '@mui/material/Switch';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import { updateCategory as updateCategoryS } from '../../services/sections.service';
import { updateCategory } from '../../../../../redux/slices/menu/menu.thunks';
import { useAppDispatch } from '../../../../../hooks/useRedux';
import { CardHeader } from '@mui/material';

interface Props {
  categoria: ICategory;
  eliminarCategoria: (categoria: ICategory) => void;
}


export const Category: FC<Props> = ({ categoria, eliminarCategoria }) => {


  const navigate = useNavigate();

  const dispatch = useAppDispatch();



  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const establecerCategoria = () => {
    navigate(`${categoria.name.toLowerCase()}`,);
    dispatch(setActiveCategory(categoria));

  }

  const editarCategoria = () => {
    dispatch(setActiveCategory(categoria))




    if (categoria.products.length > 0) {
      dispatch(setActiveProducts(categoria.products))
    }
    else {
      dispatch(setActiveProducts([]))

    }


    navigate('../category');
  }


  const changeStatusCategory = async (categoria: ICategory) => {

    await callEndpoint(updateCategoryS(categoria.id, { isActive: !categoria.isActive }))
      .then((resp) => {
        const { data } = resp;

        dispatch(updateCategory({ ...categoria, isActive: !categoria.isActive }));
        //dispatch(setActiveCategory({ ...categoria, ...data.category }))
        enqueueSnackbar('La categoría ha sido actualizada', { variant: 'success' })

      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar('Ya existe', { variant: 'error' })

      });


  }

  return (
    <>

      <Card>
        <CardHeader
          title={categoria.name}
          subheader={`Productos: ${categoria.products.length}`}
          action={
            <Label
              color={categoria.isActive ? 'success' : 'error'}
            >
              {categoria.isActive ? 'Activo' : 'Eliminado'}
            </Label>
          }
        />

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box>
            <Button variant="outlined" size='small' onClick={() => establecerCategoria()} >
              Ver Productos

            </Button>

          </Box>


          <Box >
            <Tooltip title="Editar">

              <IconButton color='primary'
                onClick={() => editarCategoria()}
              >

                <EditOutlined />

              </IconButton>
            </Tooltip>
            <Switch checked={categoria.isActive} onClick={() => changeStatusCategory(categoria)} color={categoria.isActive ? 'success' : 'error'} />

            {/* <Tooltip title="Eliminar">

              <IconButton
                color='error'
                onClick={() => eliminarCategoria(categoria)}
              >

                <DeleteOutlined />

              </IconButton>
            </Tooltip> */}
          </Box>
        </CardActions>
      </Card>




    </>
  )
}

