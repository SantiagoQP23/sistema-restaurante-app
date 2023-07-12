import { FC, ChangeEvent, useState } from 'react';
import { Stack, Box, InputLabel, Typography, Button, Stepper, Step, StepLabel, Divider, TextField } from '@mui/material';
import { format } from "date-fns"
import { CashRegister } from "../../../models/cash-register.model"
import { Add, Close, ExpandLess, PointOfSale, Remove, RemoveCircle } from '@mui/icons-material';
import { FormCashIncome } from './FormCashIncome.component';
import { useModal } from '../../../../../../hooks';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';
import { ActiveCashRegister } from '../../../services/cash-register.service';



interface Props {
  cashRegister: ActiveCashRegister
}

export const CashRegisterInfo: FC<Props> = ({ cashRegister }) => {


  const { isOpen, handleClose, handleOpen, toggleModal} = useModal();

  const [finalAmount, setFinalAmount] = useState<number>(0);

  const [closingNotes, setClosingNotes] = useState<string>('')

  const { openCreate } = useCashRegisterStore(state => state)

  const handleChangeFinalAmount = (e: ChangeEvent<HTMLInputElement>) => {

    let value = Number(e.target.value);

    if (Number.isNaN(value)) value = 0;

    setFinalAmount(value)

  }

  const handleChangeClosingNotes = (e: ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value

    setClosingNotes(value)

  }

  const discrepancyAmount = cashRegister.balance - finalAmount



  return (
    <>

      <Stack direction='column' spacing={2} justifyContent='flex-end'>
        {/* <Box>

            <InputLabel id="date">Fecha</InputLabel>
            <Typography variant='h6' >{format(new Date(), 'yyyy-MM-dd')}</Typography>
          </Box> */}

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Creado por</InputLabel>
          <Typography variant='h5'  >{cashRegister.user.person.firstName} {cashRegister.user.person.lastName}</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Fecha</InputLabel>
          <Typography variant='h5'  >{format(new Date(cashRegister.createdAt), 'yyyy-MM-dd HH:mm')}</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Monto inicial</InputLabel>
          <Typography variant='h5'  >$ {cashRegister.initialAmount}</Typography>

        </Box>
        {/* {
            cashRegister.cashIncomes.length > 0 && cashRegister.cashIncomes.map((cashIncome) => (
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <InputLabel id="date">Hora: {format(new Date(cashIncome.createdAt), 'HH:mm')}</InputLabel>
                <Typography variant='h5'  >$ {cashIncome.amount}</Typography>
              </Box>
            ))
          } */}

        {/* <Box display='flex' justifyContent='space-between' alignItems='center'>
            <InputLabel id="date">11:35</InputLabel>


            <Typography
              color='success.main'
            >
              $ 500.00
            </Typography>

          </Box> */}
        {/* <Box display='flex' justifyContent='right' alignItems='center'>

          {
            !isOpen ? (

              <Button
                color="success"
                startIcon={<Add />}
                size='small'
                onClick={handleOpen}

              >
                Añadir dinero
              </Button>

            ) : (
              null

            )
          }

        </Box>
        <Box>






        





        </Box>



        <Box>

          {
            isOpen &&
            <FormCashIncome handleClose={handleClose} cashRegisterId={cashRegister.id}/>

          }
        </Box> */}

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Ventas</InputLabel>
          <Typography variant='h4' color='success.main' >$ {cashRegister.totalInvoicesCash}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Ingresos</InputLabel>
          <Typography variant='h4' color='success.main'>$ {cashRegister.totalIncomesCash}</Typography>

        </Box>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Gastos</InputLabel>
          <Typography variant='h4' color='error.main'>$ {cashRegister.totalExpensesCash}</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Monto final</InputLabel>
          <Typography variant='h3' >$ {cashRegister.balance}</Typography>
        </Box>

        <Box display='flex' justifyContent='right' alignItems='center'>

          <Button
            variant='text'
            onClick={toggleModal}
            startIcon={isOpen ? <Close /> : <PointOfSale />}
          >
            {
              isOpen ? 'Cancelar' : 'Cerrar caja'
            }
          </Button>
        </Box>

        {
          isOpen && (
            <>

              <InputLabel id="amount">¿Cuánto dinero tiene en efectivo?</InputLabel>
              <TextField

                value={finalAmount}

                onChange={handleChangeFinalAmount}
              />

              {
                finalAmount > 0 && discrepancyAmount !== 0 && (
                  <>
                    <Box
                      sx={{
                        backgroundColor: discrepancyAmount === 0 ? 'success.main' : 'warning.main',
                        padding: '1rem',
                        borderRadius: '1rem',
                        color: 'black'


                      }}
                    >
                      <Typography variant='body1'>Tienes un descuadre. {discrepancyAmount < 0 ? 'Te sobran ' : 'Te faltan'} $ {Math.abs(discrepancyAmount)}</Typography>

                    </Box>
                    <TextField


                      value={closingNotes}

                      onChange={handleChangeClosingNotes}
                      multiline

                      label='Notas de cierre'

                      rows={3}

                    />
                  </>

                )
              }

              <Button
                variant='contained'
              >
                Cerrar caja
              </Button>



            </>
          )
        }

        <Divider />

        <Typography variant='h6' >Transferencias</Typography>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Ventas</InputLabel>
          <Typography variant='h4' color='success.main' >$ {cashRegister.totalInvoicesTransfer}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Ingresos</InputLabel>

          <Typography variant='h4' color='success.main'>$ {cashRegister.totalIncomesTransfer}</Typography>

        </Box>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Gastos</InputLabel>

          <Typography variant='h4' color='error.main'>$ {cashRegister.totalExpensesTransfer}</Typography>

        </Box>

      </Stack>


    </>
  )
}