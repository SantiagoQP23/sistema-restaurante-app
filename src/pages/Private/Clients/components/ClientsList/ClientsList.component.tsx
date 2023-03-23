import {  IconButton, InputBase, Paper, Grid, Button, CircularProgress } from '@mui/material';
import { useState } from "react";

import SearchIcon from '@mui/icons-material/Search';
import {ClientsTable} from "./ClientsTable.component";

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetActiveClient } from '../../../../../redux/slices/clients';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getClient } from '../../services';
import { IClient } from '../../../../../models';
import { useSnackbar } from 'notistack';
import { selectClients } from '../../../../../redux/slices/clients/clients.slice';
import { DeleteClient } from '../DeleteClient/DeleteClient.component';




export const ClientsList = () => {

  const [identification, setIdentification] = useState<string>('');

  const { clients } = useSelector(selectClients);

  const [client, setClient] = useState<IClient>();

  const { loading, callEndpoint } = useFetchAndLoad();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar();





  const createClient = () => {
    dispatch(resetActiveClient())
    navigate('add');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentification(event.target.value);
    setClient(undefined);
  };


  const searchClient = async () => {

    if (identification.length === 0) {
      enqueueSnackbar('Ingrese un número de identificación', { variant: 'error' })
      return;
    }

    if (identification.length === 10 || identification.length === 13) {

      await callEndpoint(getClient(identification))
        .then((resp) => {
          const { data } = resp;

          setClient(data);
          console.log(data);
        })
        .catch((err) => {
          enqueueSnackbar('No se encontró al cliente', { variant: 'error' })

        })
    } else {
      enqueueSnackbar('El número de identificación es incorrecto', { variant: 'error' })
      return;
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
              placeholder="Número de identificación"
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

      <ClientsTable clients={clients} clientFound={client}/>

      <DeleteClient />

    </>

  )
}


