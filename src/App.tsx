import { Suspense, lazy } from 'react';

import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { CssBaseline } from '@mui/material'

import { selectAuth } from './redux';


import ThemeProvider from './theme/ThemeProvider';
import { SuspenseLoader } from './components/ui/';

import { AppRouter } from './routers';


function App() {

  const { status } = useSelector(selectAuth);

  return (


    <ThemeProvider >

      <Suspense fallback={<SuspenseLoader />}>
        <CssBaseline />

        <BrowserRouter >

          {
            // status === 'checking'
            // ? <SuspenseLoader />
            // : <AppRouter />

          }
          <AppRouter />

        </BrowserRouter>

      </Suspense>

    </ThemeProvider>

  )
}

export default App
