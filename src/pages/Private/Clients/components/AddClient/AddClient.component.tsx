import { TypeIdentification } from '../../../../../models/common.model';
import { ICreateClient } from '../../../../../models/client.model';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { createClient } from '../../services';
import { addClient } from '../../../../../redux/slices/clients';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { FormClient } from '../FormClient.component';
import { Container, Card, CardContent, Button, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CreateClientDto } from '../../dto/create-client.dto';




const initialClient: ICreateClient = {
  lastName: "",
  firstName: "",
  identification: {
    type: TypeIdentification.CEDULA,
    num: "",
  },
  numPhone: "",
  address: "",
  email: "",
}



export const AddClient = () => {

  const client = initialClient;

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();


  async function onSubmit(form: ICreateClient) {

    const {identification,...dataClient} = form;

    if( form.address === "" ){
      delete dataClient.address;

    }

    if( form.numPhone === "" ){
      delete dataClient.numPhone;

    }
    
    const newClient: CreateClientDto ={
      ...dataClient,
      typeIdentification: identification.type,
      numberIdentification: identification.num
    }   

    await callEndpoint(createClient(newClient))
      .then((resp) => {
        const { data } = resp;
        dispatch(addClient(data.client))
        enqueueSnackbar('El cliente ha sido creado', { variant: 'success' })
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar('error', { variant: 'error' })

      })



  }



  return (
    <>


      <Container maxWidth={'sm'}>

        <Grid container display='flex' justifyContent='space-between'>
          <Grid item display='flex' justifyContent='left' alignItems='center'>
            <Button onClick={() => navigate(-1)}>
              <ArrowBack />
            </Button>
            <Typography variant='h6'>{

              "Añadir Cliente"
            }
            </Typography>

          </Grid>

        </Grid>

        <Card>
          <CardContent>
            <FormClient onSubmit={onSubmit} client={client} loading={loading} />

          </CardContent>
        </Card>
      </Container>

    </>
  )
} 
