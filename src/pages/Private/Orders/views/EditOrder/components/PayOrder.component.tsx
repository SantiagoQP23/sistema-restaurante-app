import { FC, useState, useContext } from 'react';
import { IOrder, TypeOrder } from "../../../../../../models"
import { Stack, Typography, Divider, RadioGroup, FormControlLabel, Radio, TextField, Button, Card, InputAdornment, Tabs, Tab, Stepper, Step, StepLabel, StepContent, Checkbox, Box, List, ListItem, ListItemSecondaryAction, ListItemText, CardContent, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Grid, CardHeader, InputLabel, Container } from '@mui/material';
import { AddOutlined, ArrowBackIos, ArrowRight, AttachMoney, CardGiftcard, Close, CreditCard, DetailsOutlined, MonetizationOnOutlined, Money, Payment, Print, Receipt } from "@mui/icons-material";
import { ComboBoxClient, CounterInput } from '../../../components';
import { OrderContext } from '../../../context/Order.context';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { BtnFinalConsumer } from './BtnFinalConsumer.component';
import { statusModalClientOrder } from '../../../services/sharing-information.service';
import { PaymentMethod } from '../../../models/Invoice.model';
import { useCreateInvoice } from '../../../hooks/useInvoices';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';
import { useCreateInvoiceOrder } from '../../../hooks/useInvocesOrder';
import { LoadingButton } from '@mui/lab';


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

  // const createInvoiceMutation = useCreateInvoice();

  const { createInvoiceOrder, loading } = useCreateInvoiceOrder();


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

      createInvoiceOrder(invoice);


      // createInvoiceMutation.mutateAsync(invoice).then(() => {
      //   reset();
      // });


    } else {

      alert('No hay caja activa');
      // TODO modal crear caja
    }



    console.log(invoice)

  }




  return (
    <>
      <Stack spacing={1} direction='column' mb={3}>
        <CardHeader
          title='1. Cliente'

          action={
            <Box display='flex' flexDirection='row-reverse' mt={1}>
              {
                client && (
                  <Button
                    onClick={() => setClient(null)}
                    startIcon={<Close />}
                    size='small'
                    color='error'
                  >
                    Cambiar
                  </Button>)
              }

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
        {/* <Card> */}
        <CardContent>


          <Grid
            spacing={1}
            container

          >

            {


              !client && (
                <>
                  <Grid item xs={12} md={6}>

                    <Card
                      sx={{
                        p: 1
                      }}
                    >
                      <BtnFinalConsumer />

                    </Card>


                  </Grid>

                  <Grid item xs={12} md={6}>

                    <Card
                      sx={{
                        p: 1
                      }}
                    >
                      <ComboBoxClient handleChangeClient={setClient} client={null} />

                    </Card>
                  </Grid>
                </>
              )

            }

            <Grid item xs={12} md={12}>
              {
                client && (
                  <>



                    <Card
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
                    </Card>

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

        {/* </Card> */}

        {/* <Container maxWidth='sm'> */}


        {

          client &&
          <>
            <CardHeader
              title='2. Finalizar pago'
            />
            {/* <Card> */}

            <CardContent>
              <Stack spacing={2} direction='column'>




                <InputLabel id="demo-simple-select-label">Forma de pago</InputLabel>

                <RadioGroup name="use-radio-group" value={paymentMethod} onChange={handleChangePaymentMethod}>
                  <Grid container spacing={2}>

                    <Grid item xs={12} md={6} >
                      <Card
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1
                        }}
                      >

                        <FormControlLabel value={PaymentMethod.CASH} label={'Efectivo'} control={<Radio />} />
                        <MonetizationOnOutlined color='success' />

                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1
                        }}

                      >
                        <FormControlLabel value={PaymentMethod.TRANSFER} label={'Transferencia'} control={<Radio />} />
                        <CreditCard color='warning' />





                      </Card>
                    </Grid>
                  </Grid>
                </RadioGroup>

                <Box display='flex' flexDirection='column' alignContent='center' alignItems='center' gap={1}>

                  <Typography variant='subtitle2'> Total a pagar</Typography>
                  <Typography variant='h2'>
                    {`$ ${amount}`}
                  </Typography>
                </Box>

                <Divider />

                <Stack direction='row' justifyContent='center'>

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
                </Stack>







                {
                  difference >= 0 && (
                    <Typography variant='h4' textAlign='center'>

                      {`Cambio: $${difference}`}

                    </Typography>
                  )
                }
                <Stack direction='row' justifyContent='center'>
                  <LoadingButton
                    loading={loading}

                    variant='contained'
                    onClick={submitPayment}
                    startIcon={paymentMethod === PaymentMethod.CASH ? <MonetizationOnOutlined /> : <CreditCard />}
                  >
                    Registrar pago
                  </LoadingButton>

                </Stack>


              </Stack>

            </CardContent>
            {/* </Card> */}
          </>
        }


        {/* </Container> */}

      </Stack>





    </>
  )
}