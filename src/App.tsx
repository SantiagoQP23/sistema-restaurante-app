import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@mui/material'

import { themeCreator } from './themes/base';

import { AppRouter } from './routers';




function App() {
  const theme = themeCreator("NebulaFighterTheme");

  return (


    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Suspense fallback={<>Loading...</>}>

        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>

      </Suspense>

    </ThemeProvider>

  )
}

export default App
