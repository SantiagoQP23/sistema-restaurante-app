import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';

import logo from '../../../../../assets/logo3.png'

import {
  Box,
  
  alpha,
  
  Divider,
  Button,
  lighten,
  darken,
  Tooltip,
  Typography,
  IconButton,
  Drawer,
  
} from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';


import SidebarMenu from './SidebarMenu/SidebarMenu.component';
import { LogoSign, Scrollbar } from '../../../components';
import { ToggleButtonGroup, ToggleButton, Card } from '@mui/material';
import { ChevronLeft, DarkMode, JoinFullSharp, LightMode } from '@mui/icons-material';
import { ThemeContext } from '../../../../../theme/ThemeProvider';
import Userbox from '../Header/components/Userbox.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../redux';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import SidebarMenuMobile from './SidebarMenuMobile/SidebarMenuMobile.component';


const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const DrawerPersistent = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const Title = ({open}: {open: boolean}) => {
  return (
    <>
      {/* Logo del restaurante */}
      <Box
        display='flex'
        alignItems='center'
        gap={2}
        sx={{
          ml: open ? 3 : 0.75,
        }}
      >

        <img src={logo} alt='logo' width='60px' style={{ borderRadius: 8 }} />


        <Box>

          <Typography variant='subtitle1' color='text.primary' >Restaurante</Typography>
          <Typography variant='h4' color='text.primary' >Doña Yoli</Typography>
        </Box>
      </Box>

    </>
  )
}


export const BoxUser = ({onClick}: {onClick: () => void}) => {

  const theme = useTheme();

  const {user} = useSelector(selectAuth);



  return (
    <Box
    color='inherit'
    onClick={onClick}
 
    sx={{
      mx: 1,
      borderRadius: 1,
      border: '1px solid',
      padding: 1,
      borderColor: theme.colors.alpha.trueWhite[10],
      color: theme.colors.alpha.trueWhite[70],
      '&:hover': {
        borderColor: theme.colors.alpha.trueWhite[50],
        color: theme.colors.alpha.trueWhite[50],
        cursor: 'pointer'
      }

    }}

  >
    <Typography variant='h6' textAlign='center' >{user!.person.firstName} {user!.person.lastName}</Typography>
    <Typography variant='body1' textAlign='center'>{user!.role.name}</Typography>
  </Box>
  )
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  height: theme.header.height,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 300;


function Sidebar() {
  
  const { sidebarToggle, toggleSidebar, closeSidebar, open, handleDrawerClose } = useContext(SidebarContext);

  const navigate = useNavigate();


  
  const theme = useTheme();

  const navigateAccount = () => {
    navigate('/users/account');
    closeSidebar();
  }


  return (
    <>
      {/* <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background!, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      > */}
         <DrawerPersistent
        // sx={{
        //   width: drawerWidth,
        //   flexShrink: 0,
        //   '& .MuiDrawer-paper': {
          //     width: drawerWidth,
          //     boxSizing: 'border-box',
          //   },
          // }}
          variant="permanent"
          sx={{
            display: {
              xs: 'none',
              lg: 'inline-block'
            },
          }}
          
          open={open}
          >

          <DrawerHeader>



            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />

            </IconButton>

          </DrawerHeader>
        <Scrollbar
          height={'100%'}
        >
            {/* <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <LogoSign />
            </Box> */}
            <Box  mt={1}>

            <Title open={open} />

            </Box>
        

          {/* <BoxUser onClick={navigateAccount} /> */}

          {/* <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          /> */}


          {/* <Button
            color='inherit'
            fullWidth
            sx={{
              m: 1,
             
            }}
          >
            <Typography variant='h6' textAlign='left' >Santiago</Typography>
          </Button> */}

          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10]
          }}
        />

        {
          open && 
        <Box p={2} textAlign='center'>

          <Typography>Desarrollado por </Typography>
          <Typography variant='h5' >Santiago Quirumbay</Typography>




        </Box>
        }
      </DrawerPersistent>

      {/* </SidebarWrapper> */}
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
          zIndex: theme.zIndex.drawer + 3
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={10}
      >
        <SidebarWrapper
          // sx={{
          //   background:
          //     theme.palette.mode === 'dark'
          //       ? theme.colors.alpha.white[100]
          //       : darken(theme.colors.alpha.black[100], 0.5)
          // }}
        >
          <Scrollbar
            height={'100%'}
          >
            <Box mx={2} my={1} mt={3}>

              <Title open={open} />


            </Box>




            {/* <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            /> */}

            {/* <BoxUser onClick={navigateAccount} /> */}

            <SidebarMenuMobile />

          </Scrollbar>

          <Divider
           
          />
          <Box p={1} textAlign='center' >

            <Typography color='text.primary'>Desarrollado por </Typography>
            <Typography variant='h5' color='text.primary'>Santiago Quirumbay</Typography>

          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
