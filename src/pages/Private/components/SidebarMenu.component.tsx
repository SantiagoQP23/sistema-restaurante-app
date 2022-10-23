import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { List, ListItemIcon, ListItemText, Box, ListItemButton, Avatar, Divider, styled, ListSubheader } from '@mui/material/';
import { Assessment, Home, ReceiptLong, RestaurantMenu, Timer } from '@mui/icons-material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { FC, useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { selectAuth } from '../../../redux';
import { Button, ListItem, alpha } from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';

interface IMenuItem {
  text: string;
  to: string;
  icon: () => ReactJSXElement;
  secondary?: string;
}



interface IMenu {
  subheader?: string;
  items: IMenuItem[]

}


const menu: IMenu[] = [
  {
    items: [
      {
        text: "Menú",
        to: "/menu",
        icon: () => <RestaurantMenu />,

      },

    ]
  },
  {
    subheader: 'Pedidos',
    items: [

      {
        text: "Pedidos",
        to: "/ordersss",
        icon: () => <ReceiptLong />,

      },

      {
        text: "Pedidos pendientes",
        to: "/orderss/actives",
        icon: () => <Timer />,

      },
    ]
  },
  {
    subheader: 'Administrador',
    items: [

      {
        text: "Editar menú",
        to: "/menu/edit",
        icon: () => <ReceiptLong />,

      },

      {
        text: "Usuarios",
        to: "/users",
        icon: () => <Timer />,

      },
    ]
  },



]




const routesAdmin: IMenuItem[] = [
  {
    text: "Editar menú",
    to: "/menu/editar",
    icon: () => <RestaurantMenu />,

  },
  {
    text: "Reportes",
    to: "/reportes",
    icon: () => <Assessment />,

  },
  {
    text: "Usuarios",
    to: "/usuarios",
    icon: () => <GroupOutlinedIcon />,

  },

]



const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);


export function SidebarMenu() {

  const { user, status } = useAppSelector(selectAuth);


  return (
    <>

      <MenuWrapper>
        {
          menu.map((submenu, i) => (

            <List
              key={i}
              component="div"
              subheader={
                submenu.subheader && <ListSubheader component="div" disableSticky>
                  {submenu.subheader}
                </ListSubheader>
              }
            >
              <SubMenuWrapper>
                <List component="div">
                  {
                    submenu.items.map(item => (
                      <ListItem component="div" key={item.to}>
                        <Button
                          disableRipple
                          component={RouterLink}
                          // onClick={closeSidebar}
                          to={item.to}
                          startIcon={item.icon()}
                        >
                          {item.text}
                        </Button>
                      </ListItem>

                    ))
                  }

                </List>
              </SubMenuWrapper>
            </List>
          ))
        }

      </ MenuWrapper>
    </>
  )
}

