import { useState } from 'react';

import { Controller, useForm } from "react-hook-form"
import { Button, CardHeader, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Stack, TextField, Typography, Card, CardContent, Box, IconButton } from '@mui/material';
import { PaymentMethod } from "../../../../Orders/models/Invoice.model";
import { CreateIncomeDto } from "../../../dto/create-income.dto";
import { Close, Paid } from "@mui/icons-material";
import { useModal } from "../../../../../../hooks";
import { IClient } from "../../../../../../models";
import { ModalSelectClient } from '../../../../Clients/components/ModalSelectClient.component';
import { useCreateIncome } from '../../../hooks/useIncomes';
import { LoadingButton } from '@mui/lab';

const incomeInitialForm: CreateIncomeDto = {
  description: '',
  amount: 0,
  paymentMethod: PaymentMethod.CASH
}

export const AddIncome = () => {

  const { handleClose, handleOpen, isOpen } = useModal();

  const [client, setClient] = useState<IClient | null>(null);

  const { register, handleSubmit, formState: { errors }, control } = useForm<CreateIncomeDto>({
    defaultValues: incomeInitialForm
  });

  const { mutateAsync, isLoading } = useCreateIncome();

  const handleChangeClient = (client: IClient | null) => {

    setClient(client);
  }


  const onSubmit = (form: CreateIncomeDto) => {

    if (client) {
      form.clientId = client.id;
    }

    mutateAsync(form);


    console.log(form)

  }

  return (
    <>

      <ModalSelectClient open={isOpen} onClose={handleClose} onChange={handleChangeClient} />

      <Card  >

        <CardHeader
          avatar={<Paid color='success' sx={{ fontSize: 40 }} />}
          title='Añadir ingreso' />

        <CardContent>


          <FormControl fullWidth component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              <Grid item xs={12} >
                {/* <InputLabel id="demo-simple-select-label">Nombre</InputLabel> */}
                <TextField
                  label="Nombre"
                  type="text"
                  // placeholder="Nombre del gasto"
                  fullWidth
                  {
                  ...register('description', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' },
                  })
                  }
                  rows={2}
                  helperText={<Typography color="red">{errors.description?.message} </ Typography>}


                />


              </Grid>
              <Grid item xs={12} >

                <TextField
                  label="Monto"
                  type="number"
                  fullWidth
                  inputProps={{ step: 0.05, min: 0.05 }}

                  {
                  ...register('amount', {
                    required: 'Este campo es requerido',
                    min: { value: 0.05, message: 'Debe ser mayor a 5 centavos' },
                    valueAsNumber: true
                  })
                  }

                  helperText={<Typography color="red">{errors.amount?.message} </ Typography>}

                />
              </Grid>


              <Grid item xs={12}>
                <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                  <Typography variant="subtitle2">
                    Cliente
                  </Typography>
                  <Box>

                    <Button
                      onClick={handleOpen}
                    >{client ? 'Cambiar' : 'Seleccionar'}</Button>
                    {
                      client && (
                        <IconButton color="error" onClick={() => handleChangeClient(null)}>
                          <Close />
                        </IconButton>)
                    }
                  </Box>

                </Stack>
                <Typography variant="h6">
                  {client ? `${client.person.firstName} ${client.person.lastName} ` : 'No seleccionado'}
                </Typography>


              </Grid>
              <Grid item xs={12} >

                <Controller

                  name='paymentMethod'
                  control={control}

                  render={
                    ({ field: { onChange, onBlur, value } }) => (
                      <FormControl fullWidth>
                        <RadioGroup name="use-radio-group" value={value} onChange={onChange} >
                          <Typography variant="subtitle2">
                            Metodo de pago
                          </Typography>
                          <Stack direction='row' spacing={2}>
                            <FormControlLabel value={PaymentMethod.CASH} label={'Efectivo'} control={<Radio />} />
                            <FormControlLabel value={PaymentMethod.TRANSFER} label={'Transferencia'} control={<Radio />} />
                          </Stack>
                        </RadioGroup>
                      </FormControl>

                    )
                  }


                />
              </Grid>

              <Grid item direction='row' xs={12}>
                <LoadingButton
                  variant="contained"
                  color="success"
                  type="submit"
                  loading={isLoading}
                  fullWidth


                >
                  Guardar
                </LoadingButton>

              </Grid>

            </Grid>

          </FormControl>
        </CardContent>


      </Card>








    </>
  )
}