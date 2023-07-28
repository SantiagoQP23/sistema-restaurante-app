import { Add, } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { CardTable } from "../../components/CardTable.component";
import { useNavigate } from 'react-router-dom';
import { resetactiveTable, selectTables, setActiveTable } from "../../../../../redux/slices/tables";
import { DeleteTable } from '../../components/DeleteTable.component';
import { TitlePage } from "../../../components/TitlePage.component";

export const ListTables = () => {


  const { tables } = useSelector(selectTables);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTable = () => {
    dispatch(setActiveTable(null))
    navigate('edit');;
  }



  return (
    <>

      <TitlePage
        title='Mesas'
        action={
          <Stack>
            <Button
              variant='contained'
              startIcon={<Add />}
              onClick={createTable}
            >
              Agregar
            </Button>

          </Stack>
        }

      />

      <Grid container display='flex' justifyContent='space-between' alignItems='center' my={1}>
        <Grid item>
          <Typography variant="h6">Mesas registradas: {tables.length}</Typography>

        </Grid>
        
      </Grid>

      {
        tables.length === 0
          ? <Typography>No se han registrado mesas</Typography>
          : <Grid container spacing={2}>
            {
              tables
                .map(table => (
                  <Grid item xs={12} sm={3} key={table.id}>

                    <CardTable table={table} />

                  </Grid>
                ))}
          </Grid>





      }

      <DeleteTable />

    </>



  )
}