import { useState } from "react";

import { TextFields } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, InputLabel, Stack, Typography, TextField, Grid } from '@mui/material';
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"
import { useCashRegister, useCreateCashRegister } from "../../../hooks/useCashRegister";
import { CashRegister } from "../../../models/cash-register.model";
import { LoadingButton } from "@mui/lab";
import { CreateCashRegisterDto } from "../../../dto/create-cash-register.dto";
import AddIcon from '@mui/icons-material/Add';
import { CashRegisterInfo } from "./CashRegisterInfo.component";
import { useCashRegisterStore } from "../../../../Common/store/cashRegisterStore";


export const CashRegisterSummary = () => {

  const [date, setDate] = useState<Date | null>(new Date());

  // const {cashRegisterQuery} = useCashRegister(format(date!, 'yyyy-MM-dd'));

  const [initialAmount, setInitialAmount] = useState<number>(0);

  const {activeCashRegister} = useCashRegisterStore(state => state)

  // const [cashRegister, setCashRegister] = useState<CashRegister | null>(null);

  const { mutateAsync, isLoading } = useCreateCashRegister();



  const handleChangeInitialAmount = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = Number(event.target.value)



    setInitialAmount(Number(event.target.value))

  }

  // const handleChangeDate = async (date: Date | null) => {
  //   setDate(date)

  //   await cashRegisterQuery.refetch().then((resp) => {
  //     console.log(resp.data)
  //     setCashRegister(resp.data || null)
  //   }
  //   )
  // }

  const onSubmitCreate = async () => {

    const data: CreateCashRegisterDto = {
      initialAmount
    }

    console.log(data)

    await mutateAsync(data)
      .then((data) => {

        // setCashRegister(data);
        
      })

  }




  return (
      <>
        {
          activeCashRegister ? (
            <>
             <CashRegisterInfo cashRegister={activeCashRegister} />
            </>

          )
            : (
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Typography variant='h4' >Añadir caja</Typography>
                </Grid>

                <Grid item xs={12} >
                  <TextField
                    label='Monto inicial'
                    type='number'
                    variant='outlined'
                    fullWidth
                    // size='small'
                    value={initialAmount}

                    onChange={handleChangeInitialAmount}

                    InputProps={{
                      startAdornment: <Typography variant='h6' >$   </Typography>,
                      inputProps: {
                        min: 0
                      }

                    }}


                  />

                </Grid>

                <Grid item xs={12} >
                  <LoadingButton
                    variant='contained'
                    fullWidth
                    loading={isLoading}
                    onClick={onSubmitCreate}
                  >
                    Añadir
                  </LoadingButton>
                </Grid>


              </Grid>
            )
        }


    </>


  )
}