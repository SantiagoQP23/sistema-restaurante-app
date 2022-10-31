import React, { useState, useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import { Typography, Box, Grid, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/'

// Iconos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { useContext } from 'react';
import { MenuContext } from '../../../../../context/MenuContext';

// Component
import { Category } from './Category.component';


import { ICategory } from '../../../../../models/menu.model';
import { PrivateRoutes } from '../../../../../models';
import { resetActiveCategory, setActiveCategory } from '../../../../../redux';
import { useModal } from '../../../../../hooks';
import { DeleteCategory } from './DeleteCategory.component';


export function EditCategories() {

  const navigate = useNavigate();

  const { activeSection, categories, activeCategory, sections, changeSection } = useContext(MenuContext);


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


  useEffect(() => {


    if (!activeSection)
      navigate(`/${PrivateRoutes.MENU_EDIT}`)

  }, [])




  return (
    <>
      <Grid container   display='flex' justifyContent='space-between' >
        <Grid item display='flex' alignItems='center'>
          <Button

            startIcon={<ArrowBackIcon />}
            onClick={backRoute}
          >
          </Button>


          <Typography align="center" variant="h3" color="initial">Categorías</Typography>

        </Grid>
        <Grid item>
          <Box>

            {<InputLabel id='select-seccion'>Seccion</InputLabel>}
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
          </Box>

        </Grid>



      </Grid>

      <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>Total categorías: {categories.length}</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => createCategory()}>
          Añadir
        </Button>

      </Box>









      {
        categories.length === 0 && (
          <Typography variant='subtitle1'>No se encontraron categorias de la sección.</Typography>
        )
      }

      <Box minHeight={"70vh"}>
        <Grid container rowSpacing={1} spacing={1}>
          {
            categories.length > 0 && categories.map(categoria => (
              <Grid item xs={12} sm={4}>

                <Category
                  key={categoria.id}
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


