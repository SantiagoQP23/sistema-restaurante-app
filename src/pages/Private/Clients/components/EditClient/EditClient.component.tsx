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
import { FormClient } from '../FormClient.component';
import { UpdateClientDto } from '../../dto/update-client.dto';




export const EditClient = () => {

  const navigate = useNavigate();
  const { activeClient } = useSelector(selectClients);

  if (!activeClient) {
    navigate('/clients')

  }

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  let client: ICreateClient;


  // Remove id from objects
  const { id, person, ...restClient } = activeClient!;

  const { id: idI, ...identification } = person.identification;

  const { id: idP, ...restPerson } = person;


  const personN: CreatePerson = { ...restPerson, identification };

  client = { ...personN, ...restClient };



  async function onSubmit(form: ICreateClient) {

    const { identification, ...dataClient } = form;
    
    if( form.address === "" ){
      delete dataClient.address;

    }

    if( form.numPhone === "" ){
      delete dataClient.numPhone;

    }

    const clientUpdated: UpdateClientDto = {
      ...dataClient,
      typeIdentification: identification.type,
      numberIdentification: identification.num
    } 

    console.log(clientUpdated);

    await callEndpoint(updateClientS(activeClient!.id, clientUpdated))
      .then((resp) => {
        const { data } = resp;
        dispatch(updateClient(data.client))
        enqueueSnackbar('El cliente ha sido actualizada', { variant: 'success' })
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar('error', { variant: 'error' })

      })
  }


  return (
    <>


      <Container maxWidth={'md'}>

        <Grid container display='flex' justifyContent='space-between'>
          <Grid item display='flex' justifyContent='left' alignItems='center'>
            <Button onClick={() => navigate(-1)}>
              <ArrowBack />
            </Button>
            <Typography variant='h6'>{
                `${activeClient!.person.firstName} ${activeClient!.person.lastName}`
                
            }
            </Typography>

          </Grid>

        </Grid>
        <Card>
          <CardContent>

            <FormClient onSubmit={onSubmit} client={client} loading={loading} msg={'Editar'} />


          </CardContent>
        </Card>

      </Container>





    </>
  )
}