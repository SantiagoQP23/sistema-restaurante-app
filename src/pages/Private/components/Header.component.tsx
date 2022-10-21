import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';




/* Components */
import { Badge, Box, IconButton, styled, Toolbar, Typography } from '@mui/material';

/* Icons */
import { Menu, Notifications, Logout, AccountCircle } from '@mui/icons-material';


import { UiContext } from '../../../context';
import { useAppDispatch } from '../../../hooks';
import { Userbox } from './Userbox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export const Header = () => {

  const dispatch = useAppDispatch();

  const { handleDrawerToggle } = useContext(UiContext);


  const cerrarSesion = () => {
    /* Swal.fire({
      title: '¿Quieres salir de la aplicacion?',
      showCancelButton: true,
      confirmButtonText: 'Cerrar Sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startLogout());

      }
    }) */
  }

  return (

    <HeaderWrapper display="flex" alignItems="center">

      <IconButton
        color="inherit"
        aria-label="menu"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { xs: 'block', lg: 'none' } }}
      >
        <Menu />
      </IconButton>



      <Typography variant='h3' component='div'>Restaurante</Typography>
      <Box sx={{ flexGrow: 1 }}></Box>

      <IconButton aria-label={notificationsLabel(100)} >
        <Badge badgeContent={5} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>

      <Userbox />

    </HeaderWrapper>


  )
}
