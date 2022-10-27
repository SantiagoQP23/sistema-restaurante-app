import { DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../../../../../models";
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { selectCategories } from "../../../../../redux";
import { LoadingButton } from '@mui/lab';



interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const DeleteProduct: FC<Props> = ({isOpen, closeModal }) => {


  const { loading, callEndpoint } = useFetchAndLoad();


  const {activeCategory: category} = useSelector(selectCategories);
  
  const dispatch = useDispatch();

  const deleteProduct = () => {

    console.log('Modal eliminar')


    closeModal()

  }


  return (
    <>
      <Dialog open={isOpen} onClose={closeModal}>

        <DialogTitle id="alert-dialog-title" color='white'>
          {`¿Esta seguro de eliminar el producto ${category!.name}?`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El producto ya no estará disponible en el menú
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} >Cancelar</Button>
          <LoadingButton loading={loading} variant='contained' color='error' onClick={deleteProduct}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )
}

