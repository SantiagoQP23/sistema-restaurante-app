import { Grid, Box, FormControl, Typography, Button } from '@mui/material';
import { Text } from '../../../components/Text.component';
import { TextField } from '@mui/material/';
import { LoadingButton } from '@mui/lab';
import { ActionFunctionArgs, redirect, useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getClient } from '../../services';
import { useAsync } from '../../../../../hooks/useAsync';




// {
//   "cedula": "0929012656",
//   "firstNames": "Santiago",
//   "lastNames": "Quirumbay Pozo",
//   "ruc": "0929012656001",
//   "address": "",
//   "email": "santiago@gmail.com"

// }

export const EditClient = () => {


  const { clientId } = useParams();

  if(!clientId){
    redirect('/clients');
  }

  const { loading, callEndpoint} = useFetchAndLoad();

  const getClientCall = async() => await callEndpoint(getClient(clientId!))

  const loadClient = (data: any) => {
    console.log({data})
   if(!data)
    redirect('/clients');

  }

  useAsync(getClientCall, loadClient, () =>{} )


  console.log(clientId)
  return (
    <>

      <Grid>
        <Grid item>
          <Typography variant='h3'>Editar datos del cliente</Typography>
        </Grid>


      </Grid>

      <FormControl >
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} >

            <TextField
              required
              label="Nombres del cliente"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField
              required
              label="Apellidos del cliente"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>

            <TextField
              required
              label="Cedula del cliente"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>

            <TextField

              label="RUC del cliente"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField
              required
              label="Email del cliente"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>

            <TextField
              required
              label="Dirección del cliente"
              rows={3}
              fullWidth
              multiline
            />
          </Grid>

          <Grid item xs={12} >
            <LoadingButton
              variant='outlined'
            >Editar</LoadingButton>


            <Button
              color='error'
              variant='outlined'
            >Cancelar</Button>
          </Grid>



        </Grid>
      </FormControl>



      {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'left' }}>
          <Box pr={3} pb={2}>
            Name:
            </Box>
            </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Text color="black">
            <b>Craig Donin</b>
          </Text>
        </Grid>
        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'left' }}>
          <Box pr={3} pb={2}>
            Date of birth:
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Text color="black">
            <b>15 March 1977</b>
          </Text>
        </Grid>
        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'left' }}>
          <Box pr={3} pb={2}>
            Address:
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
            <Text color="black">
              1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California,
              93262
            </Text>
          </Box>
        </Grid> */}
    </>
  )
}