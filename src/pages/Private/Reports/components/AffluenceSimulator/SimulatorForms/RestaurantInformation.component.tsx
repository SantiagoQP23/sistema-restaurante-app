import { useState, FC } from 'react';

import { CardHeader, CardContent, Card, TextField, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { getRestaurant, updateRestaurant } from '../services/rules.service';
import { Restaurant } from '../models/restaurant.model';
import { useAsync } from '../../../../../../hooks/useAsync';
import { useForm } from 'react-hook-form';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { useSnackbar } from 'notistack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatDate, formatDateToPicker } from '../../../../helpers/format-date.helper';


interface FormRestaurantProps {
  restaurant: Restaurant;
  onSubmit: (form: Restaurant) => void;
}



const FormRestaurant: FC<FormRestaurantProps> = ({ restaurant, onSubmit }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<Restaurant>({ defaultValues: restaurant });

  const [date, setDate] = useState<Date | null>(new Date(restaurant?.simulationEndDate));




  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>

        {/* <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  type="text"
                  fullWidth
                  required
                />

              </Grid> */}

        <Grid item xs={12}>


          <TextField
            label="Capacidad"
            type="number"
            fullWidth
            required

            {
            ...register('capacity', {
              required: 'Este es un campo requerido',
              min: { value: 1, message: 'La capacidad debe ser mayor a 0' },
              valueAsNumber: true,

            })
            }
          />

        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Porcentaje de ocupación promedio"
            type="number"
            fullWidth
            required
            {
            ...register('percentageAttendance', {

              required: 'Este es un campo requerido',
              min: { value: 1, message: 'El porcentaje debe ser mayor a 0' },
              max: { value: 100, message: 'El porcentaje debe ser menor a 100' },
              valueAsNumber: true,
            })
            }

          />
        </Grid>



        <Grid item xs={12}>

          <LoadingButton type='submit' variant='contained' fullWidth >

            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>





    </form >


  )




}

interface FormSimulationEndDateProps {
  restaurant: Restaurant;
}


export const FormSimulationEndDate: FC<FormSimulationEndDateProps> = ({ restaurant }) => {


  const [date, setDate] = useState<Date | null>(formatDateToPicker(restaurant?.simulationEndDate));



  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async (newValue: Date | null) => {

    if (newValue === null) {
      return;
    }
    const dateStr = formatDate(newValue);

    await callEndpoint(updateRestaurant(restaurant.id, { simulationEndDate: dateStr }))
      .then((resp) => {
        enqueueSnackbar('Fecha de fin de simulación actualizada', { variant: 'success' })
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar('Error al actualizar fecha de fin de simulación', { variant: 'error' })
      })



    setDate(newValue);


  };



  return (

    <Card>
      <CardHeader title="Fecha de fin de simulación" />
      <CardContent>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <DesktopDatePicker

              label="Fecha de inicio de simulación"
              inputFormat="yyyy-MM-dd"
              renderInput={(params) => <TextField {...params} />}
              value={formatDateToPicker('2022-01-01')}
              onChange={handleChange}
              disabled

            />

          </Grid>

          <Grid item xs={12}>
            <DesktopDatePicker

              label="Fecha de fin de simulación"
              inputFormat="yyyy-MM-dd"
              renderInput={(params) => <TextField {...params} />}
              value={date}
              onChange={handleChange}

            />
          </Grid>
        </Grid>



      </CardContent>
    </Card>


  )


}





export const RestaurantInformation = () => {

  const { loading, callEndpoint } = useFetchAndLoad();

  const [restaurant, setRestaurant] = useState<Restaurant>();

  const { enqueueSnackbar } = useSnackbar();


  async function onSubmit(restaurant: Restaurant) {

    const { id, ...updateRestaurantDto } = restaurant;

    console.log({ updateRestaurantDto })

    if (restaurant) {
      await callEndpoint(updateRestaurant(restaurant.id, updateRestaurantDto))
        .then((resp) => {
          setRestaurant(resp.data)
          enqueueSnackbar('Restaurante actualizado', { variant: 'success' })
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Error al actualizar restaurante', { variant: 'error' })
        })

    }


  }

  const getRestaurantCall = async () => await callEndpoint(getRestaurant('481edadb-c443-4856-a878-b66011a2b4f8'));

  const loadRestaurant = (data: Restaurant) => { setRestaurant(data) }

  useAsync(getRestaurantCall, loadRestaurant, () => { }, []);




  if (loading)
    return <Typography>Loading...</Typography>





  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardHeader title="Información del restaurante" />
        <CardContent>

          {
            restaurant &&
            <FormRestaurant restaurant={restaurant} onSubmit={onSubmit} />

          }


        </CardContent>
      </Card>


      {

        restaurant && <FormSimulationEndDate restaurant={restaurant} />
      }


    </>
  )
}