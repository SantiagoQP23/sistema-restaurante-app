import React, { FC } from 'react';

import { AppBar, Box, CssBaseline, styled, Toolbar } from '@mui/material';

import { Sidebar } from './Sidebar.component';
import { Header } from './Header.component';
import { UiContext } from '../../../context/UiContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.minimal.css';

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 300;


const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};


export const Layout: FC<Props> = ({ children }) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <UiContext.Provider value={{ mobileOpen, handleDrawerToggle }}>

        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },

          }}

        >
          <Header />
        </AppBar>

        <Sidebar />
      </UiContext.Provider>

      <MainWrapper>
        <MainContent>
          {children}
          <ToastContainer

           
            position="bottom-left"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            

          />

        </MainContent>
      </MainWrapper>
    </Box>


  );
  {/*  <Box
   component="main"
   sx={{
     flexGrow: 1,
     p: 3,
     width: { lg: `calc(100% - ${drawerWidth}px)` },
     minHeight: '100vh',
     background: 'linear-gradient(311deg, rgba(227,239,247,1) 5%, rgba(229,238,249,1) 57%, rgba(220,231,244,1) 100%)',
     marginTop: '100px'
   }}


 >
   <Toolbar />
   {children}

 </Box> 
*/}
}


