import { DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import { FC } from "react";
import {  useSelector } from "react-redux";
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import {  selectMenu } from "../../../../../redux";
import { LoadingButton } from '@mui/lab';
import { deleteProduct as deleteProductS } from "../../services/menu.service";
import { useSnackbar } from 'notistack';
import { deleteProduct } from "../../../../../redux/slices/menu/menu.thunks";
import { useAppDispatch } from '../../../../../hooks/useRedux';



interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const DeleteProduct: FC<Props> = ({ isOpen, closeModal }) => {


  const { loading, callEndpoint } = useFetchAndLoad();


  const { activeProduct: product } = useSelector(selectMenu);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const submitDeleteProduct = async () => {

    console.log('Modal eliminar')

    await callEndpoint(deleteProductS(product!.id))
      .then((res) => {

        enqueueSnackbar('Producto eliminado', { variant: 'success' });
        dispatch(deleteProduct(product!));
        closeModal();
      })
      .catch((err) => {

        enqueueSnackbar('Error al eliminar el producto', { variant: 'error' });

        closeModal()

      })
  }
  return (
    <>
      <Dialog open={isOpen} onClose={closeModal}>

        <DialogTitle id="alert-dialog-title" color='white'>
          {`¿Esta seguro de eliminar el producto ${product!.name}?`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El producto ya no estará disponible en el menú
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} >Cancelar</Button>
          <LoadingButton loading={loading} variant='contained' color='error' onClick={submitDeleteProduct}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )
}

