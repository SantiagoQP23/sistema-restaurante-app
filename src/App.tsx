import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material'


import { AppRouter } from './routers';
import { SuspenseLoader } from './components/ui/';
import ThemeProvider from './theme/ThemeProvider';
import { useSelector } from 'react-redux';
import { selectAuth } from './redux';




function App() {

  const { status } = useSelector(selectAuth);

  return (


    <ThemeProvider >

      <Suspense fallback={<SuspenseLoader />}>
        <CssBaseline />

        <BrowserRouter>
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
