import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { DialogActions, TextField, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, Typography, InputLabel, Grid } from '@mui/material/';
// MOdal

import { Controller, useForm } from 'react-hook-form';
// import { selectSections, selectCategories, resetActiveCategory, setActiveCategory, updateCategory, selectMenu } from '../../../../../redux';
import { ICreateCategory, ICategory } from '../../../../../models/menu.model';
import { BtnCancel } from '../../../components';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useFetchAndLoad } from '../../../../../hooks';
import {
  createCategory,
  updateCategory as updateCategoryS
} from '../../services/sections.service';
import { ArrowBack } from '@mui/icons-material';
import { addCategory, updateCategory } from '../../../../../redux/slices/menu/menu.thunks';
import { resetActiveCategory, selectMenu, setActiveCategory } from '../../../../../redux';




const initialForm = (sectionId: string): ICreateCategory => {
  return {
    name: "",
    sectionId
  }
}


interface Props {

}


export const EditCategory: FC<Props> = ({ }) => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { activeCategory, activeSection, sections } = useSelector(selectMenu);

  const { enqueueSnackbar } = useSnackbar();



  const { loading, callEndpoint, cancelEndpoint } = useFetchAndLoad()

  let category: ICreateCategory;

  if (activeCategory) {

    const { id, section, products, ...restCategory } = activeCategory!;

    category = { ...restCategory, sectionId: activeSection!.id }

  } else { category = { name: '', sectionId: activeSection!.id } }


  //const category = activeCategory ? { name: activeCategory.name, sectionId: activeCategory.section.id } : initialForm(activeSection!.id);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ICreateCategory>({
    defaultValues: category,

  });


  async function onSubmit(form: ICreateCategory) {

    if (activeCategory) {
      console.log('Editar')

      await callEndpoint(updateCategoryS(activeCategory.id, form))
        .then((resp) => {
          const { data } = resp;

          dispatch(updateCategory(data.category));
          dispatch(setActiveCategory({...activeCategory, ...data.category}))
          enqueueSnackbar('La categoría ha sido actualizada', { variant: 'success' })

        })
        .catch((err) => {
          console.log(err)
          enqueueSnackbar('Ya existe', { variant: 'error' })

        });

    } else {

      const category: ICategory = {
        id: '134124',
        name: 'Ensaladas',
        products: [],
        section: { id: '13232', name: 'lajds' }
      };
      dispatch(addCategory(category));
      reset();

      /* await callEndpoint(createCategory(form))
        .then((resp) => {
          const { data } = resp;

          dispatch(addCategory(data.category))
          dispatch(setActiveCategory(data.category))

          enqueueSnackbar('La categoría ha sido añadida', { variant: 'success' })

        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })

        }); */
    }

    /*  if (!form.idCategoria) {
 
       dispatch(categoriaStartCreated(form as ICategoria));
     } else {
       dispatch(categoriaStartUpdate(form as ICategoria));
     } */




  }



  const cancel = () => {
    cancelEndpoint();
    dispatch(resetActiveCategory());
  }


  return (
    <>


      <Grid container display='flex' justifyContent='space-between'>
        <Grid item display='flex' justifyContent='left' alignItems='center'>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
          <Typography variant='h3'> {activeCategory ? activeCategory.name : "Añadir Categoria"}</Typography>

        </Grid>

      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>



        <TextField
          autoFocus
          margin="dense"
          label="Nombre de la Categoria"
          type="text"
          fullWidth
          {
          ...register('name', {
            required: 'Este campo es requerido',
            minLength: { value: 2, message: 'Minimo 2 caracteres' }
          })
          }
          error={!!errors.name}
          helperText={<Typography variant="body1" color="red">{errors.name?.message}</Typography>}


        />

        {/*   <TextField
          id="descripcion-seccion"
          label="Descripcion de la Categoria"
          margin="dense"

          multiline
          rows={4}
          defaultValue=""
          fullWidth

        /> */}

        <Controller
          name='sectionId'
          control={control}
          render={({ field: { onChange, onBlur, value } }) =>
            <>
              <InputLabel id='select-seccion'>Seccion</InputLabel>
              <Select
                labelId="select-seccion"

                label="Seccion"
                fullWidth
                margin='dense'
                disabled

                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!errors.sectionId}

              >

                {sections.map(seccion => (

                  <MenuItem key={seccion!.id} value={seccion.id!}>{seccion.name} </MenuItem>
                )


                )
                }

              </Select>
            </>
          }

        />




        <LoadingButton
          variant='outlined'
          type='submit'
          loading={loading}
        >
          {activeCategory ? 'Editar' : "Crear"}
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





        {/*   <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button type='submit'>{categoria ? "Guardar cambios" : "Añadir Categoria"}</Button>
        </DialogActions> */}
      </form>
    </>
  )
}

