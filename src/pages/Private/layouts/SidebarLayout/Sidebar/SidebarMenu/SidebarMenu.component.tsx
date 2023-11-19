import { FC, useContext, useState } from "react";

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import { SidebarContext } from "../../../../Common/contexts/SidebarContext";

import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";

import { useSelector } from "react-redux";
import { selectAuth } from "../../../../../../redux";
import { Typography } from "@mui/material";
import {
  navItemsAdmin2,
  navItemsManagement,
  navItemsOrders,
  navItemsAdmin,
  NavItem,
} from "../../models";

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

export interface NavItemButtonProps {
  item: NavItem;
}

export const NavItemButton: FC<NavItemButtonProps> = ({ item }) => {
  const { closeSidebar, open, toggleSidebar } = useContext(SidebarContext);

  return (
    <ListItem component="div" key={item.to}>
      <ListItemButton
        disableRipple
        component={RouterLink}
        onClick={closeSidebar}
        to={item.to}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          "&.active": {
            color: "text.primary",
            bgcolor: "action.selected",
            fontWeight: "fontWeightBold",
          },
        }}
        end
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>

        <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

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
            transition: ${theme.transitions.create(["color"])};

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
                  "transform",
                  "opacity",
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

function SidebarMenu() {
  const { closeSidebar, open, toggleSidebar } = useContext(SidebarContext);

  const [openOrders, setOpenOrders] = useState(true);

  const [openMenuRestaurant, setOpenMenuRestaurant] = useState(true);

  const handleOpenOrders = () => {
    setOpenOrders(!openOrders);
  };

  const handleOpenMenuRestaurant = () => {
    setOpenMenuRestaurant(!openMenuRestaurant);
  };

  const { user } = useSelector(selectAuth);

  const navigate = useNavigate();

  return (
    <>
      <MenuWrapper>
        {/* <List component="div">
          <SubMenuWrapper>
            <List component="div">

             

            </List>
          </SubMenuWrapper>
        </List> */}

        <List
          component="div"
          subheader={
            open && (
              <ListSubheader component="div" disableSticky>
                <Typography color="text.primary">GENERAL</Typography>
              </ListSubheader>
            )
          }
          sx={{
            mt: 1,
          }}
        >
          <SubMenuWrapper>
            <List component="div">
              {navItemsAdmin.map((item, index) => (
                <NavItemButton key={index} item={item} />
              ))}
            </List>
          </SubMenuWrapper>
        </List>

        <List
          component="div"
          subheader={
            open && (
              <ListSubheader component="div" disableSticky>
                <Typography color="text.primary">PEDIDOS</Typography>
              </ListSubheader>
            )
          }
        >
          <SubMenuWrapper>
            <List component="div">
              {/* <ListItem disablePadding>
                <ListItemButton
                  onClick={handleOpenOrders}

                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}

                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <TableChartTwoToneIcon />
                  </ListItemIcon>


                  <ListItemText primary={"Pedidos"} sx={{ opacity: open ? 1 : 0 }} />

                  {
                    open
                      ? openOrders ? <ExpandLess /> : <ExpandMore />
                      : null

                  }

                </ListItemButton>

              </ListItem> */}

              <Collapse in={openOrders}>
                {navItemsOrders.map((item, index) => (
                  <ListItem component="div" key={item.to}>
                    <ListItemButton
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to={item.to}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        "&.active": {
                          color: "text.primary",
                          bgcolor: "action.selected",
                          fontWeight: "fontWeightBold",
                        },
                      }}
                      end
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            </List>
          </SubMenuWrapper>
        </List>

        <List
          component="div"
          subheader={
            open && (
              <ListSubheader component="div" disableSticky>
                <Typography color="text.primary">Administración</Typography>
              </ListSubheader>
            )
          }
        >
          <SubMenuWrapper>
            <List component="div">
              {navItemsManagement.map((item, index) => (
                <ListItem component="div" key={item.to}>
                  <ListItemButton
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={item.to}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      "&.active": {
                        color: "text.primary",
                        bgcolor: "action.selected",
                        fontWeight: "fontWeightBold",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}

              {user &&
                user.role.name === "admin" &&
                navItemsAdmin2.map((item, index) => (
                  <ListItem component="div" key={item.to}>
                    <ListItemButton
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to={item.to}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        "&.active": {
                          color: "text.primary",
                          bgcolor: "action.selected",
                          fontWeight: "fontWeightBold",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
