import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

//Material UI
import { Typography, Box, Button, Grid } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { MenuContext } from '../../../../context/MenuContext';
import { ISection } from '../../../../models';

/* 
import { useModal } from '../../hooks/useModal'
 */
// Modal
/* 
import { Modal, Seccion, ModalEliminarSeccion, ModalEditarSeccion } from '.'; */
import { Section } from './Section.component';




export const EditSections = () => {

  const navigate = useNavigate();
  //const [seccion, setSeccion] = useState<ISection | null>();
  /*  const { isOpen: isOpenEditar, handleClickOpen: openModalEditar, handleClose: closeModalEditar } = useModal(false);
   const { isOpen: isOpenEliminar, handleClickOpen: openModalEliminar, handleClose: closeModalEliminar } = useModal(false);
  */

  const { sections } = useContext(MenuContext);

  const editarSeccion = (seccion: ISection | null) => {

    navigate('seccion')
    console.log('Editar seccion')
    /*  setSeccion(seccion);
     openModalEditar(); */
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
          onClick={() => editarSeccion(null)} >
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
                editarSeccion={editarSeccion}
                eliminarSeccion={eliminarSeccion}
              />
            ))
          }

        </Grid>
      </Box>

      {/* 

      <Modal open={isOpenEditar} closeModal={closeModalEditar}>
        <ModalEditarSeccion seccion={seccion!} closeModal={closeModalEditar} />
      </Modal>

      <Modal open={isOpenEliminar} closeModal={closeModalEliminar}>
        <ModalEliminarSeccion seccion={seccion!} closeModal={closeModalEliminar} />
      </Modal> */}


    </>
  )
}


