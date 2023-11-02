import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material/";

import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from "../../Private/layouts/SidebarLayout/components";

export const AppBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <MuiAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
              <ButtonTheme />

              <Button
                onClick={() => navigate("/auth/login")}
                variant="contained"
                size="small"
              >
                Iniciar sesión
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </>
  );
};
