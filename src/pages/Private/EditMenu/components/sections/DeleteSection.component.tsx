import { DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../../../../../models";
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { deleteSection,  selectMenu } from "../../../../../redux";
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { deleteSection as deleteSectionS } from "../../services/sections.service";
import { useAppDispatch } from '../../../../../hooks/useRedux';



interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const DeleteSection: FC<Props> = ({ isOpen, closeModal }) => {


  const { loading, callEndpoint } = useFetchAndLoad();


  const { activeSection: section } = useSelector(selectMenu);

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const submitDeleteSection = async () => {

    console.log('Modal eliminar')

    await callEndpoint(deleteSectionS(section!.id))
      .then((res) => {

        enqueueSnackbar('Sección eliminada', { variant: 'success' });
        dispatch(deleteSection(section!.id));
        closeModal();
      })
      .catch((err) => {

        enqueueSnackbar('Error al eliminar la sección', { variant: 'error' });

        closeModal()

      })

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
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={closeModal} >Cancelar</Button>
          <LoadingButton loading={loading} variant='contained' color='error' onClick={submitDeleteSection}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )
}

