import { FC, ChangeEvent, useState } from 'react';
import { Stack, Box, InputLabel, Typography, Button, Stepper, Step, StepLabel, Divider, TextField, Card, CardHeader, CardContent } from '@mui/material';
import { format } from "date-fns"
import { CashRegister } from "../../../models/cash-register.model"
import { Add, Close, ExpandLess, PointOfSale, Remove, RemoveCircle } from '@mui/icons-material';
import { FormCashIncome } from './FormCashIncome.component';
import { useModal } from '../../../../../../hooks';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';
import { ActiveCashRegister } from '../../../services/cash-register.service';
import { UpdateCashRegisterDto } from '../../../dto/update-cash-register.dto';
import { useUpdateCashRegister } from '../../../hooks/useCashRegister';



interface Props {
  cashRegister: ActiveCashRegister
}

export const CashRegisterInfo: FC<Props> = ({ cashRegister }) => {


  const { isOpen, handleClose, handleOpen, toggleModal } = useModal();

  const [finalAmount, setFinalAmount] = useState<number>(0);

  const [closingNote, setClosingNote] = useState<string>('')

  const { openCreate } = useCashRegisterStore(state => state);

  const updateCashMutation = useUpdateCashRegister();



  return (
    <>

      <Card>

        <CardHeader
          title='Resumen de caja'

        />
        <CardContent >



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

            {/* <Box display='flex' justifyContent='right' alignItems='center'>

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

              

            </>
          )
        }

        <Divider /> */}


          </Stack>


        </CardContent>

      </Card>
      <Card sx={{mt: 2}}>
        <CardHeader

          title='Resumen de transferencias'
        />

        <CardContent>
          <Stack direction='column' spacing={2} justifyContent='flex-end'>

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


        </CardContent>

      </Card>


    </>
  )
}