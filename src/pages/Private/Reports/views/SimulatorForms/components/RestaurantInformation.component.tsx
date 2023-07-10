import { useState, FC } from 'react';

import { CardHeader, CardContent, Card, TextField, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatDateToPicker, formatDate } from '../../../../Common/helpers/format-date.helper';
import { Restaurant } from '../../../models/restaurant.model';
import { useRestaurant, useUpdateRestaurant } from '../../../hooks/useRestaurant';
import { UpdateRestaurantDto } from '../../../dto/update-restaurant.dto';


interface FormRestaurantProps {
  restaurant: Restaurant;
}

const FormRestaurant: FC<FormRestaurantProps> = ({ restaurant }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateRestaurantDto>({ defaultValues: restaurant });

  const [date, setDate] = useState<Date | null>(new Date(restaurant.simulationEndDate));

  const { mutateAsync, isLoading } = useUpdateRestaurant();



  async function onSubmit(updateRestaurantDto: UpdateRestaurantDto) {
    await mutateAsync({ ...updateRestaurantDto, id: restaurant.id });
  }

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

          <LoadingButton
            loading={isLoading}
            type='submit' variant='contained' fullWidth >

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

  const { mutateAsync } = useUpdateRestaurant();


  const handleChange = async (newValue: Date | null) => {

    if (newValue === null) {
      return;
    }
    const dateStr = formatDate(newValue);

    await mutateAsync({ id: restaurant.id, simulationEndDate: dateStr });


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


  const [restaurant, setRestaurant] = useState<Restaurant>();

  const { data, isLoading, isFetching, isFetched } = useRestaurant();

  const { enqueueSnackbar } = useSnackbar();




  if (isLoading)
    return <Typography>Loading...</Typography>


  if (!data && isFetched)
    return <Typography>No se encontró el restaurante</Typography>



  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardHeader title="Información del restaurante" />
        <CardContent>


          <FormRestaurant restaurant={data!} />



        </CardContent>
      </Card>
      <FormSimulationEndDate restaurant={data!} />



    </>
  )
}