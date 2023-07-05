import { ArrowBack } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Grid, Box, Stack, Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import { DaysRules, Holidays, HolidaysRules, ModalDeleteHoliday, ModalHoliday, RestaurantInformation, WeatherRules, WeekRules } from './components';

import { SimulationProvider, SimulationContext } from '../../context/SimulationContext';
import { useContext } from 'react';
import { useSeed } from "../../hooks/useSeed";
import { useSimulation } from "../../hooks/useSimulation";
import { TitlePage } from "../../../components/TitlePage.component";



//TODO Voy a asumir que la aplicación ya ejecutó el seed

export const SimulatorForms = () => {

  const simulationQuery = useSimulation();



  const navigate = useNavigate();

  const { loadHolidays } = useContext(SimulationContext);

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const seedQuery = useSeed();

  const executeSeed = async () => {
    await seedQuery.refetch().then(() => {
      navigate('/reports/simulator')
    })
  }


  // const submitUpdateSimulation = async () => {
  //   await callEndpoint(updateSimulationAffluence())
  //     .then(async () => {
  //       enqueueSnackbar('Simulación actualizada', { variant: 'success' });


  //     })
  //     .catch(() => {
  //       enqueueSnackbar('Error al actualizar la simulación', { variant: 'error' });

  //     })


  // }

  // const getHolidaysCall = async () => await callEndpoint(getHolidays());

  // const loadHolidaysState = (data: Holiday[]) => { loadHolidays(data) };

  // useAsync(getHolidaysCall, loadHolidaysState, () => { }, []);




  return (
    <>

      <TitlePage title='Simulador de afluencia'
        action={
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={executeSeed}
          >
            Actualizar simulación
          </LoadingButton>


        }
      />



      <Grid container spacing={1}>

        <Grid item xs={12} md={6} lg={3}>
          <RestaurantInformation />
        </Grid>

        <Grid container item xs={12} md={9} spacing={1} display='flex' alignContent='flex-start'>

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

        <Grid item container xs={12} spacing={2} >
          <Grid item xs={12} md={6}>
            <HolidaysRules />

          </Grid>
          <Grid item xs={12} md={6}  >

            <Holidays />
          </Grid>

        </Grid>












      </Grid>

      <ModalHoliday />
      <ModalDeleteHoliday />


    </>
  )
}