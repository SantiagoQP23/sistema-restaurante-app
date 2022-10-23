import { useState } from 'react';
import { useSelector } from 'react-redux';

//Material UI
import { Typography, Box, Button, Grid } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { useModal } from '../../hooks/useModal'

// Modal

import { Modal, Seccion, ModalEliminarSeccion, ModalEditarSeccion } from '.';

import { ISeccion } from '../../interfaces';
import { selectSecciones } from '../../reducers/seccionesSlice';


export const EditSections = () => {

  const [seccion, setSeccion] = useState<ISeccion | null>();
  const { isOpen: isOpenEditar, handleClickOpen: openModalEditar, handleClose: closeModalEditar } = useModal(false);
  const { isOpen: isOpenEliminar, handleClickOpen: openModalEliminar, handleClose: closeModalEliminar } = useModal(false);


  const { secciones } = useSelector(selectSecciones);

  const editarSeccion = (seccion: ISeccion | null) => {
    setSeccion(seccion);
    openModalEditar();
  }

  const eliminarSeccion = (seccion: ISeccion) => {
    setSeccion(seccion);
    openModalEliminar();
  }

  return (
    <>
      <Box mb={2} display='flex' justifyContent='space-between' alignItems='center'>

        <Button variant="outlined" disabled startIcon={<ArrowBackIcon />} >
        </Button>

        <Typography align='center' variant="h6" color="initial">Secciones</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => editarSeccion(null)} >
          Añadir
        </Button>

      </Box>

      <Box minHeight={"70vh"}>

        <Grid container rowSpacing={1} spacing={1}>

          {
            secciones.length === 0 && (
              <Typography variant='h6'>Aún no se han ingresado secciones</Typography>
            )
          }
          {
            secciones.length > 0 && secciones.map(seccion => (

              <Seccion
                seccion={seccion}
                key={seccion.idSeccion}
                editarSeccion={editarSeccion}
                eliminarSeccion={eliminarSeccion}
              />
            ))
          }

        </Grid>
      </Box>



      <Modal open={isOpenEditar} closeModal={closeModalEditar}>
        <ModalEditarSeccion seccion={seccion!} closeModal={closeModalEditar} />
      </Modal>

      <Modal open={isOpenEliminar} closeModal={closeModalEliminar}>
        <ModalEliminarSeccion seccion={seccion!} closeModal={closeModalEliminar} />
      </Modal>


    </>
  )
}


