import { Suspense } from "react";

import NiceModal from "@ebay/nice-modal-react";

import { BrowserRouter } from "react-router-dom";

import { CssBaseline, IconButton } from "@mui/material";

import { SnackbarProvider, closeSnackbar } from "notistack";
import { CloseTwoTone } from "@mui/icons-material";

import { AppRouter } from "./routers";

import "./styles/global-styles.css";

import ThemeProvider from "./theme/ThemeProvider";

import { SuspenseLoader } from "./components/ui/";
function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        action={(key) => (
          <IconButton
            color="inherit"
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            <CloseTwoTone />
          </IconButton>
        )}
        dense
        style={{
          zIndex: 105500,
        }}
      >
        <NiceModal.Provider>
          <Suspense fallback={<SuspenseLoader />}>
            <CssBaseline />

            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </Suspense>
        </NiceModal.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
