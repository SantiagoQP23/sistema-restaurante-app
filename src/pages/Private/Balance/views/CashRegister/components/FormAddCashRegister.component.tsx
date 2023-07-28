import { LoadingButton } from "@mui/lab"
import { Grid, Typography, TextField, InputLabel } from '@mui/material';
import { CreateCashRegisterDto } from "../../../dto/create-cash-register.dto";
import { useState } from "react";
import { useCreateCashRegister } from "../../../hooks/useCashRegister";
import { format } from "date-fns";


export const FormAddCashRegister = () => {

  const [initialAmount, setInitialAmount] = useState<number>(0);


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
      <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent='space-between' >
          <InputLabel >Hora de apertura</InputLabel>
          <Typography variant='h6' >{format(new Date(), 'dd/MM/yyyy HH:mm')}</Typography>
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
    </>
  )
}