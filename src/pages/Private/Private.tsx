import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"

import { RoutesWithNotFound } from "../../helpers"
import { PrivateRoutes } from "../../models"
import { Layout } from "./components"


const Menu = lazy(() => import('./Menu/Menu.page'))
const Orders = lazy(() => import('./Orders/Orders.page'))


export const Private = () => {
  return (
    <Layout>

      <RoutesWithNotFound>

        <Route  path={PrivateRoutes.MENU} element={<Menu />}></Route>

        <Route path={PrivateRoutes.ORDERS} element={<Orders />}></Route>
        
        <Route path='/' element={<Navigate to={PrivateRoutes.MENU} />}></Route>


      </RoutesWithNotFound>

    </Layout>
  )
}

export default Private;