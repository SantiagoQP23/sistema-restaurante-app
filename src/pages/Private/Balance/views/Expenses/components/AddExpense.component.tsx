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

const expenseInitialForm: CreateExpenseDto = {
  description: '',
  amount: 0,
  paymentMethod: PaymentMethod.CASH,
  responsible: '',
  cashRegisterId: '',
}

export const AddExpense = () => {

  const { handleClose, isOpen, handleOpen } = useModal();

  const {activeCashRegister}= useCashRegisterStore(state => state)

  const { register, handleSubmit, formState: { errors }, control } = useForm<CreateExpenseDto>({
    defaultValues: expenseInitialForm
  });

  const [supplier, setSupplier] = useState<Supplier | null>(null);

  const { mutate, isLoading, mutateAsync } = useCreateExpense();

  const onSubmit = (form: CreateExpenseDto) => {


    if (supplier) {
      form.supplierId = supplier.id;
    }

    if(activeCashRegister){

      form.cashRegisterId=activeCashRegister.id;

      mutateAsync(form);

    }else {
      // TODO modal crear caja
    }



  }

  const handleChangeSupplier = (supplier: Supplier | null) => {

    setSupplier(supplier);

  }



  return (
    <>

      <Card  >

        <CardHeader
          avatar={<Paid color='warning' sx={{ fontSize: 40 }} />}
          title='Añadir Gasto' />

        <CardContent>





          <FormControl fullWidth component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              <Grid item xs={12} >
                {/* <InputLabel id="demo-simple-select-label">Nombre</InputLabel> */}
                <TextField
                  label="Descripción"
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
                {/* <InputLabel id="demo-simple-select-label">Nombre</InputLabel> */}
                <TextField
                  label="Responsable"
                  type="text"
                  // placeholder="Nombre del gasto"
                  fullWidth
                  {
                  ...register('responsible', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' },
                  })
                  }
                  rows={2}
                  helperText={<Typography color="red">{errors.responsible?.message} </ Typography>}


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
                    Proveedor
                  </Typography>
                  <Box>

                    <Button
                      onClick={handleOpen}
                    >{supplier ? 'Cambiar' : 'Seleccionar'}</Button>
                    {
                      supplier && (
                        <IconButton color="error" onClick={() => handleChangeSupplier(null)}>
                          <Close />
                        </IconButton>)
                    }
                  </Box>

                </Stack>
                <Typography variant="h6">
                  {supplier ? `${supplier.person.firstName} ${supplier.person.lastName} ` : 'No seleccionado'}
                </Typography>


              </Grid>



              {/* <Grid item xs={12} md={4}>

          </Grid> */}
              <Grid item xs={12} md={8}>

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



      <ModalSelectSupplier open={isOpen} onClose={handleClose} onChange={handleChangeSupplier} />




    </>
  )
}