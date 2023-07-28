import { Controller, useForm } from "react-hook-form"
import { CreateExpenseDto } from "../../../dto/create-expense.dto";
import { Button, CardHeader, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Stack, TextField, Typography, Card, CardContent, IconButton, Box } from '@mui/material';
import { PaymentMethod } from "../../../../Orders/models/Invoice.model";
import { ModalSelectSupplier } from "../../../../Suppliers/components/ModalSelectSupplier.component";
import { useModal } from "../../../../../../hooks";
import { useState } from "react";
import { Supplier } from "../../../../Suppliers/models/supplier.model";
import { Close, Paid } from "@mui/icons-material";
import { useCreateExpense } from "../../../hooks/useExpenses";
import { LoadingButton } from "@mui/lab";
import { useCashRegisterStore } from "../../../../Common/store/cashRegisterStore";
import { ModalSelectUser } from "../../../../Users/components/ModalSelectUser.component";
import { IUser } from "../../../../../../models";

const expenseInitialForm: CreateExpenseDto = {
  description: '',
  amount: 0,
  paymentMethod: PaymentMethod.CASH,
  responsibleId: '',
  cashRegisterId: '',
}

export const AddExpense = () => {

  const { handleClose, isOpen, handleOpen } = useModal();

  const { activeCashRegister } = useCashRegisterStore(state => state);

  const [responsibleUser, setResponsibleUser] = useState<IUser | null>(null);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateExpenseDto>({
    defaultValues: expenseInitialForm
  });

  const [supplier, setSupplier] = useState<Supplier | null>(null);

  const { mutate, isLoading, mutateAsync } = useCreateExpense();

  const handleChangeResponsible = (user: IUser | null) => {

    setResponsibleUser(user);

  }


  const onSubmit = (form: CreateExpenseDto) => {

    if (activeCashRegister) {

      form.cashRegisterId = activeCashRegister.id;

      if (responsibleUser) {
        form.responsibleId = responsibleUser.id;
      }
      

      mutateAsync(form).then(() => {
        reset();
      });

    } else {
      // TODO modal crear caja
    }



  }




  return (
    <>
    <ModalSelectUser 
      open={isOpen}
      onClose={handleClose}
      onChange={handleChangeResponsible}
      />


      <Card  >

        <CardHeader
          avatar={<Paid color='warning' sx={{ fontSize: 40 }} />}
          title='Añadir Gasto' />

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

                  error={!!errors.amount}
                  helperText={errors.amount?.message}

                />
              </Grid>
{/* 
              <Grid item xs={12} >
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

              <Grid item xs={12} md={8}>

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
                  color="warning"
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