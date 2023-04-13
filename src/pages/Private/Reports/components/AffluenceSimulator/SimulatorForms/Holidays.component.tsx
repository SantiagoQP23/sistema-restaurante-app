import { Card, CardHeader, CardContent, List, ListItemButton, ListItemText, Typography, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import { useAsync, useFetchAndLoad } from '../../../../../../hooks';
import { getTypesHolidays, updateTypeHoliday } from '../services/holidays.service';
import { FC, MouseEvent, useState } from 'react';
import { TypedUseSelectorHook } from 'react-redux';
import { TypeHoliday } from '../models/type-holiday.model';
import { DoneOutline, DoneOutlined } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UpdateTypeHolidayDto } from '../dto/update-type-holiday.dto';
import { useSnackbar } from 'notistack';
import { queryClient } from '../../../../../../main';
import { useTypesHolidays } from '../../../hooks/useTypesHolidays';



const HolidayItem = ({ typeHoliday }: { typeHoliday: TypeHoliday }) => {

  const [selected, setSelected] = useState(false);

  const [value, setValue] = useState(typeHoliday.value);

  const {enqueueSnackbar} = useSnackbar();

  const mutation = useMutation<TypeHoliday, unknown, UpdateTypeHolidayDto>(updateTypeHoliday, {
    onSuccess: (data) => {
      console.log(data);
      toggleSelected();
      setValue(data.value);
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al actualizar el tipo de feriado', {variant: 'error'});
    }

  })


  const toggleSelected = () => {
    setSelected(!selected);
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // Detiene la propagación del evento para evitar que se active el evento onClick del ListItemButton
    e.stopPropagation();
    setValue(Number(e.target.value));
  };






  return (
    <ListItemButton
      onClick={(e) => {

        toggleSelected();
      }}



    >
      <ListItemText

        primary={
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography
              variant="h5"
            >
              {typeHoliday.name}
            </Typography>

            <Box>
              {
                !selected
                  ?

                  (
                    <Typography
                      variant="h6"
                    >
                      Valor: {value}
                    </Typography>
                  )
                  :
                  (
                    <>
                      <TextField
                        label="Valor"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={value}
                        onChange={(e) => handleValueChange(e)}
                        onClick={(e) => {
                          e.stopPropagation();
                        }
                        }



                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          mutation.mutate({ id: typeHoliday.id, value });
                        }}
                      >{
                          mutation.isLoading
                            ?
                            <CircularProgress size={20} />
                            :
                            <DoneOutlined />
                        }
                      </IconButton>
                    </>
                  )

              }
            </Box>

          </Box>
        }
      >

      </ListItemText>

    </ListItemButton>

  )
}




export const Holidays = () => {


  const [typesHolidays, setTypesHolidays] = useState<TypeHoliday[]>([]);

  const {isLoading, error, data} = useTypesHolidays();



  // const getTypesHolidaysCall = async () => await callEndpoint(getTypesHolidays());

  // const loadTypesHolidays = (data: TypeHoliday[]) => { setTypesHolidays(data) };

  // useAsync(getTypesHolidaysCall, loadTypesHolidays, () => { }, []);

  return (
    <>

      <Card>
        <CardHeader
          title='Tipos de feriados'
          subheader='Feriados que se aplicarán en la simulación'
        />


        <List>

          {
            data?.map((typeHoliday, index) => (

              <HolidayItem typeHoliday={typeHoliday} key={typeHoliday.id} />



            ))
          }


        </List>




      </Card>

    </>
  )
}

