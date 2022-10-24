import React, { useState, useEffect } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material UI
import { Typography, Box, Grid, Button } from '@mui/material/'

// Iconos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { useContext } from 'react';
import { MenuContext } from '../../../../context/MenuContext';

// Component
import { Category } from './Category.component';


import { ICategory } from '../../../../models/menu.model';
import { PrivateRoutes } from '../../../../models';


export function EditCategories() {


  const navigate = useNavigate();

  const { activeSection, categories } = useContext(MenuContext);
 
  // La categoria que se va a editar en el modal
  const [categoria, setCategoria] = useState<ICategory | null>(null);
  /* 
    const { isOpen: isOpenEditar, handleClickOpen: openModalEditar, handleClose: closeModalEditar } = useModal(false);
    const { isOpen: isOpenEliminar, handleClickOpen: openModalEliminar, handleClose: closeModalEliminar } = useModal(false);
   */



  const editarCategoria = (categoria: ICategory | null) => {

    /*   setCategoria(categoria);
      openModalEditar(); */
  }


  const eliminarCategoria = (categoria: ICategory) => {
    /*  setCategoria(categoria);
     openModalEliminar(); */
  }

  const backRoute = () => {
    navigate(-1);
  }


  useEffect(() => {

    if(!activeSection)
      navigate(`/${PrivateRoutes.MENU_EDIT}` )

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


        <Typography align="center" variant="h6" color="initial">{activeSection?.name}</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => editarCategoria(null)}>
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
                nombreSeccion={categoria.section.name!}
                editarCategoria={editarCategoria}
                eliminarCategoria={eliminarCategoria}
              />

            ))
          }
        </Grid>

      </Box>

{/* 
      <Button variant="outlined" startIcon={<ArrowBackIcon />} >Atras
      </Button>
 */}


      {/*   <Modal open={isOpenEditar} closeModal={closeModalEditar}>
        <ModalEditarCategoria
          categoria={categoria}
          closeModal={closeModalEditar}
        />
      </Modal>

      <Modal open={isOpenEliminar} closeModal={closeModalEliminar}>
        <ModalEliminarCategoria
          categoria={categoria!}
          closeModal={closeModalEliminar}

        />
      </Modal> */}





    </>
  )
}


