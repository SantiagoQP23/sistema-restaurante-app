import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

//Material UI
import { Typography, Box, Button, Grid } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { MenuContext } from '../../../../../context/MenuContext';
import { ISection } from '../../../../../models';


import { Section } from './Section.component';
import { useDispatch } from 'react-redux';
import { resetActiveSection } from '../../../../../redux';




export const EditSections = () => {

  const navigate = useNavigate();


   const dispatch = useDispatch();

  const { sections } = useContext(MenuContext);

  const createSection = () => {

    dispatch(resetActiveSection())

    navigate('seccion')
  }

  const eliminarSeccion = (seccion: ISection) => {
    console.log('Eliminar seccion')
    /* setSeccion(seccion);
    openModalEliminar(); */
  }

  return (
    <>
      <Box mb={2} display='flex' justifyContent='space-between' alignItems='center'>

        <Button
          variant="outlined"
          disabled
          startIcon={<ArrowBackIcon />} >
        </Button>

        <Typography align='center' variant="h3" color="initial">Secciones</Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => createSection()} >
          Añadir
        </Button>

      </Box>

      <Box minHeight={"70vh"}>

        <Grid container rowSpacing={1} spacing={1}>

          {
            sections.length === 0 && (
              <Typography variant='h6'>Aún no se han ingresado sections</Typography>
            )
          }
          {
            sections.length > 0 && sections.map(seccion => (

              <Section
                seccion={seccion}
                key={seccion.id}
               
                eliminarSeccion={eliminarSeccion}
              />
            ))
          }

        </Grid>
      </Box>

     


    </>
  )
}


