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

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';

  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const setNameTheme = useContext(ThemeContext);

  const handleTheme = (
    event: React.MouseEvent<HTMLElement>,
    newTheme: string | null,
  ) => {
    if (newTheme !== null) {
      setNameTheme(newTheme);
    }
  };

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

            <Typography variant='h4' color='white' align='center'>Restaurante</Typography>
            <Typography variant='h3' color='white' align='center'>Doña Yoli</Typography>

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

          <ToggleButtonGroup

            onChange={handleTheme}
            exclusive
            value={curThemeName}
          >
            <ToggleButton value="PureLightTheme">
              <LightMode />
            </ToggleButton>
            <ToggleButton value={"NebulaFighterTheme"}>
              <DarkMode />
            </ToggleButton>
            <Typography variant='body1' align='center'> Desarrollado por <b>Santiago Quirumbay</b></Typography>
          </ToggleButtonGroup>



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
              {/* <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <LogoSign />
              </Box> */}
              <Typography variant='h3' color='white' align='center'>Restaurante</Typography>
              <Typography variant='h3' color='white' align='center'>Doña Yoli</Typography>
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

              <ToggleButtonGroup

                onChange={handleTheme}
                exclusive
                value={curThemeName}
              >
                <ToggleButton value="PureLightTheme">
                  <LightMode />
                </ToggleButton>
                <ToggleButton value={"NebulaFighterTheme"}>
                  <DarkMode />
                </ToggleButton>
                <Typography variant='body1' align='center'> Desarrollado por <b>Santiago Quirumbay</b></Typography>
              </ToggleButtonGroup>

            </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
