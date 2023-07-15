import { Card, CardHeader, CardContent } from "@mui/material"
import { FormAddCashRegister } from "../../CashRegister/components/FormAddCashRegister.component"



export const CardAddCashRegister = () => {
  return (
    <>
      <Card>
        <CardHeader
          title='Agregar caja'

        />
        <CardContent>
          <FormAddCashRegister />


        </CardContent>
      </Card>

    </>
  )
}