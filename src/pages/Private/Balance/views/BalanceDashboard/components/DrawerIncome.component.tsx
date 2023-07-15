import { useState,useEffect } from 'react';

import { Box, Button, Divider, Drawer, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Expense } from '../../../models/expense.model';
import { FC } from 'react';
import { Income } from '../../../models/income.model';
import { Close, CloseOutlined } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { UpdateIncomeDto } from '../../../dto/update-income.dto';
import { LoadingButton } from '@mui/lab';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';
import { useModal } from '../../../../../../hooks';
import { IClient } from '../../../../../../models';
import { useUpdateIncome } from '../../../hooks/useIncomes';
import { ModalSelectClient } from '../../../../Clients/components/ModalSelectClient.component';


interface Props {
  open: boolean;
  onClose: () => void;
  income: Income
}


export const DrawerIncome: FC<Props> = ({
  open, onClose, income
}) => {
  const [client, setClient] = useState<IClient | null>(income.client || null);

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<UpdateIncomeDto>({
    defaultValues: {
      description: income.transaction.description,
      amount: income.transaction.amount,
      paymentMethod: income.transaction.paymentMethod
    }
  });

  const { handleClose, isOpen, handleOpen } = useModal();


  const theme = useTheme();

  const { mutateAsync, isLoading } = useUpdateIncome();

  const handleChangeClient = (client: IClient | null) => {

    setClient(client);

  }


  const onSubmit = (form: UpdateIncomeDto) => {

    if (client) {
      form.clientId = client.id;
    }

    mutateAsync({ ...form, id: income.id });

  }

  useEffect(() => {
    setClient(income.client || null);
    setValue('description', income.transaction.description);
    setValue('amount', income.transaction.amount);
    setValue('paymentMethod', income.transaction.paymentMethod);

  }, [income])





  return (
    <>

      {/* <ModalSelectClient open={isOpen} onClose={handleClose} onChange={handleChangeClient} /> */}

      <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
        sx={{
          width: 'auto',
          zIndex: 1500
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


            <FormControl fullWidth component='form' onSubmit={handleSubmit(onSubmit)} >
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


                <Grid item xs={12}>
                  {/* <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
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

                  </Stack> */}
                  {/* <Typography variant="h6">
                    {client ? `${client.person.firstName} ${client.person.lastName} ` : 'No seleccionado'}
                  </Typography> */}


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

                <Grid item  xs={12}>
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


