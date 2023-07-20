import { Box, Button, Card, CardContent, CardHeader, InputLabel, Stack, TextField, Typography } from "@mui/material"
import { ChangeEvent, FC, useState } from "react";
import { UpdateCashRegisterDto } from "../../../dto/update-cash-register.dto";
import { useUpdateCashRegister } from "../../../hooks/useCashRegister";
import { ActiveCashRegister } from "../../../services/cash-register.service";



interface Props {
  cashRegister: ActiveCashRegister
}


export const FormCloseCashRegister: FC<Props> = ({ cashRegister }) => {

  const [finalAmount, setFinalAmount] = useState<number>(0);

  const [closingNote, setClosingNote] = useState<string>('');

  const updateCashMutation = useUpdateCashRegister();




  const handleChangeFinalAmount = (e: ChangeEvent<HTMLInputElement>) => {

    let value = Number(e.target.value);

    if (Number.isNaN(value)) value = 0;

    setFinalAmount(value)

  }

  const handleChangeClosingNote = (e: ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value

    setClosingNote(value)

  }


  const handleSubmit = () => {

    const data: UpdateCashRegisterDto = {
      id: cashRegister.id,
      finalAmount,
      closingNote
    }

    // updateCashMutation.mutate(data)


  }


  const discrepancyAmount = cashRegister.balance - finalAmount



  return (

    <>
      <Card>
        <CardHeader
          title='Cerrar caja'
        />
        <CardContent>
          <Stack spacing={2}>


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


                    value={closingNote}

                    onChange={handleChangeClosingNote}
                    multiline

                    label='Notas de cierre'

                    rows={3}

                  />
                </>

              )
            }

            <Button
              variant='contained'
              onClick={handleSubmit}
            >
              Cerrar caja
            </Button>
          </Stack>




        </CardContent>
      </Card>
    </>
  )
}