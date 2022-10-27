import React, { useState, useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import { Typography, Box, Grid, Button } from '@mui/material/'

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

  const { activeSection, categories } = useContext(MenuContext);

  
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
  
  useEffect(() => {
    
    
    if (!activeSection)
    navigate(`/${PrivateRoutes.MENU_EDIT}`)

  }, [])



  return (
    <>

      <Box mb={2} display='flex' justifyContent='space-between'>



        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={backRoute}
        >
        </Button>


        <Typography align="center" variant="h3" color="initial">Categorías de {activeSection?.name}</Typography>

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
              <Category
                key={categoria.id}
                categoria={categoria}
                eliminarCategoria={eliminarCategoria}
              />

            ))
          }
        </Grid>

      </Box>

      <DeleteCategory isOpen={isOpen} closeModal={handleClose} />


    </>
  )
}


