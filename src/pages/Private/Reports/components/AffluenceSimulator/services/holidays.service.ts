

import { loadAbort } from '../../../../../../helpers/load-abort-axios.helper';
import restauranteApi from '../../../../../../api/restauranteApi';
import { Holiday } from '../models/holiday.model';
import { SubjectHoliday } from '../../../helpers/subjects-simulation.helper';
import { CreateHolidayDto } from '../dto/create-holiday.dto';
import { UpdateHolidayDto } from '../dto/update-holiday.dto';


export const statusModalHoliday = new SubjectHoliday();


export const getHolidays = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<Holiday[]>(`holiday/simulation`,
      { signal: controller.signal }),
    controller
  }

}
export const getHolidaysPrediction = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<Holiday[]>(`holiday/prediction`,
      { signal: controller.signal }),
    controller
  }

}


export const getHolidayById = (id: string) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<Holiday>(`holiday/${id}`,
      { signal: controller.signal }),
    controller
  }

}



export const createHoliday = (holiday: CreateHolidayDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.post<Holiday>(`holiday`,
      holiday,
      { signal: controller.signal }),
    controller
  }

}



export const updateHoliday = (holidayId: string, holiday: UpdateHolidayDto) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<Holiday>(`holiday/${holidayId}`,
      holiday,
      { signal: controller.signal }),
    controller
  }

}