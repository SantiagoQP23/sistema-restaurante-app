

import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";
import { DateIncome, DateOrders } from '../models/date-orders.interface';


export const getIncomes = ( ) => {
  
    const controller = loadAbort();
  
    return {
      call: restauranteApi.get<DateIncome>(`/orders/incomes/`,
        { signal: controller.signal }),
      controller
    }
  
}

export const getOrdersEachDate = ( ) => {
  
    const controller = loadAbort();
  
    return {
      call: restauranteApi.get<DateOrders>(`/orders/qty-each-date/`,
        { signal: controller.signal }),
      controller
    }
  
}