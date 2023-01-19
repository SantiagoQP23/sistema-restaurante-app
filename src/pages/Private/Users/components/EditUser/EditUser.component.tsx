import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { selectUsers, updateUser } from '../../../../../redux/slices/users/users.slice';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBack } from '@mui/icons-material';
import { Container, Grid, Button, Typography, Card, CardContent } from '@mui/material';
import { CreateUser } from '../../models/create-user.model';
import { FormUser } from '../FormUser.component';
import { updateUser as updateUserS } from '../../services/users.service';
import { useSnackbar } from 'notistack';


export const EditUser = () => {

  const navigate = useNavigate();

  const { activeUser } = useSelector(selectUsers);

  if (!activeUser)
    navigate('/users');

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { id, person, role, ...restUser } = activeUser!;

  const { id: idI, ...identification } = person.identification;

  const { id: idP, ...restPerson } = person;

  const { name } = role;

  const user: CreateUser = { ...restPerson, ...restUser, role: { name }, identification };


  async function onSubmit(form: CreateUser) {
    console.log(form);
    const { identification, role, ...dataUser } = form;

    if (form.numPhone === "") {
      delete dataUser.numPhone;
    }

    const userUpdated = {
      ...dataUser,
      typeIdentification: identification.type,
      numberIdentification: identification.num,
      rol: form.role.name,

    }

    await callEndpoint(updateUserS(activeUser!.id, userUpdated))
      .then((resp) => {
        const { data } = resp;
        dispatch(updateUser(data));

        enqueueSnackbar('Usuario actualizado', { variant: 'success' });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
      }
      )

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

              `${activeUser!.person.firstName} ${activeUser!.person.lastName}`
            }
            </Typography>

          </Grid>

        </Grid>
        <Card>
          <CardContent>

            <FormUser onSubmit={onSubmit} user={user} loading={loading} msg={'Editar'} />

            {/* <FormClient onSubmit={onSubmit} client={client} loading={loading} msg={'Editar'} /> */}


          </CardContent>
        </Card>

      </Container>
    </>
  )
}