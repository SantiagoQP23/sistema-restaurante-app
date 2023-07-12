import { FC, useState, useContext } from 'react';
import { IOrder, TypeOrder } from "../../../../../../models"
import { Stack, Typography, Divider, RadioGroup, FormControlLabel, Radio, TextField, Button, Card, InputAdornment, Tabs, Tab, Stepper, Step, StepLabel, StepContent, Checkbox, Box, List, ListItem, ListItemSecondaryAction, ListItemText, CardContent, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Grid, CardHeader, InputLabel } from '@mui/material';
import { AddOutlined, ArrowBackIos, ArrowRight, AttachMoney, DetailsOutlined, Print, Receipt } from "@mui/icons-material";
import { ComboBoxClient, CounterInput } from '../../../components';
import { OrderContext } from '../../../context/Order.context';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { BtnFinalConsumer } from './BtnFinalConsumer.component';
import { statusModalClientOrder } from '../../../services/sharing-information.service';
import { PaymentMethod } from '../../../models/Invoice.model';
import { useCreateInvoice } from '../../../hooks/useInvoices';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';


interface Props {
  order: IOrder;
}

export const PayOrder: FC<Props> = ({ order }) => {

  const { changeStep } = useContext(OrderContext);

  const { activeCashRegister } = useCashRegisterStore(state => state);

  const { client, setClient, discount, paymentMethod, amountPaid, setAmountPaid, setPaymentMethod, getInvoice,
    amount,
    setOrder,
    reset
  } = useInvoiceStore((state) => state)

  const createInvoiceMutation = useCreateInvoice();


  const handleChangeAmountPaid = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = Number(e.target.value);
    if (value < 0) {
      setAmountPaid(0);
      return;

    }
    setAmountPaid(value);
  }


  const difference = amountPaid - amount;


  const createClient = () => {
    statusModalClientOrder.setSubject({ value: true });
  }

  const handleChangePaymentMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };

  const submitPayment = () => {

    setOrder(order!);

    if (difference < 0) {
      alert('La cantidad pagada es menor al total de la orden');
      return;
    }
    const invoice = getInvoice();

    if (activeCashRegister) {

      invoice.cashRegisterId = activeCashRegister.id;


      createInvoiceMutation.mutateAsync(invoice).then(() => {
        reset();
      });


    } else {
      // TODO modal crear caja
    }



    console.log(invoice)

  }




  return (
    <>
      <Stack spacing={1} direction='column'>
        <Card>
          <CardHeader
            title='Cliente'

            action={
              <Box display='flex' flexDirection='row-reverse' mt={1}>

                <Button
                  size="small"
                  onClick={createClient}
                  startIcon={<AddOutlined />}
                >
                  Nuevo cliente
                </Button>

              </Box>
            }
          />
          <CardContent>
            {              // TODO: Consumidor final
            }

            <Grid
              spacing={1}
              container

            >
              <Grid item xs={12} md={6}>

                <BtnFinalConsumer />

              </Grid>

              <Grid item xs={12} md={6}>

                <ComboBoxClient handleChangeClient={setClient} client={null} />
              </Grid>

              <Grid item xs={12} md={12}>
                {
                  client && (
                    <>

                      <Box
                        sx={{
                          border: '1px solid',
                          borderColor: 'primary.main',
                          borderRadius: 1,
                          p: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.6
                        }}
                      >

                        <Typography variant='h5'>
                          {client.person.lastName} {client.person.firstName}
                        </Typography>
                        <Typography variant='subtitle1'>
                          {client.person.email}
                        </Typography>
                        <Typography variant='subtitle2'>
                          {client.person.numPhone}
                        </Typography>
                      </Box>

                    </>
                  )

                }

              </Grid>
            </Grid>
            {/* <Stack
                direction='row'
                spacing={1}
                justifyContent='space-between'
              >
                <BtnBack />
                <BtnNext />

              </Stack> */}

          </CardContent>

        </Card>

        <Card>
          <CardHeader
            title='Finalizar pago'
          />

          <CardContent>
            <Stack spacing={3} direction='column'>

              <Box>


                <InputLabel id="demo-simple-select-label">Total</InputLabel>
                <Typography variant='h4'>
                  {`$ ${amount}`}
                </Typography>
              </Box>



              <RadioGroup name="use-radio-group" value={paymentMethod} onChange={handleChangePaymentMethod}>
                <InputLabel id="demo-simple-select-label">Forma de pago</InputLabel>
                <Stack direction='row' spacing={2}>
                  <FormControlLabel value={PaymentMethod.CASH} label={'Efectivo'} control={<Radio />} />
                  <FormControlLabel value={PaymentMethod.TRANSFER} label={'Transferencia'} control={<Radio />} />
                </Stack>
              </RadioGroup>

              <TextField
                label='Cantidad pagada'
                variant='outlined'
                type='number'
                value={amountPaid}
                onChange={handleChangeAmountPaid}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 200
                }}



              />







              {
                difference > 0 && (
                  <Typography variant='h4'>

                    {`Cambio: $${difference}`}

                  </Typography>
                )
              }
              <Stack direction='row'>
                <Button

                  variant='contained'
                  onClick={submitPayment}
                >
                  Registrar pago
                </Button>

              </Stack>


              {/* <Button
              color='inherit'
              startIcon={<Print />}
            // onClick={() => { navigate('receipt') }}
            >
              Comprobante de pago
            </Button> */}

            </Stack>

          </CardContent>
        </Card>
      </Stack>



      {/* <Typography variant='h3'  >

{`Total de la orden: $${order?.total}`}

</Typography> */}
      {/* 
<Card sx={{ p: 2 }}>
        <Stepper activeStep={paymentStep} orientation='vertical'
          sx={{
            backgroundColor: 'transparent'
          }}
        >

          <Step>
            <StepLabel><Typography variant={paymentStep === 3 ? 'h4' : 'body1'} >Cliente</Typography></StepLabel>



            <StepContent>


            </StepContent>

          </Step>



          <Step>
            <StepLabel> <Typography variant={paymentStep === 4 ? 'h4' : 'body1'} >Forma de pago</Typography></StepLabel>

            <StepContent>

              <Stack spacing={3} direction='column'>



                <RadioGroup name="use-radio-group" defaultValue="first" >
                  <Stack direction='row' spacing={2}>
                    <FormControlLabel value="first" label="Efectivo" control={<Radio />} />
                    <FormControlLabel value="second" label="Transferencia" control={<Radio />} />
                  </Stack>
                </RadioGroup>

                <TextField
                  label='Cantidad pagada'
                  variant='outlined'
                  type='number'
                  value={amountPaid}
                  onChange={handleChangeAmountPaid}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: 200
                  }}



                />







                {
                  difference > 0 && (
                    <Typography variant='h4'>

                      {`Cambio: $${difference}`}

                    </Typography>
                  )
                }

                <Button

                  variant='contained'
                >
                  Registrar pago
                </Button>


                <Button
                  color='inherit'
                  startIcon={<Print />}
                // onClick={() => { navigate('receipt') }}
                >
                  Comprobante de pago
                </Button>


                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='space-between'
                >
                  <BtnBack />
                  <BtnNext />

                </Stack>


              </Stack>

            </StepContent>
          </Step>


          <Step>

            <StepLabel><Typography variant={paymentStep === 5 ? 'h4' : 'body1'} >Nota de venta</Typography></StepLabel>

            <StepContent>

              <Stack spacing={2}>
                <TextField
                  label='Nota de venta'
                  variant='outlined'
                  type='number'
                  fullWidth
                  sx={{
                    width: 200
                  }}

                />

                <Button
                  color="primary"
                  variant='contained'
                >
                  Validar
                </Button>

                <Button
                  startIcon={<Receipt />}
                  color="primary"
                  variant='contained'
                >
                  Imprimir nota de venta
                </Button>


                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='flex-start'
                >
                  <BtnBack />



                </Stack>
              </Stack>




            </StepContent>

          </Step>




        </Stepper>


      </Card > */}

      {/* <Button
        startIcon={<ArrowBackIos fontSize='small' />}
        color="inherit"
        onClick={() => changeStep(0)}
        sx={{
          my: 3
        }}
      >
        Productos
      </Button> */}



    </>
  )
}