import {FC} from 'react';

import { styled, alpha } from '@mui/material/styles';

import { Toolbar, Stack, OutlinedInput, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { OrderStatus } from '../../../../../../models';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../../redux';



const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
  
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));


interface Props {
  filterWaiter: string,
  changeWaiter: (waiterId: string) => void,
  statusOrderFilter: string,
  changeStatus?: (status: string) => void,
}


export const OrderListToolbar:FC<Props> = ({filterWaiter, changeWaiter, statusOrderFilter, changeStatus}) => {


  const {user} = useSelector(selectAuth);

  return (
    <StyledRoot
    >

      <Stack direction='row' p={2} spacing={1} display='flex' justifyContent='space-between' alignItems='center' my={1}>

        
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mesero</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterWaiter}
              label="Mesa del pedido"
              onChange={(e) => changeWaiter(e.target.value)}
              size='small'
            >
              <MenuItem key={"all"} value={"all"}>Todos</MenuItem>
              {
                user &&
                <MenuItem key={user?.id} value={user?.id}>{user!.username}</MenuItem>
              }

            </Select>
          </FormControl>
      

       

          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusOrderFilter}
              label="Mesa del pedido"
              size='small'

              onChange={(e) => changeStatus(e.target.value)}
            >
              <MenuItem key={'all'} value={'all'}>Todos</MenuItem>
              <MenuItem key={OrderStatus.PENDING} value={OrderStatus.PENDING}>Pendiente</MenuItem>
              <MenuItem key={OrderStatus.IN_PROGRESS} value={OrderStatus.IN_PROGRESS}>Preparando</MenuItem>
              <MenuItem key={OrderStatus.DELIVERED} value={OrderStatus.DELIVERED}>Entregado</MenuItem>
              <MenuItem key={'unpaid'} value={'unpaid'}>Por pagar</MenuItem>
              <MenuItem key={OrderStatus.CANCELLED} value={OrderStatus.CANCELLED}>Cancelado</MenuItem>


            </Select>
          </FormControl> */}


        </Stack>


     



    </StyledRoot>
  )
}