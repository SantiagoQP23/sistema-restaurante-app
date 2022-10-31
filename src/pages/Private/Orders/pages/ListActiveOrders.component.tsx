import { Card, CardContent, CardHeader, Grid } from "@mui/material"
import { ActiveOrder } from "../components/ActiveOrder.component"

export const ListActiveOrders = () => {
  return (
    <>
      <Card >
        <CardHeader title={
          <>
          </>} />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <ActiveOrder />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActiveOrder />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActiveOrder />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActiveOrder />
            </Grid>

          </Grid>


        </CardContent>
      </Card>

    </>
  )
}