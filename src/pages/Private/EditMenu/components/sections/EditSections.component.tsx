import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

//Material UI
import { Typography, Box, Button, Grid } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { MenuContext } from '../../../../../context/MenuContext';
import { ISection } from '../../../../../models';


import { Section } from './Section.component';
import { useDispatch, useSelector } from 'react-redux';
import { resetActiveSection, selectMenu, setActiveSection } from '../../../../../redux';
import { useModal } from '../../../../../hooks';
import { DeleteSection } from './DeleteSection.component';




export const EditSections = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {activeSection, sections} = useSelector(selectMenu);
  const { isOpen, handleOpen, handleClose } = useModal();


  
  const createSection = () => {

    dispatch(resetActiveSection())

    navigate('seccion')
  }

  const eliminarSeccion = (seccion: ISection) => {
    dispatch(setActiveSection(seccion))
    handleOpen();
  }

  return (
    <>
      <Box mb={2} display='flex' justifyContent='space-between' alignItems='center'>

       

        <Typography align='center' variant="h4">Secciones</Typography>

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
              <Grid  key={seccion.id} item xs={12} sm={6} lg={4}>

                <Section
                  seccion={seccion}
                 
                  eliminarSeccion={eliminarSeccion}
                />
              </Grid>
            ))
          }

        </Grid>
      </Box>

      {
        activeSection &&
        <DeleteSection isOpen={isOpen} closeModal={handleClose} />
      }




    </>
  )
}


