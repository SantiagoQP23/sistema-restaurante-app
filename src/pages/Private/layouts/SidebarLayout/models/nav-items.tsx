import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import {
  AccountBalanceWallet,
  Assignment,
  ListAlt,
  MenuBook,
  ReceiptLong,
  SoupKitchen,
  Storefront,
} from "@mui/icons-material";

export interface NavItem {
  title: string;
  icon: JSX.Element;
  to: string;
  label?: string;
}

export const navItemsAdmin: NavItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    to: "/reports",
  },
  {
    title: "Balance",
    icon: <AccountBalanceWallet />,
    to: "/balance",
  },
];

export const navItemsOrders: NavItem[] = [
  {
    title: "Pedidos",
    icon: <Assignment />,
    to: "/orders/",
  },
  {
    title: "Cocina",
    icon: <SoupKitchen />,
    to: "/orders/actives",
  },
  {
    title: "Lista de pedidos",
    icon: <ListAlt />,
    to: "/orders/list",
  },
  {
    title: "Comprobantes",
    icon: <ReceiptLong />,
    to: "/invoices",
  },
];

export const navItemsManagement: NavItem[] = [
  {
    title: "Menú del restaurante",
    icon: <MenuBook />,
    to: "/menu/edit",
  },
  {
    title: "Gestión de mesas",
    icon: <TableRestaurantOutlinedIcon />,
    to: "/tables",
  },
  {
    title: "Gestión de clientes",
    icon: <Groups3OutlinedIcon />,
    to: "/clients",
  },
  // {
  //   title: 'Proveedores',
  //   icon: <LocalShipping />,
  //   to: '/suppliers'
  // }
];

export const navItemsAdmin2: NavItem[] = [
  {
    title: "Gestión de usuarios",
    icon: <PeopleOutlineIcon />,
    to: "/users",
  },
  {
    title: "Restaurante",
    icon: <Storefront />,
    to: "/restaurant",
    label: "Nuevo",
  },
];
