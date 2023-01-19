import { DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../../../../../models";
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { selectCategories, selectMenu } from "../../../../../redux";
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../../../../hooks/useRedux';
import { useSnackbar } from 'notistack';
import { deleteCategory as deleteCategoryS } from "../../services/sections.service";
import { deleteCategory } from "../../../../../redux/slices/menu/menu.thunks";



interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const DeleteCategory: FC<Props> = ({isOpen, closeModal }) => {


  const { loading, callEndpoint } = useFetchAndLoad();


  const {activeCategory: category} = useSelector(selectMenu);
  
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();


  const eliminarCategoria = async () => {

    console.log('Modal eliminar')

    await callEndpoint(deleteCategoryS(category!.id))

      .then((res) => {

        enqueueSnackbar('Categoría eliminada', { variant: 'success' });
        dispatch(deleteCategory(category!));
        closeModal();
      })
      .catch((err) => {
        
        enqueueSnackbar('Error al eliminar la categoría', { variant: 'error' });
      })

    closeModal()

  }


  return (
    <>
      <Dialog open={isOpen} onClose={closeModal}>

        <DialogTitle id="alert-dialog-title" color='white'>
          {`¿Esta seguro de eliminar la categoría ${category!.name}?`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se eliminarán todos los productos que pertenecen a esta categoría
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} >Cancelar</Button>
          <LoadingButton loading={loading} variant='contained' color='error' onClick={eliminarCategoria}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )
}

