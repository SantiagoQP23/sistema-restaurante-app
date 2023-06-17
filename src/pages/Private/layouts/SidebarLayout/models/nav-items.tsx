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

import { ExpandLess, ExpandMore, ListAlt } from '@mui/icons-material';



interface NavItem {
  title: string;
  icon: JSX.Element;
  to: string;
}

export const navItemsAdmin: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    to: '/dashboard'
  },

]

export const navItemsOrders: NavItem[] = [

  {
    title: 'Pedidos Activos',
    icon: <DeliveryDiningOutlinedIcon />,
    to: '/orders'
  },
  {
    title: 'Lista de pedidos',
    icon: <ListAlt />,
    to: '/orders/list'
  }
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
]


export const navItemsAdmin2: NavItem[] = [
  {
    title: 'Usuarios',
    icon: <PeopleOutlineIcon />,
    to: '/users'
  },
  {
    title: 'Reportes',
    icon: <StorefrontOutlinedIcon />,
    to: '/reports'
  },
]

