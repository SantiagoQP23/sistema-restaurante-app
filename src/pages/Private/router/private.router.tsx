import { Navigate, RouteObject } from "react-router-dom";

import SidebarLayout from "../layouts/SidebarLayout/SidebarLayout.component";

import { PrivateRoutes } from "../../../models";
import { OrderRouter } from "../Orders/router";
import { MenuEditRouter } from "../EditMenu/router/MenuEdit.router";
import { ClientsRouter } from "../Clients/router/Clients.router";
import { TablesRouter } from "../Tables/router/Tables.router";
import { UsersRouter } from "../Users/router/Users.router";
import { ReportsRouter } from "../Reports/router/Reports.router";
import { BalanceRouter } from "../Balance/router/Balance.router";
import { SuppliersRouter } from "../Suppliers/router/Suppliers.router";
import { InvoiceRouter } from "../Invoices/router/Invoice.router";

export const PrivateRouter: RouteObject[] = [
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      // MenuRouter,
      OrderRouter,
      InvoiceRouter,
      MenuEditRouter,
      ClientsRouter,
      TablesRouter,
      UsersRouter,
      ReportsRouter,
      BalanceRouter,
      SuppliersRouter,
      {
        path: "/auth/login",
        element: <Navigate to={PrivateRoutes.MENU} />,
      },
      {
        path: "",
        element: <Navigate to={PrivateRoutes.MENU} />,
      },
      {
        path: "menu",
        element: <Navigate to={PrivateRoutes.MENU} />,
      },
      {
        path: "*",
        element: <Navigate to={PrivateRoutes.MENU} />,
      },
    ],
  },
];

//   {
//     path: '/',
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
//     children: [
//       {
//         path: '',
//         element: <Navigate to='/menu' />
//       },
//     ],

//   },
//   {
//     path: '/auth/login',
//     element: <Navigate to='/menu' />
//   },
//   {
//     path: PrivateRoutes.MENU,
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
//     children: [
//       {
//         path: '',
//         element: <Menu />
//       },

//     ]
//   },
//   {
//     path: PrivateRoutes.MENU_EDIT,
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
//     children: [
//       {
//         path: '',
//         element: <EditMenu />,
//         children: [

//           {
//             path: '',
//             element: <EditSections />,

//           },
//           {
//             path: 'seccion',
//             element: <EditSection />,

//           },
//           {
//             path: ':nameSection',
//             element: <EditCategories />,

//           },
//           {
//             path: 'category',
//             element: <EditCategory />,

//           },
//           {
//             path: ':nameSection/:nameCategory',
//             element: <EditProducts />
//           },
//           {
//             path: 'product',
//             element: <EditProduct />,

//           },

//         ]

//       },

//     ]
//   },

//   {
//     path: PrivateRoutes.CLIENTS,
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
//     children: [
//       {
//         path: '',
//         element: <Clients />,
//         children: [
//           {
//             path: '',
//             element: <ClientsList />
//           },

//           {
//             path: 'edit',
//             element: <EditClient />
//           },
//           {
//             path: 'add',
//             element: <AddClient />
//           },

//         ]
//       },
//     ]
//   },
//   {
//     path: PrivateRoutes.TABLES,
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
//     children: [
//       {
//         path: '',
//         element: <Tables />,
//         children: [
//           {
//             path: '',
//             element: <ListTables />
//           },
//           {
//             path: 'edit',
//             element: <EditTable />
//           }

//         ]
//       },
//     ]
//   },
//   {
//     path: PrivateRoutes.USERS,
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin]} />,
//     children: [
//       {
//         path: '',
//         element: <Users />,
//         children: [
//           {
//             path: '',
//             element: <UsersList />
//           },
//           {
//             path: 'edit',
//             element: <EditUser />
//           },
//           {
//             path: 'add',
//             element: <AddUser />
//           },
//         ]
//       }

//     ]
//   },
//   {
//     path: PrivateRoutes.REPORTS,
//     element: <SidebarLayout allowedRoles={[ValidRoles.admin]} />,
//     children: [
//       {
//         path: '',
//         element: <Reports />,
//         children: [
//           {
//             path: '',
//             element: <DashboardReports />
//           },
//           {
//             path: 'simulation',
//             element: <AffluenceSimulation />

//           },
//           {
//             path: 'simulator',
//             element: <SimulatorForms />

//           },
//           {
//             path: 'prediction',
//             element: <AffluencePrediction />
//           },
//           {
//             path: 'staff-planning',
//             element: <StaffPlaning />
//           },
//           {
//             path: 'orders',
//             element: <OrdersReports />,
//           },
//           {
//             path: 'orders/receipt',
//             element: <ReceiptOrderReport />
//           },
//           {
//             path: 'incomes',
//             element: <IncomesReports />
//           }
//         ]
//       },

//     ]
//   },
//   {
//     path: '*',
//     element: <Status404 />

//   }
// ]
