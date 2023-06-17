import { FC, useState } from 'react';

import { styled, alpha } from '@mui/material/styles';

import { Toolbar, Stack, OutlinedInput, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Box } from '@mui/material';
import { IUser, OrderStatus } from '../../../../../../models';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../../redux';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ComboBoxUser } from '../../../components/ComboBoxUser.component';



const StyledRoot = styled(Toolbar)(({ theme }) => ({
  // height: 96,
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

  handleChangeUser: (value: IUser | null) => void,
  user: IUser | null,
  statusOrderFilter: string,
  changeStatus?: (status: string) => void,
  startDate: Date | null,
  handleChangeStartDate: (date: Date | null) => void,
  endDate: Date | null,
  handleChangeEndDate: (date: Date | null) => void,
}


export const OrderListToolbar: FC<Props> = ({
  handleChangeUser,
  user,
  statusOrderFilter, changeStatus,
  startDate, handleChangeStartDate,
  endDate, handleChangeEndDate,
}) => {


  return (
    <StyledRoot
    >

      {/* <Stack
        direction='row'
        p={2}
        spacing={1}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        my={1}
        sx={{
          overflowX: 'auto',
        }}

      > */}

      <Grid container spacing={2}
        sx={{
          p: 1,
        }}
      >



        {/* 
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mesero</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterWaiter}
            label="Mesa del pedido"
            onChange={(e) => changeWaiter(e.target.value)}
          >
            <MenuItem key={"all"} value={"all"}>Todos</MenuItem>
            

          </Select>
        </FormControl> */}


        <Grid item xs={6} sm={4} md={3} lg={2}>
          <DesktopDatePicker
            label="Fecha de inicio"
            inputFormat="yyyy-MM-dd"
            value={startDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}

          />
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>

          <DesktopDatePicker
            label="Fecha de fin"
            inputFormat="yyyy-MM-dd"
            value={endDate}
            onChange={handleChangeEndDate}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
            minDate={startDate || undefined}

          />
        </Grid>


        <Grid item xs={12} sm={4} md={4} lg={4}>

          <ComboBoxUser user={user} handleChangeUser={handleChangeUser} />

        </Grid>




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


      </Grid>






    </StyledRoot>
  )
}