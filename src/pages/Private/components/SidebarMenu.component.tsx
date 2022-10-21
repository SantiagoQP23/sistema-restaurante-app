import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { List, ListItemIcon, ListItemText, Box, ListItemButton, Avatar, Divider } from '@mui/material/';
import { Assessment, Home, ReceiptLong, RestaurantMenu, Timer } from '@mui/icons-material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { FC, useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { selectAuth } from '../../../redux';


interface IRoute {
  text: string;
  path: string;
  icon: () => ReactJSXElement;
  secondary?: string;
}

const routes: IRoute[] = [
  {
    text: "Inicio",
    path: "/inicio",
    icon: () => <Home />,
    

  },
  {
    text: "Menú",
    path: "/menu",
    icon: () => <RestaurantMenu />,

  },
  {
    text: "Pedidos",
    path: "/pedidos",
    icon: () => <ReceiptLong />,

  },
  
  {
    text: "Pedidos pendientes",
    path: "/pedidos/pendientes",
    icon: () => <Timer />,

  },
]


const routesAdmin: IRoute[] = [
  {
    text: "Editar menú",
    path: "/menu/editar",
    icon: () => <RestaurantMenu />,
    
  },
  {
    text: "Reportes",
    path: "/reportes",
    icon: () => <Assessment />,
  
  },
  {
    text: "Usuarios",
    path: "/usuarios",
    icon: () => <GroupOutlinedIcon />,
  
  },

]

export function SidebarMenu() {

  const { user, status } = useAppSelector(selectAuth);


  const usuarioRoute = {
    text: "usuario!.nombres",
    path: "perfil",
    icon: () => <Avatar alt={"usuario!.nombres"} src="/" />,
    secondary: "usuario!.cargo.nombreCargo"

  }

  return (
    <>
      <Box
        sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
      >
        <List
          component='nav'
          aria-label=''
        >

          <Item key={1} route={usuarioRoute} />
          <Divider />
          {

            routes.map((route, i) => (
              <Item

                key={i}
                route={route}
              />
              
            ))
          }
          <Divider />
          {/* {
            usuario!.cargo.idCargo === 1 && routesAdmin.map((route, i) => (
              <Item
                key={i}
                route={route}
              />
              
            ))
            
          } */}


        </List>
      </Box>
    </>
  )
}

interface Props {
  route: IRoute;

}

const Item: FC<Props> = ({ route }) => {

  const navigate = useNavigate();

  return (
    <ListItemButton

      sx={{ minHeight: 55, width: '100%', }}
      onClick={() => navigate(route.path)}
    >
      <ListItemIcon

      >
        {route.icon()}
      </ListItemIcon>

      <ListItemText
        primary={route.text}
        secondary={route.secondary ? route.secondary : false}

      />
    </ListItemButton>
  );
}
