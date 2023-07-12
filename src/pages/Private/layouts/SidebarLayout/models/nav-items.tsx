import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { ExpandLess, ExpandMore, ListAlt, LocalShipping, MonetizationOn, Receipt, TableRestaurant, ViewKanban } from '@mui/icons-material';



export interface NavItem {
  title: string;
  icon: JSX.Element;
  to: string;
}

export const navItemsAdmin: NavItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: <DashboardOutlinedIcon />,
  //   to: '/dashboard'
  // },
  {
    title: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    to: '/reports'
  },
  {
    title: 'Balance',
    icon: <MonetizationOn />,
    to: '/balance'
  },

]

export const navItemsOrders: NavItem[] = [
  {
    title: 'Mesas',
    icon: <TableRestaurant />,
    to: '/orders/'
  },
  {
    title: 'Pedidos Activos',
    icon: <ViewKanban />,
    to: '/orders/actives'
  },
  {
    title: 'Lista de pedidos',
    icon: <ListAlt />,
    to: '/orders/list',

  },
  {
    title: 'Comprobantes',
    icon: <Receipt />,
    to: '/invoices',

  },

]

export const navItemsManagement: NavItem[] = [
  {
    title: 'Menú del restaurante',
    icon: <RestaurantOutlinedIcon />,
    to: '/menu/edit'
  },
  {
    title: 'Mesas',
    icon: <TableRestaurantOutlinedIcon />,
    to: '/tables'
  },
  {
    title: 'Clientes',
    icon: <Groups3OutlinedIcon />,
    to: '/clients'
  },
  {
    title: 'Proveedores',
    icon: <LocalShipping />,
    to: '/suppliers'
  }

]


export const navItemsAdmin2: NavItem[] = [
  {
    title: 'Empleados',
    icon: <PeopleOutlineIcon />,
    to: '/users'
  },
  
]

