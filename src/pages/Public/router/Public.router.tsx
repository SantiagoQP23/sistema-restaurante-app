import { Navigate, RouteObject } from "react-router-dom";
import { Shop } from "../Shop/Shop.page";
import { Login } from "../Auth/Login";
import { Signup } from "../Auth/Signup";
import { ProductsMenu } from "../Shop/views/ProductsMenu/ProductsMenu.view";
import { Product } from "../Shop/views/Product/Product.page";

export const PublicRouter: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "shop",
        element: <Shop />,
        children: [
          {
            path: "menu",
            element: <ProductsMenu />,
          },
          {
            path: "product/:id",
            element: <Product />,
          },
          {
            path: "*",
            element: <Navigate to="/shop/menu" />,
          },
        ]
      },
    ]
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/shop" />,
  },
];
