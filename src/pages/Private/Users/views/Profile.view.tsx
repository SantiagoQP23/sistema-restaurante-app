import { Card, CardContent, CardHeader, Container, Grid, Stack, Typography } from "@mui/material"
import { TitlePage } from "../../components/TitlePage.component"
import { useSelector } from "react-redux"
import { selectAuth } from "../../../../redux"


export const Profile = () => {

  const { user } = useSelector(selectAuth);

  return (
    <>
      <TitlePage title='Perfil' />



      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Card>
            <CardContent>

              <Typography variant='h5' mt={5}>{user?.person.firstName} {user?.person.lastName}</Typography>
              <Typography variant='subtitle1'>{user?.role.name}</Typography>

            </CardContent>
          </Card>

        </Grid>


        <Grid item xs={12} md={6}>


          <Card>


            <CardContent>
              <Typography variant='h4' mb={1}>Información</Typography>
              <Typography variant='subtitle1'>Email</Typography>
              <Typography variant='h5'>{user?.person.email}</Typography>
              <Typography variant='subtitle1'>Teléfono</Typography>
              <Typography variant='h5'>{user?.person.numPhone}</Typography>
              <Typography variant='subtitle1'>Identificación</Typography>
              <Typography variant='h5'>{user?.person.identification.type}: {user?.person.identification.num}</Typography>

            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={12} md={6}>

          <Card>

            <CardHeader
              title='Cambiar contraseña'
            />
            <CardContent>
            </CardContent>
          </Card>

        </Grid>

      </Grid>


    </>




  )
}