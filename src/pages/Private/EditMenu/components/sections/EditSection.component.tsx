import {useEffect} from 'react';

import { DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Typography, CircularProgress } from '@mui/material/';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ICreateSection, ISection } from '../../../../../models';
import { resetActiveSection, selectSections, updateSection, addSection, setActiveSection } from '../../../../../redux';

import { createSection, 
  updateSection as updateSectionS } from '../../services/sections.service';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { BtnCancel } from '../../../components';
import { useFetchAndLoad } from '../../../../../hooks';
import { useSnackbar } from 'notistack';



export const EditSection = () => {

  const navigate = useNavigate();

  const {enqueueSnackbar} = useSnackbar();

  const dispatch = useDispatch();

  const {loading, callEndpoint, cancelEndpoint} = useFetchAndLoad();

  const { activeSection } = useSelector(selectSections);
  
  let section: ICreateSection;

  if(activeSection){

    const {id, ...restSection} = activeSection!;
    section = restSection;

  }else{ section =  { name: '' } }
  
  

  const { register, handleSubmit, formState: { errors } } = useForm<ICreateSection>({
    defaultValues: section,

  })

  async function onSubmit(form: ICreateSection) {


    if(activeSection){
      await callEndpoint(updateSectionS(activeSection.id, form))
      .then((resp) =>{
        const {data} = resp;
        console.log(data.section);
        dispatch(updateSection(data.section))
        enqueueSnackbar('La sección ha sido actualizada',{variant: 'success'})
        
      })
      .catch((err)=> {
        console.log(err)
        enqueueSnackbar('Ya existe',{variant: 'error'})
        
      });
      
    }else{

      const section = {name: 'lasjdlfjasl', id: 'ajlfdñ'} as ISection;
      dispatch(addSection(section))
      dispatch(setActiveSection(section))
      
      /* await callEndpoint(createSection( form))
      .then((resp) =>{
        const {data} = resp;
        console.log(data.section);
        dispatch(addSection(data.section))
        dispatch(setActiveSection(data.section))
        enqueueSnackbar('La sección ha sido actualizada',{variant: 'success'})
        
      })
      .catch((err)=> {
        console.log(err)
        enqueueSnackbar('Ya existe',{variant: 'error'})
        
      });
 */
      console.log('Crear section')
    }


    /*     if (!form.idSeccion) {
          dispatch(seccionStartCreated(form as ISeccion));
        } else {
          dispatch(seccionStartUpdate(form as ISeccion));
        } */

  }

 

  const cancel = () => {
    cancelEndpoint();
    dispatch(resetActiveSection())

  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Typography variant='h3'>{activeSection ? `Editar sección ${section.name}` : "Añadir seccion"} </Typography>

        {
          loading && <CircularProgress />

        }

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


        <BtnCancel actionClick={cancel}/>


      </form>

    </>
  )
}