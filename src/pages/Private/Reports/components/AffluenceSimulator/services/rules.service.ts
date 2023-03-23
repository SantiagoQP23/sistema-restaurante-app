import { loadAbort } from '../../../../../../helpers/load-abort-axios.helper';
import restauranteApi from '../../../../../../api/restauranteApi';
import { RuleWeek } from '../models/rule-week.model';
import { UpdateRuleWeekDto } from '../dto/update-rule-week.dto';
import { RuleDay } from '../models/rule-day.model';
import { UpdateRuleDayDto } from '../dto/update-rule-day.dto';
import { RuleWeather } from '../models/rule-weather.model';
import { UpdateRuleWeatherDto } from '../dto/update-rule-weather';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';



export const getRulesWeek = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleWeek[]>(`rule-week`,
      { signal: controller.signal }),
    controller
  }

}


export const updateRulesWeek = (rulesWeek: UpdateRuleWeekDto[]) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleWeek[]>(`rule-week`, rulesWeek,
      { signal: controller.signal }),
    controller
  }

}


export const getRulesDay = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleDay[]>(`rule-day`,
      { signal: controller.signal }),
    controller
  }

}


export const updateRulesDay = (rulesDay: UpdateRuleDayDto[]) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleDay[]>(`rule-day`, rulesDay,
      { signal: controller.signal }),
    controller
  }

}

export const getRulesWeather = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleWeather>(`rule-weather`,
      { signal: controller.signal }),
    controller
  }

}


export const updateRulesWeather = (rulesWeather: UpdateRuleWeatherDto[]) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleWeather[]>(`rule-weather`, rulesWeather,
      { signal: controller.signal }),
    controller
  }

}


export const getRestaurant= (restaurantId: string) =>{
  const controller = loadAbort();

  return {
    call: restauranteApi.get<RuleWeather>(`restaurant/${restaurantId}`,
      { signal: controller.signal }),
    controller
  }

}


export const updateRestaurant = (restaurantId: string, restaurant: UpdateRestaurantDto) =>{
  const controller = loadAbort();

  return {
    call: restauranteApi.patch<RuleWeather>(`restaurant/${restaurantId}`, restaurant,
      { signal: controller.signal }),
    controller
  }

}

