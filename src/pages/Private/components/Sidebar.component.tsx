import React, { useContext } from 'react';

import { Box, Divider, Drawer, Hidden, styled, Toolbar } from '@mui/material';


import { Scrollbars } from 'react-custom-scrollbars-2';

import { Logo, SidebarMenu } from '.';
import { UiContext } from '../../../context';


const drawerWidth = 300;


const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position: fixed;
            z-index: 10;
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);



export const Sidebar = () => {

  const { handleDrawerToggle, mobileOpen } = useContext(UiContext);

  return (
    <>

      <Hidden lgDown>
        <SidebarWrapper>

          <TopSection>
            <Logo />
          </TopSection>
          <SidebarMenu />
        </SidebarWrapper>
      </Hidden>

      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant="temporary"
          elevation={9}
        >
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Logo />
              </TopSection>
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>


    </>



    /*   <Box
        component="nav"
        sx={{
          width: { md: drawerWidth }, flexShrink: { md: 0 },
  
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: '#e5eef9', },
  
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: '#e5eef9', },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box> */
  )
}
