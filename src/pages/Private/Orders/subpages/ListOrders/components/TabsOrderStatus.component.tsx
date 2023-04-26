import {FC} from 'react';

import { Label } from "../../../../../../components/ui"
import { IOrder, OrderStatus } from "../../../../../../models"
import { Tab, Tabs } from '@mui/material';


interface StyledTabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}


// const StyledTabs = styled((props: StyledTabsProps) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   '& .MuiTabs-indicator': {
//     display: 'flex',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
//   '& .MuiTabs-indicatorSpan': {
//     maxWidth: 40,
//     width: '100%',
//     backgroundColor: '#635ee7',
//   },
// });


// interface StyledTabProps {
//   label: string;
//   icon: React.ReactElement;
//   iconPosition: 'top' | 'bottom' | 'start' | 'end';
//   value: string;
// }

// const StyledTab = styled((props: StyledTabProps) => (
//   <Tab disableRipple {...props} />
// ))(({ theme }) => ({
//   textTransform: 'none',
//   fontWeight: theme.typography.fontWeightRegular,
//   fontSize: theme.typography.pxToRem(15),
//   marginRight: theme.spacing(1),
//   color: 'rgba(255, 255, 255, 0.7)',
//   '&.Mui-selected': {
//     color: '#fff',
//   },
//   '&.Mui-focusVisible': {
//     backgroundColor: 'rgba(100, 95, 228, 0.32)',
//   },
// }));




interface Props {
  orders: IOrder[],
  statusOrderFilter: string,
  changeStatus: (event: React.SyntheticEvent, newValue: string) => void

}


export const TabsOrderStatus:FC<Props> = (
  {
    orders,
    statusOrderFilter,
    changeStatus
  }
) => {
  return (
    <Tabs

      value={statusOrderFilter}
     
      onChange={changeStatus}
      variant="scrollable"
    >

      <Tab
        label='Todos'
        icon={<Label color='info'>{orders.length}</Label>}
        iconPosition='start'
        value={'all'}
      // onClick={() => setView('list')}
      />
      <Tab
        label='Pendiente'
        value={OrderStatus.PENDING}
        icon={<Label color='success'>{orders.filter(order => order.status === OrderStatus.PENDING).length}</Label>}
        iconPosition='start'
      // onClick={() => setView('list')}
      />
      <Tab
        label='En preparación'
        value={OrderStatus.IN_PROGRESS}
        icon={<Label color='primary'>{orders.filter(order => order.status === OrderStatus.IN_PROGRESS).length}</Label>}
        iconPosition='start'
      // onClick={() => setView('list')}
      />
      <Tab
        label='Por pagar'
        value={'unpaid'}
        icon={<Label color='warning'>{orders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid).length}</Label>}
        iconPosition='start'
      // onClick={() => setView('list')}
      />
      <Tab
        label='Pagados'
        value={OrderStatus.DELIVERED}
        icon={<Label color='info'>{orders.filter(order => order.status === OrderStatus.DELIVERED).length}</Label>}
        iconPosition='start'
      // onClick={() => setView('list')}
      />
      <Tab
        label='Cancelados'
        value={OrderStatus.CANCELLED}
        icon={<Label color='error'>{orders.filter(order => order.status === OrderStatus.CANCELLED).length}</Label>}
        iconPosition='start'
      // onClick={() => setView('list')}
      />



    </Tabs>
  )
}