import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

//Material UI
import { Typography, Box, Button, Grid, Popover, MenuItem } from '@mui/material/'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'

import { MenuContext } from '../../../../../context/MenuContext';
import { ISection } from '../../../../../models';


import { Section } from './Section.component';
import { useDispatch, useSelector } from 'react-redux';
import { resetActiveSection, selectMenu, setActiveSection } from '../../../../../redux';
import { useModal } from '../../../../../hooks';
import { DeleteSection } from './DeleteSection.component';
import { SectionsTable } from './SectionsTable.component';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';




export const EditSections = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeSection, sections } = useSelector(selectMenu);
  const { isOpen, handleOpen, handleClose } = useModal();

  const [open, setOpen] = useState(null);


  
  const handleOpenMenu = (event: any, section: ISection) => {
    dispatch(setActiveSection(section))
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };




  const createSection = () => {

    dispatch(resetActiveSection())

    navigate('seccion')
  }

  const eliminarSeccion = (seccion: ISection) => {
    handleOpen();
  }

  return (
    <>
      <Box mb={2} display='flex' justifyContent='space-between' alignItems='center'>


        <Box>
          <Typography align='center' variant="h4">Secciones ({sections.length})</Typography>
          <Typography ></Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => createSection()} >
          Añadir
        </Button>

      </Box>

      {/* <Sections/> */}

      {/* <SectionsTable
       /> */}







      <Grid container rowSpacing={1} spacing={1}>

        {
          sections.length === 0 && (
            <Typography variant='h6'>Aún no se han ingresado sections</Typography>
          )
        }
        {
          sections.length > 0 && sections.map(seccion => (
            <Grid key={seccion.id} item xs={12} sm={6} lg={4}>

              <Section
                seccion={seccion}
                eliminarSeccion={eliminarSeccion}
                handleOpenMenu={handleOpenMenu}
              />
            </Grid>
          ))
        }

      </Grid>


      {
        activeSection && <>
          <DeleteSection isOpen={isOpen} closeModal={handleClose} />

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

                navigate(`seccion`);
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
        </>
      }




    </>
  )
}


