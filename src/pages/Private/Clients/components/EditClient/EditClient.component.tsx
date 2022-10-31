import { Grid, Box, Typography, Button } from '@mui/material';
import { Text } from '../../../components/Text.component';
import { TextField } from '@mui/material/';
import { LoadingButton } from '@mui/lab';
import { ActionFunctionArgs, redirect, useNavigate, useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getClient } from '../../services';
import { useAsync } from '../../../../../hooks/useAsync';
import { useSelector, useDispatch } from 'react-redux';
import { addClient, selectClients, updateClient } from '../../../../../redux/slices/clients/clients.slice';
import { ArrowBack } from '@mui/icons-material';
import { ICreateClient } from '../../../../../models/client.model';
import { useForm } from 'react-hook-form';
import { createClient, updateClient as updateClientS } from '../../services/clients.service';
import { useSnackbar } from 'notistack';



const initialClient = {
  lastNames: "",
  firstNames: "",
  cedula: "",
  ruc: "",
  address: "",
  email: "",
}

export const EditClient = () => {


  const { loading, callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const { activeClient } = useSelector(selectClients);
  const { enqueueSnackbar } = useSnackbar();


  let client: ICreateClient;

  if (activeClient) {

    const { id, ...restClient } = activeClient!;
    client = { ...restClient };

  } else { client = initialClient; }

  const { register, handleSubmit, formState: { errors }, control } = useForm<ICreateClient>({
    defaultValues: client
  });

  async function onSubmit(form: ICreateClient) {


    if (activeClient) {

      await callEndpoint(updateClientS(activeClient.id, form))
        .then((resp) => {
          const { data } = resp;
          dispatch(updateClient(data.client))
          enqueueSnackbar('El cliente ha sido actualizada', { variant: 'success' })
        })
        .catch((err) => {
          console.log(err)
          enqueueSnackbar('error', { variant: 'error' })

        })
        
      } else {
        
        await callEndpoint(createClient(form))
          .then((resp) => {
            const { data } = resp;
            dispatch(addClient(data.client))
            enqueueSnackbar('El cliente ha sido actualizada', { variant: 'success' })
          })
          .catch((err) => {
            console.log(err)
            enqueueSnackbar('error', { variant: 'error' })
  
          })



    }

  }


  return (
    <>

      <Grid container display='flex' justifyContent='space-between'>
        <Grid item display='flex' justifyContent='left' alignItems='center'>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
          <Typography variant='h4'>{
            activeClient ?
              `${activeClient!.firstNames} ${activeClient!.lastNames}`
              : "Añadir Cliente"
          }
          </Typography>

        </Grid>

      </Grid>


      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} mt={1}>

          <Grid item xs={12} sm={6} >

            <TextField

              label="Nombres"
              fullWidth
              {
              ...register('firstNames', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' },


              })
              }
              helperText={<Typography color="red">{errors.firstNames?.message} </ Typography>}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField

              label="Apellidos"
              fullWidth
              {
              ...register('lastNames', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' },


              })
              }
              helperText={<Typography color="red">{errors.lastNames?.message} </ Typography>}
            />
          </Grid>
          <Grid item xs={12} sm={3}>

            <TextField

              label="Cedula"
              fullWidth
              type='number'
              {
              ...register('cedula', {
                required: 'Este campo es requerido',

                minLength: { value: 10, message: 'Minimo 10 caracteres' },
                maxLength: { value: 10, message: 'Máximo 10 caracteres' },


              })
              }
              helperText={<Typography color="red">{errors.cedula?.message} </ Typography>}
            />
          </Grid>
          <Grid item xs={12} sm={3}>

            <TextField

              label="RUC"
              fullWidth
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

              {
              ...register('ruc', {

                minLength: { value: 13, message: 'Minimo 13 caracteres' },
                maxLength: { value: 13, message: 'Máximo 13 caracteres' },


              })
              }
              helperText={<Typography color="red">{errors.ruc?.message} </ Typography>}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField

              label="Email"
              fullWidth
              {
              ...register('email', {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email no válido"
                },
                minLength: { value: 2, message: 'Minimo 2 caracteres' },


              })
              }
              helperText={<Typography color="red">{errors.email?.message} </ Typography>}
            />
          </Grid>

          <Grid item xs={12} sm={6}>

            <TextField

              label="Dirección"
              rows={3}
              fullWidth
              multiline
              {
              ...register('address', {
                minLength: { value: 2, message: 'Minimo 2 caracteres' },
              })
              }
              helperText={<Typography color="red">{errors.address?.message} </ Typography>}
            />
          </Grid>

          <Grid item xs={12} >
            <LoadingButton
              variant='outlined'
              type='submit'
              loading={loading}
            >
              {activeClient ? 'Editar' : 'Crear'}
            </LoadingButton>

            {
              loading &&
              <Button
                color='error'
                variant='outlined'
              >Cancelar</Button>
            }
          </Grid>



        </Grid>
      </form >




    </>
  )
}