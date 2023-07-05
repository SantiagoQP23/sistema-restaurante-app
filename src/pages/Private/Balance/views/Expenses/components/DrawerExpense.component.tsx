import { useState, useEffect } from 'react';

import { Box, Button, Divider, Drawer, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Expense } from '../../../models/expense.model';
import { FC } from 'react';
import { Close, CloseOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';
import { Supplier } from '../../../../Suppliers/models/supplier.model';
import { UpdateExpenseDto } from '../../../dto/update-expense.dto';
import { useModal } from '../../../../../../hooks';
import { useUpdateExpense } from '../../../hooks/useExpenses';
import { ModalSelectSupplier } from '../../../../Suppliers/components/ModalSelectSupplier.component';


interface Props {
  open: boolean;
  onClose: () => void;
  expense: Expense
}


export const DrawerExpense: FC<Props> = ({
  open, onClose, expense
}) => {

  const [supplier, setSupplier] = useState<Supplier | null>(expense.supplier || null);

  const { handleClose, isOpen, handleOpen } = useModal();

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<UpdateExpenseDto>({
    
  });


  const { mutateAsync, isLoading } = useUpdateExpense();

  const handleChangeSupplier = (supplier: Supplier | null) => {

    setSupplier(supplier);

  }


  const onSubmit = (form: UpdateExpenseDto) => {

    if (supplier) {
      form.supplierId = supplier.id;
    }

    mutateAsync({ ...form, id: expense.id });


  }


  useEffect(() => {

    console.log('expense change')
    setSupplier(expense.supplier || null);

    setValue('description', expense.transaction.description);
    setValue('amount', expense.transaction.amount);
    setValue('paymentMethod', expense.transaction.paymentMethod);
  }, [expense])




  const theme = useTheme();

  return (

    <>

      <ModalSelectSupplier open={isOpen} onClose={handleClose} onChange={handleChangeSupplier} />

      <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
        sx={{
          width: 'auto',
          zIndex: 1550
        }}

      >
        <Box
          sx={{
            display: 'flex',
            p: 1,
            [theme.breakpoints.down('sm')]:

              { width: '100vw' },
            [theme.breakpoints.up('sm')]:
              { width: 500, flexShrink: 0 },

            // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
          }}
        >


          <Stack direction='column' spacing={2} width='100%'>

            <Stack direction='row' justifyContent='space-between' alignItems='center'>

              <IconButton
                onClick={onClose}
              >
                <CloseOutlined />
              </IconButton>
              <Stack direction='row' spacing={1} >

                <Button
                  variant='outlined'
                  color='error'
                  size='small'
                >
                  Eliminar
                </Button>

              </Stack>


            </Stack>
            <Divider />


            <Box px={2}>

              <Typography variant="h4"  >

                Editar ingreso
              </Typography>
            </Box>





            <FormControl fullWidth component='form' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} p={2}>

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
                    color="primary"
                    type="submit"
                    loading={isLoading}

                  >
                    Guardar
                  </LoadingButton>

                </Grid>

              </Grid>

            </FormControl>


          </Stack>

        </Box>


      </Drawer>
    </>
  )
}


