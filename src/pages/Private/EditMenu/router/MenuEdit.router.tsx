import { lazy } from 'react';

import { RouteObject } from "react-router-dom";

import { PrivateRoutes } from "../../../../models";
import { EditSections, EditSection, EditCategories, EditCategory, EditProducts } from "../components";
import { EditProduct } from "../components/products/EditProduct.component";


const EditMenu = lazy(() => import('../EditMenu.page'))




export const MenuEditRouter: RouteObject =
{
  path: PrivateRoutes.MENU_EDIT,
  element: <EditMenu/>,
  children: [

    {
      path: '',
      element: <EditSections />,

    },
    {
      path: 'seccion',
      element: <EditSection />,

    },
    {
      path: ':nameSection',
      element: <EditCategories />,

    },
    {
      path: 'category',
      element: <EditCategory />,

    },
    {
      path: ':nameSection/:nameCategory',
      element: <EditProducts />
    },
    {
      path: 'product',
      element: <EditProduct />,

    },


  ]

}
