import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";
import { Footfall, IDay } from '../models/day.interface';
import { UpdateDayDto } from '../dto/update-day.dto';


export const executeSeed = async () => {

  await restauranteApi.get(`simulation/seed/`);

}

export const getFootfall = async (): Promise<Footfall[]> => {

  const resp = await restauranteApi.get<Footfall[]>(`footfall/`);

  return resp.data;
}

export const getOneFootfall = async (date: string): Promise<Footfall> => {

  const resp = await restauranteApi.get<Footfall>(`footfall/${date}`, {});

  return resp.data;
}



export const getPredictionFootfall = async (): Promise<Footfall[]> => {

  const resp = await restauranteApi.get<Footfall[]>(`footfall/prediction`);

  return resp.data;
}

export const getDay = async (date: string): Promise<IDay> => {

  const resp = await restauranteApi.get<IDay>(`days/${date}`);

  return resp.data;

}

export const getDays = async (): Promise<IDay[]> => {

  const resp = await restauranteApi.get<IDay[]>(`days/`);

  return resp.data;

}



// export const getAffluence = () => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.get<IAffluence>(`affluence/`,
//       { signal: controller.signal }),
//     controller
//   }

// }

// export const getAffluenceDate = (date: string) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.get<IAffluence>(`affluence/${date}`,
//       { signal: controller.signal }),
//     controller
//   }

// }


// export const getPredictionAffuence = () => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.get<IAffluence>(`affluence/prediction`,
//       { signal: controller.signal }),
//     controller
//   }

// }



// export const updateDay = (date: string, data: UpdateDayDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<IAffluence>(`days/${date}`, data,
//       { signal: controller.signal }),
//     controller
//   }

// }


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

export const executeSimulation = async (): Promise<Footfall[]> => {

  const resp = await restauranteApi.get<Footfall[]>(`simulation/update`);

  return resp.data;

}