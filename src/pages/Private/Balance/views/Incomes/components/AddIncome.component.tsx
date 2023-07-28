import { useState } from 'react';

import { Controller, useForm } from "react-hook-form"
import { Button, CardHeader, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Stack, TextField, Typography, Card, CardContent, Box, IconButton } from '@mui/material';
import { PaymentMethod } from "../../../../Orders/models/Invoice.model";
import { CreateIncomeDto } from "../../../dto/create-income.dto";
import { Close, Paid } from "@mui/icons-material";
import { useModal } from "../../../../../../hooks";
import { IClient, IUser } from "../../../../../../models";
import { ModalSelectClient } from '../../../../Clients/components/ModalSelectClient.component';
import { useCreateIncome } from '../../../hooks/useIncomes';
import { LoadingButton } from '@mui/lab';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';
import { ModalSelectUser } from '../../../../Users/components/ModalSelectUser.component';

const incomeInitialForm: CreateIncomeDto = {
  description: '',
  amount: 0,
  paymentMethod: PaymentMethod.CASH,
  responsibleId: '',
  cashRegisterId: '',
}

export const AddIncome = () => {

  const { handleClose, handleOpen, isOpen } = useModal();

  const { activeCashRegister } = useCashRegisterStore(state => state)

  const [client, setClient] = useState<IClient | null>(null);



  const [responsibleUser, setResponsibleUser] = useState<IUser|null>(null);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateIncomeDto>({
    defaultValues: incomeInitialForm
  });

  const { mutateAsync, isLoading } = useCreateIncome();

  const handleChangeClient = (client: IClient | null) => {

    setClient(client);
  }

  const handleChangeResponsible = (user: IUser | null) => {

    setResponsibleUser(user);

  }


  const onSubmit = (form: CreateIncomeDto) => {

    // if (client) {
    //   form.clientId = client.id;
    // }

    if (activeCashRegister) {

      form.cashRegisterId = activeCashRegister.id;

      if (responsibleUser) {
        form.responsibleId = responsibleUser.id;
      }

      mutateAsync(form).then(() => {
        reset();
      });

    }

  }

  return (
    <>

      {/* <ModalSelectClient open={isOpen} onClose={handleClose} onChange={handleChangeClient} /> */}
      <ModalSelectUser 
      open={isOpen}
      onClose={handleClose}
      onChange={handleChangeResponsible}
      />

      <Card  >

        <CardHeader
          avatar={<Paid color='success' sx={{ fontSize: 40 }} />}
          title='Añadir ' />

        <CardContent>


          <FormControl fullWidth component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              <Grid item xs={12} >
                <TextField
                  label="Descripción"
                  type="text"
                  fullWidth
                  {
                  ...register('description', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' },
                  })
                  }
                  rows={2}

                  error={!!errors.description}
                  helperText={errors.description?.message}



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

                  helperText={errors.amount?.message}

                />
              </Grid>

              {/* <Grid item xs={12} >
                <TextField
                  label="Responsable"
                  type="text"
                  fullWidth
                  {
                  ...register('responsible', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' },
                  })
                  }
                  rows={2}
                  error={!!errors.responsible}
                  helperText={errors.responsible?.message}



                />


              </Grid> */}


              <Grid item xs={12}>
                <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                  <Typography variant="subtitle2">
                    Responsable
                  </Typography>
                  <Box>


                    <Button
                      onClick={handleOpen}
                    >{responsibleUser ? 'Cambiar' : 'Seleccionar'}</Button>
                    {
                      responsibleUser && (
                        <IconButton color="error" onClick={() => handleChangeResponsible(null)}>
                          <Close />
                        </IconButton>)
                    }
                  </Box>

                </Stack>
                <Typography variant="h6">
                  {responsibleUser ? `${responsibleUser.person.firstName} ${responsibleUser.person.lastName} ` : 'No seleccionado'}
                </Typography>


              </Grid>

              {/* <Button
                onClick={handleOpen}
              >{client ? 'Cambiar' : 'Seleccionar'}</Button>
              {
                client && (
                  <IconButton color="error" onClick={() => handleChangeClient(null)}>
                    <Close />
                  </IconButton>)
              }
            

        </Grid> */}
        <Grid item xs={12} >

          <Controller

            name='paymentMethod'
            control={control}

            render={
              ({ field: { onChange, onBlur, value } }) => (
                <FormControl fullWidth>
                  <RadioGroup name="use-radio-group" value={value} onChange={onChange} >
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

        <Grid item xs={12}>
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

    </FormControl >
        </CardContent >


      </Card >








    </>
  )
}