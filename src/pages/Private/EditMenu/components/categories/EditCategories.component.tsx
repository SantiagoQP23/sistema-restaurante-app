import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import { Typography, Box, Grid, Button, MenuItem, Select, SelectChangeEvent, CardHeader, Card, CardContent, Divider, Popover } from '@mui/material/';

// Iconos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'


// Component
import { Category } from './Category.component';


import { ICategory } from '../../../../../models/menu.model';
import { PrivateRoutes } from '../../../../../models';
import { useModal } from '../../../../../hooks';
import { DeleteCategory } from './DeleteCategory.component';

import { resetActiveCategory, selectMenu, setActiveCategories, setActiveCategory, setActiveProducts, setActiveSection } from '../../../../../redux';
import { EditOutlined } from '@mui/icons-material';

export function EditCategories() {

  const navigate = useNavigate();

  //const { activeSection, categories, activeCategory, sections, changeSection } = useContext(MenuContext);

  const { sections, activeSection, activeCategory } = useSelector(selectMenu);


  const [open, setOpen] = useState(null);



  const handleOpenMenu = (event: any, category: ICategory) => {
    dispatch(setActiveCategory(category))
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const { isOpen, handleOpen, handleClose } = useModal();

  const dispatch = useDispatch();

  const createCategory = () => {

    dispatch(resetActiveCategory());

    navigate('../category')

  }

  const eliminarCategoria = (categoria: ICategory) => {
    dispatch(setActiveCategory(categoria))
    handleOpen();
  }

  const backRoute = () => {
    navigate(-1);
  }

  const onChange = (e: SelectChangeEvent) => {
    changeSection(e.target.value)
  }


  const editarCategoria = () => {

    if (activeCategory!.products.length > 0) {
      dispatch(setActiveProducts(activeCategory!.products))
    }
    else {
      dispatch(setActiveProducts([]))

    }


    navigate('../category');
  }

  const changeSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    dispatch(setActiveSection(section!))
    dispatch(setActiveCategories(section!.categories))

    if (section!.categories.length > 0) {
      dispatch(setActiveCategory(section!.categories[0]))

      dispatch(setActiveProducts(section!.categories[0].products))

    } else {

      dispatch(setActiveProducts([]))
    }

  }

  useEffect(() => {

    if (!activeSection) {
      console.log('redirigir')
      navigate(`/${PrivateRoutes.MENU_EDIT}`)

    }




  }, [])





  return (
    <>
      <Grid container display='flex' justifyContent='space-between' >
        <Grid item display='flex' alignItems='center'>
          <Button
            onClick={backRoute}

            size='small'
          >
            <ArrowBackIcon />
          </Button>

          <Box>
            <Typography variant="h4">
              {activeSection?.name}
            </Typography>
            <Typography>
              {activeSection?.categories.length} categorías
            </Typography>
          </Box>

        </Grid>
        <Grid item>


          <Button variant="contained" startIcon={<AddIcon />} onClick={() => createCategory()}>
            Añadir
          </Button>



        </Grid>



      </Grid>



      {/* <Grid container spacing={1} sx={{ my: 2 }}>

        <Grid item xs={12} sm={3}>


          <Typography variant='body2'>Sección</Typography>
          <Select
            labelId="select-seccion"
            label="Seccion"
            margin='dense'
            value={activeSection?.id}
            onChange={onChange}
            fullWidth
          >
            {
              sections.map(seccion => (
                <MenuItem key={seccion!.id} value={seccion.id!}>{seccion.name} </MenuItem>
              ))
            }
          </Select>

        </Grid>

      </Grid> */}

      {
        activeSection!.categories.length === 0 && (
          <Typography variant='subtitle1'>No se encontraron categorias de la sección.</Typography>
        )
      }

      <Box mt={1}>
        <Grid container rowSpacing={1} spacing={1}>
          {
            activeSection!.categories.length > 0 && activeSection!.categories.map(categoria => (
              <Grid key={categoria.id} item xs={12} sm={4}>

                <Category

                  categoria={categoria}
                  eliminarCategoria={eliminarCategoria}
                  handleOpenMenu={handleOpenMenu}
                />
              </Grid>

            ))
          }
        </Grid>

      </Box>





      {
        activeCategory &&
        <>
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {

               editarCategoria();
                handleCloseMenu();
              }}
            >
              <EditOutlined />
              Editar
            </MenuItem>

            {/* <MenuItem sx={{ color: 'error.main' }}>
              <DeleteOutlined />
              Eliminar
            </MenuItem> */}
          </Popover>

          <DeleteCategory isOpen={isOpen} closeModal={handleClose} />
        </>
      }


    </>
  )
}


