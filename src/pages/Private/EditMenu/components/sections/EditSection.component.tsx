
import { Grid, TextField, Button, Typography,  Card } from '@mui/material/';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ICreateSection,  } from '../../../../../models';
import {   updateSection, addSection,  selectMenu } from '../../../../../redux';

import {
  createSection,
  updateSection as updateSectionS
} from '../../services/sections.service';

import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks';
import { useSnackbar } from 'notistack';
import { ArrowBack } from '@mui/icons-material';
import { CardContent, CardHeader, Container } from '@mui/material';




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

  const { loading, callEndpoint, cancelEndpoint } = useFetchAndLoad();

  const { activeSection } = useSelector(selectMenu);

  let section: ICreateSection;

  if (activeSection) {

    const { id, categories, ...restSection } = activeSection!;
    section = restSection;

  } else { section = { name: '' } }



  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateSection>({
    defaultValues: section,

  })

  async function onSubmit(form: ICreateSection) {


    if (activeSection) {
      await callEndpoint(updateSectionS(activeSection.id, form))
        .then((resp) => {
          const { data } = resp;
          console.log(data.section)

          dispatch(updateSection({...data.section, categories: activeSection.categories}))
          enqueueSnackbar('La sección ha sido actualizada', { variant: 'success' })

        })
        .catch((err) => {

          enqueueSnackbar('Ya existe', { variant: 'error' })

        });

    } else {

      
      await callEndpoint(createSection( form))
      .then((resp) =>{
        const {data} = resp;
        console.log(data.section);
        dispatch(addSection({...data.section, categories: []}))
        //dispatch(setActiveSection(data.section))
        enqueueSnackbar('La sección ha sido añadida',{variant: 'success'})
        
      })
      .catch((err)=> {
        console.log(err)
        enqueueSnackbar('Ya existe',{variant: 'error'})
        
      });

      console.log('Crear section')
    }


    /*     if (!form.idSeccion) {
          dispatch(seccionStartCreated(form as ISeccion));
        } else {
          dispatch(seccionStartUpdate(form as ISeccion));
        } */

  }



  const cancel = () => {
    console.log('cancelando')
    cancelEndpoint();
    //dispatch(resetActiveSection())

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
                variant='outlined'
                type='submit'
                loading={loading}
              >
                {activeSection ? `Editar` : "Crear"}
              </LoadingButton>

              {
                loading && <Button
                  color='error'
                  variant='outlined'
                  onClick={() => cancelEndpoint()}
                >
                  Cancelar
                </Button>
              }


            </form>

          </CardContent>
        </Card>
      </Container>
    </>
  )
}