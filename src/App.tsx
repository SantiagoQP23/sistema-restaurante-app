import { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import ThemeProvider from "./theme/ThemeProvider";
import { SuspenseLoader } from "./components/ui/";

import { AppRouter } from "./routers";

import "./styles/global-styles.css";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<SuspenseLoader />}>
        <CssBaseline />

        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
