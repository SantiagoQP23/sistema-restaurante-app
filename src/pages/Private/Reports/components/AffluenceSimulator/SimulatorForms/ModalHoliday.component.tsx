import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, Select, InputLabel, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { Holiday, ValidHolidays, ValidHolidaysNames } from '../models/holiday.model';
import { useEffect } from 'react';
import { statusModalHoliday, updateHoliday, createHoliday as createHolidayS } from '../services/holidays.service';

import { UpdateHolidayDto } from '../dto/update-holiday.dto';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import { SimulationContext } from '../../../context/SimulationContext';
import { FormHoliday } from './FormHoliday.component';
import { CreateHolidayDto } from '../dto/create-holiday.dto';
import { formatDate } from '../../../../helpers/format-date.helper';


export const ModalHoliday = () => {

  const [open, setOpen] = useState(false);

  const [holiday, setHoliday] = useState<Holiday>();

  const [createHoliday, setCreateHoliday] = useState<CreateHolidayDto>();

  const { updateHoliday: updateHolidayC, addHoliday } = useContext(SimulationContext)

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const suscription$ = statusModalHoliday.getSubject();

  const closeModal = () => {
    setOpen(false);
  }

  const submitUpdateHoliday = async (holidayToUpdate: UpdateHolidayDto) => {

    await callEndpoint(updateHoliday(holiday!.id, holidayToUpdate))
      .then((response) => {
        console.log(response);
        enqueueSnackbar('Feriado actualizado', { variant: 'success' });
        updateHolidayC(response.data);

      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error al actualizar feriado', { variant: 'error' });
      }
      )
  }

  const submitCreateHoliday = async (holidayToCreate: CreateHolidayDto) => {
    await callEndpoint(createHolidayS(holidayToCreate))
      .then((response) => {
        console.log(response);
        enqueueSnackbar('Feriado creado', { variant: 'success' });
        addHoliday(response.data);

      }
      )
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error al crear feriado', { variant: 'error' });
      }
      )


  }

  const onSubmit = async (data: CreateHolidayDto) => {
    console.log(data);

    //Establecer fecha
    //Pasamos la fecha a formato yyyy-MM-dd

    if (holiday) {

      await submitUpdateHoliday(data);

    } else {
      console.log('crear holiday')
      await submitCreateHoliday(data);
    }


    closeModal();

  }




  useEffect(() => {

    const suscription = suscription$.subscribe((data) => {

      const { holiday } = data;
      setOpen(data.open);
      setHoliday(holiday);

      if (holiday) {
        const { id, name, date, ...holidayData } = holiday;

        const holidayToCreate: CreateHolidayDto = {
          ...holidayData,
          date,
          name
        }

        setCreateHoliday(holidayToCreate);
      } else {
        setCreateHoliday({

          name: ValidHolidays.AÑO_NUEVO,
          date: formatDate(new Date()),
          value: 0,
        });
      }

    });

    // return () => {
    //   suscription.unsubscribe();
    // }


  }, [])


  return (
    <>
      <Dialog open={open} onClose={() => { }} fullWidth maxWidth='xs'>

        {
          createHoliday &&
          <FormHoliday
            onSubmit={onSubmit}
            loading={loading}
            closeModal={closeModal}
            isNew={!holiday?.id}
            holiday={createHoliday}
          />
        }



      </Dialog>

    </>
  )
}