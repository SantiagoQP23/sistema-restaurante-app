import { Add } from "@mui/icons-material";
import { Button, Card, Grid, Typography } from "@mui/material"
import { CardContent } from '@mui/material/';
import { createSection } from "../../EditMenu/services/sections.service";
import { CardTable } from "./CardTable.component";

export const ListTables = () => {
  return (
    <>

      <Grid container display='flex' justifyContent='space-between'>
        <Grid item>
          <Typography variant="h3">Mesas registradas: 7 </Typography>

        </Grid>
        <Grid item>

          <Button
            variant="outlined"
            startIcon={<Add />}
          >
            Añadir
          </Button>
        </Grid>

      </Grid>


      <Grid container spacing={2}>
        <Grid item>
          <CardTable />

        </Grid>
        <Grid item>
          <CardTable />


        </Grid>
      </Grid>
    </>



  )
}