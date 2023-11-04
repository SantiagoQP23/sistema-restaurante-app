import { useContext } from "react";

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";

import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "../../../Common/contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

import HeaderButtons from "./Buttons";
import HeaderUserbox from "./components/Userbox.component";
import HeaderMenu from "./components/Menu.component";
import { Typography } from "@mui/material";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 300;

// background-color: ${alpha(theme.header.background, 0.95)};
const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "none",
  backdropFilter: "blur(5px)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "transparent",
  border: "none",
  height: theme.header.height,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),

  // [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
  //   // Estilos que se aplicarán cuando se cumpla la media query
  //   left: theme.sidebar.width,
  //   width: 'auto',
  //   // Otros estilos...
  // },
}));

function Header() {
  const { sidebarToggle, toggleSidebar, open, handleDrawerOpen } =
    useContext(SidebarContext);
  const theme = useTheme();

  return (
    // <HeaderWrapper
    //   display="flex"
    //   alignItems="center"
    // >

    <AppBar
      position="fixed"
      open={open}

      // sx={{
      //   boxShadow:
      //     theme.palette.mode === 'dark'
      //       ? `0 1px 0 ${alpha(
      //           lighten(theme.colors.primary.main, 0.7),
      //           0.15
      //         )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
      //       : `0px 2px 8px -3px ${alpha(
      //           theme.colors.alpha.black[100],
      //           0.2
      //         )}, 0px 5px 22px -4px ${alpha(
      //           theme.colors.alpha.black[100],
      //           0.1
      //         )}`
      // }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={1}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
          spacing={2}
        >
          <HeaderMenu />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <HeaderButtons />
          <HeaderUserbox />
          <Box
            component="span"
            sx={{
              display: { lg: "none", xs: "inline-block" },
            }}
          >
            <Tooltip arrow title="Toggle Menu">
              <IconButton
                color="primary"
                onClick={() => {
                  toggleSidebar();
                  // handleDrawerOpen();
                }}
              >
                {!sidebarToggle ? (
                  <MenuTwoToneIcon fontSize="small" />
                ) : (
                  <CloseTwoToneIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    </AppBar>
  );
}

{
  /* // </HeaderWrapper> */
}
export default Header;
