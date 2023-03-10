import React, { useState, useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import { Typography, Box, Grid, Button, InputLabel, MenuItem, Select, SelectChangeEvent, CardHeader, Card, CardContent, Divider } from '@mui/material/'

// Iconos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { useContext } from 'react';
import { MenuContext } from '../../../../../context/MenuContext';

// Component
import { Category } from './Category.component';


import { ICategory } from '../../../../../models/menu.model';
import { PrivateRoutes } from '../../../../../models';
import { useModal } from '../../../../../hooks';
import { DeleteCategory } from './DeleteCategory.component';

import { resetActiveCategory, selectMenu, setActiveCategories, setActiveCategory, setActiveProducts, setActiveSection } from '../../../../../redux';

export function EditCategories() {

  const navigate = useNavigate();

  //const { activeSection, categories, activeCategory, sections, changeSection } = useContext(MenuContext);

  const { sections, activeSection, activeCategory } = useSelector(selectMenu);




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

            startIcon={<ArrowBackIcon />}
            onClick={backRoute}
          >
          </Button>


          <Typography align="center" variant="h6" color="initial">Categor??as</Typography>

        </Grid>
        <Grid item>


          <Button variant="contained" startIcon={<AddIcon />} onClick={() => createCategory()}>
            A??adir
          </Button>



        </Grid>



      </Grid>



      <Grid container spacing={1} sx={{ my: 2 }}>

      <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>

          <Typography variant='body2'>Secci??n</Typography>
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
          </ CardContent>
          </Card>

        </Grid>

        <Grid item xs={12} sm={3}>

          <Card>
            <CardContent>
              <Typography variant='body2'>Categor??as</Typography>
              <Typography variant='h6'>{activeSection?.categories.length}</Typography>
            </CardContent>
          </Card>
        </Grid>


       

      </Grid>












      {
        activeSection!.categories.length === 0 && (
          <Typography variant='subtitle1'>No se encontraron categorias de la secci??n.</Typography>
        )
      }

      <Box >
        <Grid container rowSpacing={1} spacing={1}>
          {
            activeSection!.categories.length > 0 && activeSection!.categories.map(categoria => (
              <Grid key={categoria.id} item xs={12} sm={4}>

                <Category

                  categoria={categoria}
                  eliminarCategoria={eliminarCategoria}
                />
              </Grid>

            ))
          }
        </Grid>

      </Box>





      {
        activeCategory &&
        <DeleteCategory isOpen={isOpen} closeModal={handleClose} />
      }


    </>
  )
}


