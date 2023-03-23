import { ValidRoles } from "../../../router"
import { TypeIdentification } from '../../../../../models/common.model';
import { CreateUser } from '../../models/create-user.model';
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchAndLoad } from "../../../../../hooks";
import { ArrowBack } from "@mui/icons-material";
import { Container, Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { FormUser } from "../FormUser.component";
import { createUser } from '../../services/users.service';
import { addUser } from "../../../../../redux";

console.log(ValidRoles);

const initialUser: CreateUser = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  role: {
    name: "mesero",
  },
  numPhone: '',
  identification: {
    type: TypeIdentification.CEDULA,
    num: "",
  },
}


export const AddUser = () => {

  const user = initialUser;

  const { loading, callEndpoint } = useFetchAndLoad();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  async function onSubmit(form: CreateUser) {
    console.log(form)

    const { identification, role, ...dataUser } = form;

    if (form.numPhone === "") {
      delete dataUser.numPhone;
    }

    const newUser = {
      ...dataUser,
      typeIdentification: identification.type,
      numberIdentification: identification.num,
      rol: form.role.name,

    }

    await callEndpoint(createUser(newUser))
      .then((res) => {

        const { data } = res;
        dispatch(addUser(data.user))
        enqueueSnackbar('Usuario creado con exito', { variant: 'success' });
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al crear usuario', { variant: 'error' });
      })



  }


  return (
    <>
      <Container maxWidth="sm">
        <Grid container display='flex' justifyContent='space-between'>
          <Grid item xs={12}>
            <Button

              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
            >
              Volver
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Agregar usuario
            </Typography>
          </Grid>
        </Grid>


        <Card>
          <CardContent>

            <FormUser

              user={user}
              onSubmit={onSubmit}
              loading={loading}
              isNew={true}
            />

          </CardContent>
        </Card>
      </Container>

    </>

  )
}