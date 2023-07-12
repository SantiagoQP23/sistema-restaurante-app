import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoutes } from '../../../../models';



const Invoices = lazy(() => import('../Invoices.page'));



export const InvoiceRouter: RouteObject =
{
  path: PrivateRoutes.INVOICES,
  element: <Invoices />,
}