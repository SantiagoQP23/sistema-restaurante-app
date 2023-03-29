import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PrivateRoutes } from '../../../../models/routes.model';

const Menu = lazy(() => import('../Menu.page'))

export const MenuRouter: RouteObject = {

  path: PrivateRoutes.MENU,
  element: <Menu />

}