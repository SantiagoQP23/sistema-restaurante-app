import { useState, useRef, RefObject, FC, ReactElement } from 'react';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { IDay, TypeAffluence } from '../../models/day.interface';
import { getPredictionAffuence, updateWeatherForecast, updatePredictionAffluence } from '../../services/affluence.service';
import { useAsync } from '../../../../../hooks/useAsync';
import { Typography, Grid, Card, CardContent, CardHeader, tabsClasses, Button, Divider, Box, Stack } from '@mui/material';
import { Tabs, Tab } from '@mui/material/';
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { ArrowBack } from "@mui/icons-material";
import { Day } from "../Day.component";
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useReactToPrint } from "react-to-print";
import { PdfAffluencePrediction } from './PdfAffluencePrediction.component';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

// interface PdfAffluencePredictionType {
//   print: () => void;
//   component: ReactElement;
// }

export const AffluencePrediction = () => {


  //Obtener los datos de la API

  const { loading, callEndpoint } = useFetchAndLoad();
  const { loading: loadingGet, callEndpoint: callEndpointGet } = useFetchAndLoad();
  const { loading: loadingPrediction, callEndpoint: callEndpointPrediction } = useFetchAndLoad();

  const [days, setDays] = useState<IDay[]>([]);

  const navigate = useNavigate();

  const componentRef = useRef(null);


  const getAffluenceCall = async () => await callEndpoint(getPredictionAffuence());

  const loadAffluenceState = (data: IDay[]) => {
    setDays(data);
  }

  const { enqueueSnackbar } = useSnackbar();

  useAsync(getAffluenceCall, loadAffluenceState, () => { }, []);

  const data = {
    labels: days.map(day => day.nameDay + " " + day.date),
    datasets: [
      {
        data: days.map(day => {

          if (day.affluences.length == 0)
            return 0;

          const affluence = day.affluences.find(affluence => affluence.type === TypeAffluence["PREDICTED"]);

          if (!affluence)

            return 0;

          return affluence.affluence;
        }),
        label: 'Asistencia',
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,

      },
      {

        data: days.map(day => {

          if (day.affluences.length == 0)
            return 0;

          const affluence = day.affluences.find(affluence => affluence.type === TypeAffluence["REAL"]);

          if (!affluence)
            return 0;

          return affluence.affluence;
        }),
        label: 'Asistencia Real',
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.5,

      }


    ],

  }

  const submitUpdateWeather = async () => {
    console.log("Actualizar pronóstico del clima");

    await callEndpoint(updateWeatherForecast())
      .then(async (resp) => {
        setDays(resp.data)
        enqueueSnackbar('Pronóstico del clima actualizado', { variant: 'success' });


      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al actualizar el pronóstico del clima', { variant: 'error' });
      })

  }

  const submitUpdatePrediction = async () => {
    console.log("Actualizar predicción");

    await callEndpointPrediction(updatePredictionAffluence())
      .then(async (resp) => {

        setDays(resp.data)
        enqueueSnackbar('Predicción actualizada', { variant: 'success' });


      })

      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al actualizar la predicción', { variant: 'error' });
      })
    
      console.log('Actualizar predicción de afluencia')
      
    /* await callEndpointGet(getPredictionAffuence())
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al actualizar la predicción', { variant: 'error' });
      })
 */
  }


  const handlePrint = useReactToPrint({
    content: () => componentRef.current!
  })


  return (
    <>

      <Grid container display='flex' justifyContent='space-between' mb={2} alignItems='center'>
        <Box sx={{ display: 'flex', }}>
          <Button onClick={() => { navigate('/reports') }}>
            <ArrowBack />
          </Button>
          <Typography variant="h6">Predicción de afluencia</Typography>

        </Box>

        <Box>
          <Stack direction="row" spacing={2}>

            <LoadingButton loading={loading} variant="contained" onClick={submitUpdateWeather}>
              Actualizar Pronóstico del cliima
            </LoadingButton>
            <LoadingButton variant="contained" loading={loadingPrediction} onClick={submitUpdatePrediction}>
              Actualizar Predicción
            </LoadingButton>

            {
              days.length > 0 &&
              <PDFDownloadLink
                document={<PdfAffluencePrediction days={days} />}
                fileName="affluence-prediction.pdf"

              >
                <Button
                  variant='outlined'
                >
                  Exportar a PDF
                </Button>

              </PDFDownloadLink>}

          </Stack>
        </Box>

      </Grid>



      

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Day />
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title={'Afluencia de los proximos ' + days.length + " días"}></CardHeader>
            <CardContent>

              <Line data={data} ></Line>


            </CardContent>
          </Card>
        </Grid>



      </Grid>



      <Grid item xs={12}>


        <Card sx={{ mb: 2 }}>

          <CardHeader title="Asistencia de la semana" />
          <CardContent>


            <Grid container spacing={2}>
              {
                days.slice(0, 12).map(day => {

                  return (

                    <Grid key={day.id} item xs={2}>

                      <Card >
                        <CardContent>
                          <Typography variant='body2' align="center">{day.nameDay}</Typography>
                          <Typography variant='body2' align="center">{day.date}</Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant='subtitle1' align="center">{day.tempMax} °C</Typography>
                          <Typography variant='h5' align="center"> {day.temp} °C</Typography>
                          <Typography variant='subtitle1' align="center">{day.tempMin} °C</Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant='body1' align="center">Asistencia</Typography>
                          <Typography variant='h6' align="center">{day.affluences[0].affluence}</Typography>

                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })
              }

            </Grid>
          </CardContent>

        </Card>

      </Grid>




    </>
  )




}