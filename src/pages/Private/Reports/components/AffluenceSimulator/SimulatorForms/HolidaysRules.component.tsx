import { useState, FC, useContext } from 'react';

import { CardHeader, CardContent, Card, Grid, TextField, List, ListItem, IconButton, Button, Box, alpha } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { getHolidays, statusModalHoliday } from '../services/holidays.service';
import { Holiday } from '../models/holiday.model';
import { useAsync } from '../../../../../../hooks/useAsync';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { Edit, EditOutlined } from '@mui/icons-material';
import { SimulationContext } from '../../../context/SimulationContext';


interface HolidayProps {
  holiday: Holiday
}

const HolidayC: FC<HolidayProps> = ({ holiday }) => {

  const editHoliday = () => {
    statusModalHoliday.setSubject(true, holiday);

  }

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={editHoliday}>
            <EditOutlined />
          </IconButton>
        }
        // Cambia de color cuando pasa el mouse
        sx={{
          borderRadius: 0.5,
          '&:hover, &.Mui-focusVisible':
          {
            bgcolor: (theme) => alpha(theme.palette.action.active,
              theme.palette.action.hoverOpacity),
          },
        }}
      >
        <ListItemText primary={holiday.name} secondary={`${holiday.date} Valor: ${holiday.value}`} />

      </ListItem>

    </>
  )


}



export const HolidaysRules = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const { holidays, loadHolidays } = useContext(SimulationContext)



  const openModal = () => {
    statusModalHoliday.setSubject(true, undefined);
  }


  return (
    <>
      <Card>
        <CardHeader title={<>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Feriados</Typography>

            <Button variant='outlined' onClick={openModal}>
              Agregar feriado
            </Button>
          </Box>
        </>} />
        <CardContent>

          {
            holidays.length === 0
              ? <p>No hay feriados</p>
              :
              <List>

                {
                  holidays.map((holiday, index) => {
                    return (
                      <HolidayC holiday={holiday} key={holiday.id} />

                    )
                  })}
              </List>
          }






        </CardContent>
      </Card>

    </>
  )
}