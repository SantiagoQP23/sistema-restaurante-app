import { FC, ReactNode, useContext } from 'react';
import { Box, alpha, lighten, useTheme, Breadcrumbs, Link, Stack, Typography, Divider, styled, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar.component';
import Header from './Header/Header.component';
import { BreadcrumbsRouter } from './BreadcrumbsRouter.component';
import { ValidRoles } from '../../router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../redux';
import { UnauthorizedPage } from '../../../Status/Unauthorized.page';
import { SidebarContext } from '../../Common/contexts/SidebarContext';

interface SidebarLayoutProps {
  children?: ReactNode;
  allowedRoles?: string[];
}

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: theme.header.height,
  // padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));





const SidebarLayout: FC<SidebarLayoutProps> = ({ }) => {
  const theme = useTheme();

  const {open } = useContext(SidebarContext );

  const { user } = useSelector(selectAuth);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          // flex: 1,
          // height: '100%',

         /*  '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(1)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`
          } */
        }}
      >
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            width: '100%',
            pt: `${theme.header.height}`,
            // [theme.breakpoints.up('lg')]: {
            //   ml: `${theme.sidebar.width}`
            // }
          }}
        >

        {/* <Main open={open} > */}

          {/* <Box component="main" sx={{ 
            pt: (theme) => theme.header.height,  
            zIndex: 5,
            display: 'block',
            flex: 1,
            }}> */}
            {/* <BreadcrumbsRouter /> */}
            <Outlet />

            </Box>

            {/* {
                user && allowedRoles.includes(user.role.name) 
                ? <Outlet />
                : <UnauthorizedPage />

              } */}
         

        {/* </Main> */}
        {/* <Divider />

        <Stack spacing={2}>
          <Typography variant="h6" textAlign='center' mt={2} > Desarrollado por Santiago Quirumbay </Typography>

        </Stack> */}
      </Box>
    </>
  );
};

export default SidebarLayout;
