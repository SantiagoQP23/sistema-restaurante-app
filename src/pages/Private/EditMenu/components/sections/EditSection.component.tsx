
import { Grid, TextField, Button, Typography,  Card } from '@mui/material/';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ICreateSection,  } from '../../../../../models';
import {   updateSection, addSection,  selectMenu } from '../../../../../redux';

import {
  createSection,
  updateSection as updateSectionS
} from '../../services/menu.service';

import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks';
import { useSnackbar } from 'notistack';
import { ArrowBack } from '@mui/icons-material';
import { CardContent, CardHeader, Container } from '@mui/material';
import { useCreateSection, useUpdateSection } from '../../hooks/useSections';


export const FormSection = () => {
  return (
    <>
    </>
  )
}

export const EditSection = () => {

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  const { activeSection } = useSelector(selectMenu);

  let section: ICreateSection;

  if (activeSection) {

    const { id, categories, ...restSection } = activeSection!;
    section = restSection;

  } else { section = { name: '' } }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateSection>({
    defaultValues: section,
  })


  const updateSectionMutation = useUpdateSection();

  const createSectionMutation = useCreateSection();


  async function onSubmit(form: ICreateSection) {

    if (activeSection) {

      updateSectionMutation.mutateAsync({...form, id: activeSection.id})
        .then((data) => {
          dispatch(updateSection({...data, categories: activeSection.categories}))

        })
      ;
    } else {

      createSectionMutation.mutateAsync(form)
        .then((data) => {
          dispatch(addSection({...data, categories: []}))
        })
      }


  }


  return (
    <>

      <Container maxWidth='sm'>


        <Grid container display='flex' justifyContent='space-between'>
          <Grid item display='flex' justifyContent='left' alignItems='center'>
            <Button onClick={() => navigate(-1)}>
              <ArrowBack />
             
            </Button>
            <Typography variant='h6'>{activeSection ? `Editar sección` : "Añadir seccion"} </Typography>

          </Grid>

        </Grid>

        <Card>
          <CardHeader title="Datos de la sección" />
          <CardContent sx={{ my: 0, py: 0 }}>

            <form onSubmit={handleSubmit(onSubmit)}>

              <TextField
                autoFocus
                margin="dense"
                label="Nombre de la sección"
                type="text"
                fullWidth

                {
                ...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })
                }

                error={!!errors.name}
                helperText={<Typography color="red">{errors.name?.message}</Typography>}
              />

              {/*  <TextField
          id="descripcion-seccion"
          label="Descripcion de la sección"
          margin="dense"
          multiline
          rows={4}
          defaultValue=""
          fullWidth
          disabled
        /> */}

              <LoadingButton
                variant='contained'
                type='submit'
                loading={updateSectionMutation.isLoading || createSectionMutation.isLoading}
              >
                {activeSection ? `Guardar` : "Crear"}
              </LoadingButton>


            </form>

          </CardContent>
        </Card>
      </Container>
    </>
  )
}