import { useState, useEffect } from 'react';
import { ITable } from '../../../../models/table.model';
import { deleteTable as deleteTableS, statusModalDeleteTable } from '../services/tables.service';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, Divider, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useFetchAndLoad } from '../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import { deleteTable } from '../../../../redux';


export const DeleteTable = () => {

  const [table, setTable] = useState<ITable>();

  const [open, setOpen] = useState(false);

  const {loading, callEndpoint} = useFetchAndLoad();

  const dispatch = useDispatch();

  const subscription$ = statusModalDeleteTable.getSubject();

  const {enqueueSnackbar} = useSnackbar();

  const closeModal = () => {
    setOpen(false);
  }

  const submitDeleteTable = async () => {

    await callEndpoint(deleteTableS(table!.id))
    .then(() => {
      enqueueSnackbar('Mesa eliminada', {variant: 'success'})
      dispatch(deleteTable(table!.id))
      closeModal();
    })
    .catch(() => {
      enqueueSnackbar('Error al eliminar mesa', {variant: 'error'})
    });
  }
  
  useEffect(() => {
    subscription$.subscribe((data) => {
      setTable(data.table);
      setOpen(!!data.value);
    })
  }, [])


  return (
    <Dialog open={open} onClose={closeModal}>

    <DialogTitle id="alert-dialog-title" >
      Eliminar mesa
    </DialogTitle>
    <Divider />
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      {`¿Esta seguro de eliminar la mesa ${table?.name}?`}
      </DialogContentText>
    </DialogContent>
    <DialogActions
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button onClick={closeModal} color='inherit' >Cancelar</Button>
      <LoadingButton loading={loading} variant='contained' color='error' onClick={submitDeleteTable}>
        Aceptar
      </LoadingButton>
    </DialogActions>
  </Dialog>
  )
}