import { useForm } from 'react-hook-form';

import { Grid, Box, TextField, Typography,Button, Link, Paper, Avatar, FormControlLabel, Checkbox, Chip } from '@mui/material';


import { useAppDispatch } from '../../hooks';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth, startLogin } from '../../redux/slices/auth';

import { Copyright } from '../../components/ui';
import { IFormLogin } from '../../models/';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';



const initialForm: IFormLogin = {
  username: 'SantiagoQP23',
  password: 'Santiago2022'
}

export const LoginPage = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormLogin>({
    defaultValues: initialForm
  });

  const { error, status } = useAppSelector(selectAuth);

  const handleLogin = (form: IFormLogin) => {

    dispatch(startLogin(form));
    if(status === 'authenticated')
      navigate('/', {replace: true})

  }
 

  return (
    <>
      <Box >
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Chip
                label={error}
                color="error"
                sx={{ display: !!error ? "flex" : "none" }}

              />
              <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Nombre de usuario"
                  error={!!errors.username}
                  {
                  ...register('username', {
                    required: 'Por favor, ingrese su nombre de usuario',
                    minLength: { value: 2, message: 'Nombre no valido' }
                  })
                  }
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  {
                  ...register('password', {
                    required: 'Por favor, ingrese su contraseña',
                    minLength: { value: 2, message: 'Contraseña no valida' }
                  })
                  }


                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={"Remember me "}
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  loading={ status === 'checking'}
                >
                  Sign In
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"No tienes una cuenta? Regístrate"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
          
        </Grid>
      </Box>

    </>
  )
}


export default LoginPage;
