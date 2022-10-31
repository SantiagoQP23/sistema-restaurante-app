import { Add, Dialpad } from "@mui/icons-material";
import { Button, Card, Grid, Typography } from "@mui/material"
import { CardContent } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from "../../EditMenu/services/sections.service";
import { CardTable } from "./CardTable.component";
import { useNavigate } from 'react-router-dom';
import { resetactiveTable, selectTables } from "../../../../redux/slices/tables";

export const ListTables = () => {


  const { tables } = useSelector(selectTables);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTable = () => {
    dispatch(resetactiveTable())
    navigate('edit');;
  }

  return (
    <>

      <Grid container display='flex' justifyContent='space-between' alignItems='center' my={1}>
        <Grid item>
          <Typography variant="h5">Mesas registradas: {tables.length}</Typography>

        </Grid>
        <Grid item>

          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={createTable}
          >
            Añadir
          </Button>
        </Grid>

      </Grid>

      {
        tables.length === 0
          ? <Typography>No se han registrado mesas</Typography>
          : <Grid container spacing={2}>
            {
              tables.map(table => (
                <Grid item xs={6} sm={2}>

                  <CardTable table={table} />

                </Grid>
              ))}
          </Grid>




      }

    </>



  )
}