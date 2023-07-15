import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { PrivateRoutes } from "../../../../models";
import { BalanceDashboard } from "../views/BalanceDashboard/BalanceDashboard.component";
import { Expenses } from "../views/Expenses/Expenses.view";
import { Incomes } from "../views/Incomes/Incomes.view";
import { CashRegisterList } from "../views/CashResgiterList/CashRegisterList.view";
import { CashRegister } from "../views/CashRegister/CashRegister.view";



const Balance = (lazy(() => import('../Balance.page')))


export const BalanceRouter: RouteObject = {

  path: PrivateRoutes.BALANCE,
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