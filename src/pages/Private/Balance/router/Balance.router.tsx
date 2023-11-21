import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { PrivateRoutes } from "../../../../models";
import { BalanceDashboard } from "../views/BalanceDashboard/BalanceDashboard.component";
import { Expenses } from "../views/Expenses/Expenses.view";
import { Incomes } from "../views/Incomes/Incomes.view";
import { CashRegisterList } from "../views/CashResgiterList/CashRegisterList.view";
import { CashRegister } from "../views/CashRegister/CashRegister.view";
import { CloseCashRegister } from "../views/CloseCashRegister/CloseCashRegister.view";



const Balance = lazy(() => import('../Balance.page'))


export const BalanceRouter: RouteObject = {

  path: '',
  element: <Balance />,
  children: [
    {
      path: '',
      element: <BalanceDashboard />
    },
    {
      path: PrivateRoutes.INCOMES,
      element: <Incomes />

    },
    {
      path: PrivateRoutes.EXPENSES,
      element: <Expenses />
    },
    {
      path: 'close',
      element: <CloseCashRegister />
    },
    {
      path: 'cash-register',
      element: <CashRegisterList />, 
      children: [
      ]
    }, 
    
    {
      path:'cash-register/:cashRegisterId',
      element: <CashRegister />
    }




  ]

}