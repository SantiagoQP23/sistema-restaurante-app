import { FC } from 'react';
import { Stack, Box, InputLabel, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import { format } from "date-fns"
import { CashRegister } from "../../../models/cash-register.model"
import { Add, Close, ExpandLess } from '@mui/icons-material';
import { FormCashIncome } from './FormCashIncome.component';
import { useModal } from '../../../../../../hooks';



interface Props {
  cashRegister: CashRegister
}

export const CashRegisterInfo: FC<Props> = ({ cashRegister }) => {


  const { isOpen, handleClose, handleOpen } = useModal();



  return (
    <>

      <Stack direction='column' spacing={2} justifyContent='flex-end'>
        {/* <Box>

            <InputLabel id="date">Fecha</InputLabel>
            <Typography variant='h6' >{format(new Date(), 'yyyy-MM-dd')}</Typography>
          </Box> */}

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Fecha</InputLabel>
          <Typography variant='h5'  >{format(new Date(cashRegister.createdAt), 'yyyy-MM-dd')}</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Monto inicial</InputLabel>
          <Typography variant='h5'  >$ {cashRegister.initialAmount}</Typography>

        </Box>
          {
            cashRegister.cashIncomes.length > 0 && cashRegister.cashIncomes.map((cashIncome) => (
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <InputLabel id="date">Hora: {format(new Date(cashIncome.createdAt), 'HH:mm')}</InputLabel>
                <Typography variant='h5'  >$ {cashIncome.amount}</Typography>
              </Box>
            ))
          }

        {/* <Box display='flex' justifyContent='space-between' alignItems='center'>
            <InputLabel id="date">11:35</InputLabel>


            <Typography
              color='success.main'
            >
              $ 500.00
            </Typography>

          </Box> */}
        <Box display='flex' justifyContent='right' alignItems='center'>

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
        </Box>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Ventas</InputLabel>
          <Typography variant='h4' color='success.main' >$ 500.00</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Ingresos</InputLabel>
          <Typography variant='h4' color='success.main'>$ 500.00</Typography>

        </Box>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Gastos</InputLabel>
          <Typography variant='h4' color='error.main'>$ 500.00</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>

          <InputLabel id="date">Monto final</InputLabel>
          <Typography variant='h3' >$ 777.00</Typography>
        </Box>


        <Button
          variant='contained'
        >
          Cerrar caja
        </Button>
      </Stack>


    </>
  )
}