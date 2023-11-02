import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ISection } from "../../../../models";
import { UpdateSectionDto } from "../dto/update-section.dto";
import { createSection, updateSection } from "../services/menu.service";
import { CreateSectionDto } from "../dto/create-section.dto";


export const useSections = () => {

  const {enqueueSnackbar} = useSnackbar();

}


export const useCreateSection = () => {

  const {enqueueSnackbar} = useSnackbar();

  return useMutation<ISection, unknown, CreateSectionDto>((data) => createSection(data), {

    onSuccess: (data) => {
      enqueueSnackbar('Se creó correctamente', {variant: 'success'})
    },
    onError: (error) => {
      enqueueSnackbar('No se pudo crear', {variant: 'error'})
    }
  });



}



export const useUpdateSection = () => {
  
    const {enqueueSnackbar} = useSnackbar();

    return useMutation<ISection, unknown, UpdateSectionDto>((data) => updateSection(data.id, data), {

      onSuccess: (data) => {
        enqueueSnackbar('Se actualizó correctamente', {variant: 'success'})
      },

      onError: (error) => {
        enqueueSnackbar('No se pudo actualizar', {variant: 'error'})
      }
    });
}