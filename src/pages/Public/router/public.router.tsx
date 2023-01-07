import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { PublicRoutes } from "../../../models";


const LoginPage = lazy(() => import('../pages/Login/Login.page'))
const SignupPage = lazy(() => import('../pages/Signup/Signup.page'))

export const PublicRouter: RouteObject[] = [


  
  {
    path: PublicRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PublicRoutes.SIGNUP,
    element: <SignupPage />,
  },
  

]