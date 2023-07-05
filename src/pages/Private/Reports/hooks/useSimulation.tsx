import { useQuery } from "@tanstack/react-query"
import { executeSimulation } from "../services/footfall.service"
import { useSnackbar } from "notistack";



// TODO clima para hacer la simulación

export const useSimulation = () => {

  const {enqueueSnackbar} = useSnackbar();

  return useQuery(['simulation'], executeSimulation, {

    enabled: false,

    onSuccess: () => {
      enqueueSnackbar('Simulación ejecutada', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error al iniciar la simulación', { variant: 'error' });
    }
  })



}