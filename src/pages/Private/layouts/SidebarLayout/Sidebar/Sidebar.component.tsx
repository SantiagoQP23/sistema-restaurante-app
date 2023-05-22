import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';

import logo from '../../../../../assets/logo3.png'

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Tooltip,
  Typography
} from '@mui/material';

import SidebarMenu from './SidebarMenu/SidebarMenu.component';
import { LogoSign, Scrollbar } from '../../../components';
import { ToggleButtonGroup, ToggleButton, Card } from '@mui/material';
import { DarkMode, JoinFullSharp, LightMode } from '@mui/icons-material';
import { ThemeContext } from '../../../../../theme/ThemeProvider';
import Userbox from '../Header/components/Userbox.component';
import { useNavigate } from 'react-router-dom';

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


const Title = () => {
  return (
    <>
      {/* Logo del restaurante */}
      <Box
        display='flex'
        alignItems='center'
        gap={2}
      >

        <img src={logo} alt='logo' width='70px' style={{ borderRadius: 8 }} />


        <Box>

          <Typography variant='subtitle1' color='white' >Restaurante</Typography>
          <Typography variant='h4' color='white' >Doña Yoli</Typography>
        </Box>
      </Box>

    </>
  )
}


export const BoxUser = ({onClick}: {onClick: () => void}) => {

  const theme = useTheme();


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
    <Typography variant='h6' textAlign='center' >Santiago Quirumbay</Typography>
    <Typography variant='body1' textAlign='center'>Administrador</Typography>
  </Box>
  )
}



function Sidebar() {
  const { sidebarToggle, toggleSidebar, closeSidebar } = useContext(SidebarContext);

  const navigate = useNavigate();


  
  const theme = useTheme();

  const navigateAccount = () => {
    navigate('/users/account');
    closeSidebar();
  }


  return (
    <>
      <SidebarWrapper
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
      >
        <Scrollbar
          height={'100%'}
        >
          <Box mx={2} my={1}>




            {/* <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <LogoSign />
            </Box> */}

            <Title />

          </Box>

          <BoxUser onClick={navigateAccount} />

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
        <Box p={2} textAlign='center'>

          <Typography>Desarrollado por </Typography>
          <Typography variant='h5' >Santiago Quirumbay</Typography>




        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar
            height={'100%'}
          >
            <Box mx={2} my={1}>

              <Title />


            </Box>




            {/* <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            /> */}

            <BoxUser onClick={navigateAccount} />

            <SidebarMenu />

          </Scrollbar>

          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          <Box p={1} textAlign='center' >

            <Typography>Desarrollado por </Typography>
            <Typography variant='h5' >Santiago Quirumbay</Typography>

          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
