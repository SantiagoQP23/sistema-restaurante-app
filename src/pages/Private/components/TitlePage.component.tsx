import { FC } from "react"

import { Box, Typography, Stack, Breadcrumbs } from '@mui/material';

import Link, { LinkProps } from '@mui/material/Link';

import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router-dom';
import { CircleRounded } from "@mui/icons-material";


const breadcrumbNameMap: { [key: string]: string } = {
  '/orders': 'Pedidos',
  '/orders/edit': 'Editar',
  '/orders/add': 'Nuevo pedido',
  '/orders/add/menu': 'Productos',
  [`/orders/edit/:id`]: 'id',
  '/orders/edit/ljasd/receipt': 'Comprobante',
  '/orders/actives': 'Activos',
  '/orders/menu': 'Nuevo pedido',
  '/drafts': 'Drafts',
  '/menu': 'Menú',
  '/menu/edit': 'Editar',
  '/menu/edit/seccion': 'Seccion',
  '/menu/edit/category': 'Categoría',
  '/menu/edit/product': 'Producto',
  '/users': 'Usuarios',
  '/users/edit': 'Editar',
  '/users/add': 'Nuevo usuario',
  '/tables': 'Mesas',
  '/tables/edit': 'Editar',
  '/tables/add': 'Nueva mesa',
};


interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}



interface Props {
  title: string,
  action?: React.ReactNode;
}

export const TitlePage: FC<Props> = ({ title, action }) => {

  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter((x) => x);


  return (
    <Stack my={2} direction='row' alignItems='center' justifyContent='space-between'>

      <Stack>
        <Typography variant='h3' >{title}</Typography>
        <Breadcrumbs separator={<CircleRounded sx={{fontSize: 6, color: '#888'}}/>}>
          {pathnames.map((value, index) => {

            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          

            if (breadcrumbNameMap[to]) {

              return last ? (
                <Typography color="text.primary" key={to}>
                  {breadcrumbNameMap[to]}
                </Typography>
              ) : (
                <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                  {breadcrumbNameMap[to]}
                </LinkRouter>
              );

            }
          })}
        </Breadcrumbs>
      </Stack>

      {action}
      {/* <Typography variant='subtitle1'> <b>Menú</b> {" >"} <b>Productos</b> </Typography> */}
    </Stack>

  )
}