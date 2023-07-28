import { useMutation } from "@tanstack/react-query"
import { updateTable as updateTableS } from "../services"
import { ITable } from "../../../../models"
import { UpdateUserDto } from "../../Users/dto"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"
import { updateTable } from "../../../../redux"


export const useTables = () => {


  
  




}


export const useUpdateTable = () => {

  const {enqueueSnackbar  } = useSnackbar();  
  const dispatch = useDispatch();

  return useMutation<ITable, unknown, UpdateUserDto>((data) => updateTableS(data), {
    onSuccess: (data) => {
      enqueueSnackbar('Mesa actualizada correctamente', {variant: 'success'})

      dispatch(updateTable(data))
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar la mesa', {variant: 'error'})
    }
  })


}