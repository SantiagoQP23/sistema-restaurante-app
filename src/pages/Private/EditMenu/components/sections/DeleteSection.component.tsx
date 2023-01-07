import { DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../../../../../models";
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { selectCategories, selectMenu, selectSections } from "../../../../../redux";
import { LoadingButton } from '@mui/lab';



interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const DeleteSection: FC<Props> = ({isOpen, closeModal }) => {


  const { loading, callEndpoint } = useFetchAndLoad();


  const {activeSection: section} = useSelector(selectMenu);
  
  const dispatch = useDispatch();

  const deleteSection = () => {

    console.log('Modal eliminar')


    closeModal()

  }


  return (
    <>
      <Dialog open={isOpen} onClose={closeModal}>

        <DialogTitle id="alert-dialog-title" color='white'>
          {`¿Esta seguro de eliminar la sección ${section!.name}?`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se eliminarán todas las categorías y productos que pertenecen a esta categoría
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={closeModal} >Cancelar</Button>
          <LoadingButton loading={loading} variant='contained' color='error' onClick={deleteSection}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )
}

