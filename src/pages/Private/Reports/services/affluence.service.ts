import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";
import { IAffluence, IDay } from '../models/day.interface';
import { UpdateDayDto } from '../dto/update-day.dto';


export const getAffluence = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IAffluence>(`affluence/`,
      { signal: controller.signal }),
    controller
  }

}

export const getAffluenceDate = (date: string) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IAffluence>(`affluence/${date}`,
      { signal: controller.signal }),
    controller
  }

}




export const getPredictionAffuence = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IAffluence>(`affluence/prediction`,
      { signal: controller.signal }),
    controller
  }

}



export const updateDay = (date: string, data: UpdateDayDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<IAffluence>(`days/${date}`, data,
      { signal: controller.signal }),
    controller
  }

}


export const updateWeatherForecast = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IDay[]>(`affluence/weather-forecast/update`,

      { signal: controller.signal }),
    controller


  }
}


export const updatePredictionAffluence = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IDay[]>(`affluence/prediction/update`,

      { signal: controller.signal }),
    controller
  }
}

export const updateSimulationAffluence = () => {
  
    const controller = loadAbort();
  
    return {
      call: restauranteApi.get<IDay[]>(`affluence/simulation/update`,
  
        { signal: controller.signal }),
      controller
    }
  }