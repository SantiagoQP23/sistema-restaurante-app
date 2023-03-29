
import {lazy} from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoutes } from '../../../../models';
import { AffluencePrediction } from '../components/AffluencePrediction/AffluencePrediction.component';
import { AffluenceSimulation } from '../components/AffluenceSimulator/AffluenceSimulation.component';
import { SimulatorForms } from '../components/AffluenceSimulator/SimulatorForms';
import { DashboardReports } from '../components/DashboardReports/DashboardReports.component';
import { IncomesReports } from '../components/IncomesReports/IncomesReports.component';
import { OrdersReports } from '../components/OrdersReports/OrdersReports.component';
import { ReceiptOrderReport } from '../components/OrdersReports/ReceiptOrderReport.component';
import { StaffPlaning } from '../components/StaffPlanning/StaffPlaning.component';


const Reports = lazy(() => import('../Reports.page'));



export const ReportsRouter: RouteObject = {


  path: PrivateRoutes.REPORTS,
  element: <Reports />,
  children: [
    {
      path: '',
      element: <DashboardReports />
    },
    {
      path: 'simulation',
      element: <AffluenceSimulation />

    },
    {
      path: 'simulator',
      element: <SimulatorForms />

    },
    {
      path: 'prediction',
      element: <AffluencePrediction />
    },
    {
      path: 'staff-planning',
      element: <StaffPlaning />
    },
    {
      path: 'orders',
      element: <OrdersReports />,
    },
    {
      path: 'orders/receipt',
      element: <ReceiptOrderReport />
    },
    {
      path: 'incomes',
      element: <IncomesReports />
    }
  ]
}