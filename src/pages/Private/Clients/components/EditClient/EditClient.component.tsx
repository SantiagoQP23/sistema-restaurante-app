import { Grid, Box, Typography, Button, InputLabel, MenuItem, Select, Container, Card, CardContent, CardHeader } from '@mui/material';
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
import { Controller, useForm } from 'react-hook-form';
import { createClient, updateClient as updateClientS } from '../../services/clients.service';
import { useSnackbar } from 'notistack';
import { TypeIdentification, CreatePerson } from '../../../../../models/common.model';



const initialClient = {
  lastName: "",
  firstName: "",
  identification: {
    type: TypeIdentification.CEDULA,
    num: "",
  },
  phone: "",
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

    const { id: idI, ...identification} = restClient.person.identification;

    const { id: idP, ...restPerson } = restClient.person;

    const person: CreatePerson = { ...restPerson, identification };

    client = { ...person, ...restClient };

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
          <Typography variant='h6'>{
            activeClient ?
              `${activeClient!.person.firstName} ${activeClient!.person.lastName}`
              : "Añadir Cliente"
          }
          </Typography>

        </Grid>

      </Grid>

      <Container maxWidth={'md'}>

        <Card>
          <CardContent>



            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='identification.type'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) =>
                      <>
                        <Select
                          labelId="select-seccion"
                          label="Tipo de identificación"
                          fullWidth
                          margin='dense'
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={!!errors.identification?.type}
                        >
                          <MenuItem value={TypeIdentification.CEDULA}>Cédula</MenuItem>
                          <MenuItem value={TypeIdentification.RUC}>RUC</MenuItem>
                        </Select>
                      </>
                    } />
                </Grid>

                <Grid item xs={12} sm={3}>

                  <TextField

                    label="Número de identificación"
                    fullWidth
                    type='number'
                    {
                    ...register('identification.num', {
                      required: 'Este campo es requerido',

                      minLength: { value: 10, message: 'Minimo 10 caracteres' },
                      maxLength: { value: 10, message: 'Máximo 10 caracteres' },


                    })
                    }
                    helperText={<Typography color="red">{errors.identification?.num?.message} </ Typography>}
                  />
                </Grid>


                <Grid item xs={12} sm={6} >

                  <TextField

                    label="Nombres"
                    fullWidth
                    {
                    ...register('firstName', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Minimo 2 caracteres' },


                    })
                    }
                    helperText={<Typography color="red">{errors.firstName?.message} </ Typography>}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField

                    label="Apellidos"
                    fullWidth
                    {
                    ...register('lastName', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Minimo 2 caracteres' },


                    })
                    }
                    helperText={<Typography color="red">{errors.lastName?.message} </ Typography>}
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
                <Grid item xs={12} sm={3}>

                  <TextField

                    label="Número de teléfono"
                    fullWidth
                    type='number'
                    {
                    ...register('phone', {
                      

                      minLength: { value: 10, message: 'Minimo 10 caracteres' },
                      maxLength: { value: 10, message: 'Máximo 10 caracteres' },


                    })
                    }
                    helperText={<Typography color="red">{errors.identification?.num?.message} </ Typography>}
                  />
                </Grid>

                <Grid item xs={12} >

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

          </CardContent>
        </Card>

      </Container>





    </>
  )
}