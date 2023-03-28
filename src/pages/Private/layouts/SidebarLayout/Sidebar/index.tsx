import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';

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

import SidebarMenu from './SidebarMenu';
import { LogoSign, Scrollbar } from '../../../components';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { DarkMode, JoinFullSharp, LightMode } from '@mui/icons-material';
import { ThemeContext } from '../../../../../theme/ThemeProvider';
import Userbox from '../Header/Userbox';

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
      <Typography variant='h5' color='white' align='center'>Restaurante</Typography>
      <Typography variant='h3' color='white' align='center'>Doña Yoli</Typography>
      <Typography variant='subtitle2'  align='center'>v0.1.0</Typography>
    </>
  )
}



function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);


  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();


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
        <Scrollbar>
          <Box mt={3}>
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



          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10]
          }}
        />
        <Box p={2}>



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
          <Scrollbar>
            <Box mt={3}>

              <Title />


            </Box>




            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
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
