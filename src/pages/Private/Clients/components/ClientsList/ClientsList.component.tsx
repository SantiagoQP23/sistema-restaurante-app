import { FormControl, InputLabel, Input, FormHelperText, Divider, IconButton, InputBase, Paper, Grid, Button, CircularProgress } from '@mui/material';
import { useState } from "react";
import { TextField } from '@mui/material/';


import SearchIcon from '@mui/icons-material/Search';
import ClientsTable from "./ClientsTable.component";

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadClients, resetActiveClient } from '../../../../../redux/slices/clients';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { useAsync } from '../../../../../hooks';
import { getClient, getClients } from '../../services';
import { IClient } from '../../../../../models';
import { useSnackbar } from 'notistack';




export const ClientsList = () => {

  const [cedula, setCedula] = useState<string>('');

  const { loading, callEndpoint } = useFetchAndLoad();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar();



  const createClient = () => {
    dispatch(resetActiveClient())
    navigate('edit');
  }
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };


  const searchClient = async () => {
    if (cedula.length === 10){
      await callEndpoint(getClient(cedula))
      .then((resp) => {
        const {data } = resp;
        console.log(data);
      })
      .catch((err) => {
        enqueueSnackbar('No se encontró al cliente', {variant: 'error'})

      })
    }
      
  }


  return (
    <>

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >

            <InputBase
              type='number'
              onChange={handleChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Número de cédula"
              inputProps={{ 'aria-label': 'Buscar cliente' }}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={searchClient}
            >
              {
                loading
                  ? <CircularProgress size={20} />
                  : <SearchIcon />
              }
            </IconButton>


          </Paper>
        </Grid>

        <Grid item>

          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={createClient}
          >
            Añadir cliente
          </Button>

        </Grid>

      </Grid>





      <ClientsTable />



    </>





  )
}

{/* <FormControl variant="standard" fullWidth>
      <TextField
        id="component-helper"
        label="Nombre del cliente"

        value={name}
        onChange={handleChange}
        aria-describedby="component-helper-text"
      />
      {/* <FormHelperText id="component-helper-text">
        Some important helper text
      </FormHelperText> 
    </FormControl> */}
