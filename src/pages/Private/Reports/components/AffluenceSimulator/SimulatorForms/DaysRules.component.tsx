import { CardHeader, CardContent, Card, Typography, TextField, FormControl, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { RuleDay } from '../models/rule-day.model';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { updateRulesDay, getRulesDay } from '../services/rules.service';
import { UpdateRuleDayDto } from '../dto/update-rule-day.dto';
import { useAsync } from '../../../../../../hooks/useAsync';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';


enum DayOrder {
  'Sunday'= 0,
  'Monday'= 1,
  'Tuesday'= 2,
  'Wednesday'= 3,
  'Thursday'= 4,
  'Friday'= 5,
  'Saturday'= 6,
};

enum DayNameSpanish {
  "Sunday" = "Domingo",
  "Monday" = "Lunes",
  "Tuesday" = "Martes",
  "Wednesday" = "Miércoles",
  "Thursday" = "Jueves",
  "Friday" = "Viernes",
  "Saturday" = "Sábado",
}


export const DaysRules = () => {



  const [days, setDays] = useState<RuleDay[]>([]);
  const [daysInit, setDaysInit] = useState<RuleDay[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();

  const onSubmit = async () => {

    const daysToUpdate: UpdateRuleDayDto[] = days.map((day, index) => {
      return {
        id: day.id,
        value: day.value
      }
    })

    await callEndpoint(updateRulesDay(daysToUpdate))
      .then(() => {
        enqueueSnackbar('Reglas actualizadas', { variant: 'success' })
      }
      )
      .catch(() => {
        enqueueSnackbar('Error al actualizar las reglas', { variant: 'error' })
      }
      )


  }

  const verifyBtnDisabled = () => {
    const isDisabled = days.find((day, index) => day.value !== daysInit[index].value) ? true : false;
    console.log({ isDisabled })
    setBtnDisabled(isDisabled);


  }

  // Ordenar los días de la semana por nombre
  // const orderDays = (days: RuleDay[]) => {

  //   const daysOrdered = days.sort((a, b) => DayOrder[`${a.day}`] - DayOrder[b.day]);

  
  //   return daysOrdered;


    
  // }


  const getDaysCall = async () => await callEndpoint(getRulesDay());

  const loadDays = (data: RuleDay[]) => { 

    const days = data
    setDays(days); setDaysInit(days); 
  
  }

  useAsync(getDaysCall, loadDays, () => { }, []);


  if (loading)
    return <Typography variant="h6">Cargando...</Typography>






  return (
    <>
      <Card>
        <CardHeader title="Reglas del día" />
        <CardContent>
          <form>
            <Grid container spacing={1} >

              {
                days.map((day, index) => (


                  <Grid item xs={2}>
                    <TextField

                      label={DayNameSpanish[`${day.day}` as keyof typeof DayNameSpanish]}
                      type="number"
                      fullWidth
                      required
                      value={day.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        const newDays = [...days];
                        newDays[index].value = Number(value);
                        setDays(newDays);
                        verifyBtnDisabled();
                      }}
                      inputProps={{
                        step: 0.05,
                      }}

                    />



                  </Grid>
                )

                )
              }


            

              <Grid item xs={12}>

                <LoadingButton
                  type='submit'
                  variant='contained'
                  onClick={onSubmit}
                  disabled={btnDisabled}
                >
                  Guardar
                </LoadingButton>
              </Grid>
            </Grid>



          </form>



        </CardContent>
      </Card>

    </>
  )
}