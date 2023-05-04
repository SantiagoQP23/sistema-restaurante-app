import { Typography, Select, MenuItem, TextField, Stack, Box, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/';
import { DesktopDatePicker } from '@mui/x-date-pickers';



export const ProductsReports = () => {


  const [period, setPeriod] = useState('day');

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleChangeStartDate = (newValue: Date | null) => {

    if (newValue === null) {
      return;
    }

    setStartDate(newValue);
  }

  const handleChangeEndDate = (newValue: Date | null) => {

    if (newValue === null) {
      return;
    }

    setEndDate(newValue);
  }



  const handleChange = (e: SelectChangeEvent) => {
    setPeriod(e.target.value)
  }

  return (
    <>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems='flex-end'

      >
        <FormControl>
          <InputLabel id="select-period-label">Periodo</InputLabel>
          <Select
            labelId="select-period-label"
            
            value={period}
            onChange={handleChange}
            fullWidth
            label="Periodo"
          >
            <MenuItem value='day'>Hoy</MenuItem>
            <MenuItem value='week'>Esta semana</MenuItem>
            <MenuItem value='month'>Este mes</MenuItem>
            <MenuItem value='year'>Este Año</MenuItem>
            <MenuItem value='custom'>Personalizado</MenuItem>


          </Select>
        </FormControl>

        {

          period === 'custom' && <>
            <DesktopDatePicker
              label="Fecha de inicio"
              inputFormat="yyyy-MM-dd"
              value={startDate}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField {...params} />}
              maxDate={new Date()}

            />

            {
              startDate && startDate !== endDate &&

              <DesktopDatePicker
                label="Fecha de fin"
                inputFormat="yyyy-MM-dd"
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
                maxDate={new Date()}

              />
            }
          </>

        }

      </Stack>


    </>
  )
}