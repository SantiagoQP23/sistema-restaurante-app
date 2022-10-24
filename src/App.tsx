import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material'


import { AppRouter } from './routers';
import { SuspenseLoader } from './components/ui/';
import ThemeProvider from './theme/ThemeProvider';




function App() {

  return (


    <ThemeProvider >

      <Suspense fallback={<SuspenseLoader />}>
        <CssBaseline />

        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>

      </Suspense>

    </ThemeProvider>

  )
}

export default App
