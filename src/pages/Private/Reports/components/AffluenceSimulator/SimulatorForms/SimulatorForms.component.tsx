import { ArrowBack } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Grid, Box, Stack, Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { updateSimulationAffluence } from '../../../services/affluence.service';
import { useSnackbar } from 'notistack';
import { RestaurantInformation } from "./RestaurantInformation.component";
import { WeatherRules } from './WeatherRules.component';
import { WeekRules } from './WeekRules.component';
import { HolidaysRules } from './HolidaysRules.component';
import { DaysRules } from './DaysRules.component';
import { ModalHoliday } from "./ModalHoliday.component";
import { SimulationProvider, SimulationContext } from '../../../context/SimulationContext';
import { getHolidays } from "../services/holidays.service";
import { useContext } from 'react';
import { Holiday } from "../models/holiday.model";
import { useAsync } from '../../../../../../hooks/useAsync';



export const SimulatorForms = () => {



  const navigate = useNavigate();

  const { loadHolidays } = useContext(SimulationContext);

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const submitUpdateSimulation = async () => {
    await callEndpoint(updateSimulationAffluence())
      .then(async () => {
        enqueueSnackbar('Simulación actualizada', { variant: 'success' });


      })
      .catch(() => {
        enqueueSnackbar('Error al actualizar la simulación', { variant: 'error' });

      })


  }

  const getHolidaysCall = async () => await callEndpoint(getHolidays());

  const loadHolidaysState = (data: Holiday[]) => { loadHolidays(data) };

  useAsync(getHolidaysCall, loadHolidaysState, () => { }, []);




  return (
    <>

      <Box display='flex' justifyContent='space-between' mb={2} alignItems='center'>


        <Box
          display='flex'
          alignItems='center'
          gap={1}
        >

          <Button onClick={() => { navigate(-1) }}>
            <ArrowBack />
          </Button>

          <Typography variant="h4">Simulador de afluencia</Typography>

        </Box>




        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={submitUpdateSimulation}
        >
          Actualizar simulación
        </LoadingButton>





      </Box>


      <Grid container spacing={1}>

        <Grid item xs={12} md={6} lg={3}>
          <RestaurantInformation />
        </Grid>

        <Grid container item xs={12} md={6} spacing={1} display='flex' alignContent='flex-start'>

          <Grid item xs={12}  >
            <DaysRules />
          </Grid>
          <Grid item xs={12} >
            <WeatherRules />
          </Grid>
          <Grid item xs={12}  >
            <WeekRules />

          </Grid>
        </Grid>
        <Grid item xs={12} md={3} >
          <HolidaysRules />

        </Grid>











      </Grid>

      <ModalHoliday />


    </>
  )
}