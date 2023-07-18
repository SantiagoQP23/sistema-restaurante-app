

import { Bar, Line } from "react-chartjs-2"

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Tooltip,
  BarElement,
} from "chart.js"
import { Card, Grid, MenuItem, Select, CardHeader, CardContent, Button, Box, Stack, CircularProgress, CardActions } from '@mui/material';
import { Typography, SelectChangeEvent } from '@mui/material/';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { useDispatch, useSelector } from 'react-redux';
import { executeSeed, getFootfall } from '../../services/footfall.service';
import { useState } from "react";
import { IDay } from '../../models/day.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AffluenceMonth } from "./components/AffluenceMonth.component";
import { useEffect } from 'react';
import { Day } from "../../components/Day.component";
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfFootfallSimulation } from "./pdf/PdfFootfallSimulation.component";
import { TitlePage } from "../../../components/TitlePage.component";
import { useQuery } from "@tanstack/react-query";
import { selectAuth } from "../../../../../redux";
import { useSeed } from "../../hooks/useSeed";
import { useSimulation } from "../../hooks/useSimulation";
import { useFootfall } from "../../hooks/useFootfall";
import { ChartSimulatedFootfall } from "./components";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend, BarElement)


export const months = [{
  value: 0,
  label: 'Enero'
}, {
  value: 1,
  label: 'Febrero'
}, {
  value: 2,
  label: 'Marzo'
}, {
  value: 3,
  label: 'Abril'
}, {
  value: 4,
  label: 'Mayo'
}, {
  value: 5,
  label: 'Junio'
}, {
  value: 6,
  label: 'Julio'
}, {
  value: 7,
  label: 'Agosto'
}, {
  value: 8,
  label: 'Septiembre'
}, {
  value: 9,
  label: 'Octubre'
}, {
  value: 10,
  label: 'Noviembre'
}, {
  value: 11,
  label: 'Diciembre'
}]

export const years = [{

  value: 2022,
  label: '2022'
}, {
  value: 2023,
  label: '2023'
}]


//TODO Voy a asumir que la aplicación ya ejecutó el seed


export const FootFallSimulation = () => {

  const { restaurant } = useSelector(selectAuth);

  const simulationQuery = useSimulation();

  const { data: footfalls, isLoading, isFetching } = useFootfall();






  const [days, setDays] = useState<IDay[]>([]);

  const [daysFiltered, setDaysFiltered] = useState<IDay[]>([]);

  const [daysMonth, setDaysMonth] = useState<IDay[]>([])

  const [month, setmonth] = useState(0)

  const [year, setYear] = useState(2022)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const executeSimulation = () => {

    simulationQuery.refetch();
  }




  // const dataMonth = {
  //   labels: daysFiltered.filter(day => new Date(day.date).getMonth() === month).map(day => `${day.nameDay} ${day.date}`),
  //   datasets: [
  //     {
  //       label: 'Asistencia',
  //       data: daysFiltered.filter(day => new Date(day.date).getMonth() === month).map(day => day.affluences[0].affluence),
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)"
  //     }]
  // }

  /* const options = {
    responsive:true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      
      title: {
        display: true,
        text: 'Afluencia del mes '
      },
      
    },
    chart:{
      tooltip: {
        mode: 'index' as const,
      }
    }
    
   
  } */

  const onChangeMonth = (event: SelectChangeEvent<number>) => {
    setmonth(event.target.value as number);
  };

  const onChangeYear = (event: SelectChangeEvent<number>) => {
    setYear(event.target.value as number);
  };

  const filterByYear = (year: number) => {
    setDaysFiltered(days.filter(day => new Date(day.date).getFullYear() === year))
  }

  const submitUpdateSimulation = async () => {
    // await callEndpoint(updateSimulationAffluence())
    //   .then(async () => {
    //     enqueueSnackbar('Simulación actualizada', { variant: 'success' });
    //     await callEndpoint(getAffluence())
    //       .then((resp) => {
    //         setDays(resp.data);
    //       })

    //   })
    //   .catch(() => {

    //   })

  }


  // useEffect(() => {
  //   filterByYear(year)
  // }, [days, year])

  // useAsync(getAffluenceCall, loadAffluenceState, () => { }, []);

  return (
    <>


      <TitlePage
        title='Simulación de afluencia'
        action={
          <Button
            variant="outlined"
            onClick={() => navigate('simulator')}>
            Reglas de simulación
          </Button>
        }
      />



      {
        !(restaurant?.lastSimulationUpdate) &&
        <>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >

              <Typography variant='h4' align='center' my={5}>
                No se ha realizado ninguna simulación
              </Typography>


                <Button
                  variant="contained"
                  onClick={() => executeSimulation()}
                >
                  Iniciar simulación
                </Button>
            </CardContent>
          </Card>
    </>
      }

{/* {
  footfalls?.length === 0 ?
    <>
      <Typography variant='h6' align='center' mt={2}>
        No hay datos de simulación
      </Typography>

    </>

    : (
      <>
        <ChartSimulatedFootfall footfalls={footfalls || []} />
      </>
    )

} */}





{
  // days.length > 0 &&

  // <PDFDownloadLink
  //   document={<PdfFootfallSimulation days={days} />}
  //   fileName="simulacion-afluencia-completa.pdf"
  // >
  //   <Button variant='outlined' >

  //     Exportar a PDF
  //   </Button>

  // </PDFDownloadLink>
}









{/* <Card>

        <CardHeader
          title='Filtros'
        />

        <CardActions>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Select
                labelId="select-seccion"
                label="Tipo de identificación"
                fullWidth
                margin='dense'
                value={year}
                onChange={(e) => onChangeYear(e)}
                size="small"
              >

                {years.map(year => (
                  <MenuItem key={year.value} value={year.value}>
                    {year.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={3}>
              <Select
                labelId="select-seccion"
                label="Tipo de identificación"
                fullWidth
                margin='dense'
                value={month}
                onChange={(e) => onChangeMonth(e)}
                size="small"
              >

                {months.map(month => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>

            </Grid>
          </Grid>
        </CardActions>
      </Card> */}

<Grid container spacing={2} mt={2}>


  {/* <Grid item xs={12} md={4}>
  <Day />

</Grid> */}


  {/* <Grid container item xs={12} md={12} spacing={1} sx={{ display: 'flex', alignContent: 'start' }}>


          <Grid container spacing={2}>
            <Grid item xs={12}>

              <Card>
                <CardHeader title={
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>
                        Afluencia del mes {months[month].label} {year}
                      </Typography>

                      <PDFDownloadLink
                        document={<PdfFootfallSimulation days={daysFiltered.filter(day => new Date(day.date).getMonth() === month)} month={months[month].label} />}
                        fileName={`simulacion-afluencia-${months[month].label}.pdf`}
                      >
                        <Button variant='outlined' >

                          Exportar a PDF
                        </Button>

                      </PDFDownloadLink>


                    </Box>

                  </>

                } />
                <CardContent>
                  {
                    days.length > 0
                      ? <Line data={dataMonth} ></Line>
                      : <CircularProgress />

                  }

                </CardContent>

              </Card>
            </Grid>


          </Grid>
        </Grid> */}

  {/* <Grid container item xs={12} spacing={1}
          sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'top',
            justifyItems: 'top',
          }}
        >
          {
            months.map(month => {
              const days = daysFiltered.filter(day => new Date(day.date).getMonth() === month.value)

              let count = 0;

              days.forEach(day => {
                count += day.affluences[0].affluence
              })

              if (count === 0) return null;

              return (
                <Grid key={month.value} item xs={12} md={2}>
                  <AffluenceMonth month={month.label} affluence={count} />

                </Grid>
              )


            }
            )}
        </Grid> */}
  <Grid item xs={12}>


  </Grid>
</Grid>



    </>
  )




}