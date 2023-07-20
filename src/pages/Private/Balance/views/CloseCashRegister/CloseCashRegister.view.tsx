import { Grid, Typography } from "@mui/material";
import { useCashRegisterStore } from "../../../Common/store/cashRegisterStore"
import { TitlePage } from "../../../components/TitlePage.component"
import { CashRegisterSummary } from "../CashRegister/components/CashRegisterSummary.view";
import { FormCloseCashRegister } from "../CashRegister/components/FormCloseCashRegister.component";



export const CloseCashRegister = () => {

  const { activeCashRegister } = useCashRegisterStore(state => state);





  return (
    <>
      <TitlePage
        title='Cerrar caja'
      />

      {
        activeCashRegister
          ?
          (
            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                <CashRegisterSummary />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormCloseCashRegister cashRegister={activeCashRegister} />
              </Grid>

            </Grid>

          )
          : (
            <Typography>
              as
            </Typography>

          )
      }
    </>
  )
}