

import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";
import { IUser } from "../../../../models";
import { Period } from "../../../../models/period.model";
import { DateIncome, DateOrders } from '../models/date-orders.interface';




export interface FilterDto {
  period: Period;
  startDate?: Date | null;
  endDate?: Date | null;
  offset?: number;
  limit?: number;


}

interface Product {
  name: string;
  id: string;
  totalSold: number;
}

export interface ResultBestSellingProducts {
  products: Product[];
  count: number;
}

export interface IncomeByUser{
  user: IUser;
  total: number;
}

export const getBestSellingProducts = async (filterDto: FilterDto): Promise<ResultBestSellingProducts> => {

  console.log(filterDto)

  const { period, startDate, endDate, offset = 0, limit = 10 } = filterDto;

  const resp = await restauranteApi.get<ResultBestSellingProducts>(`/orders/best-selling-products/`, {
    params: {
      period,
      startDate,
      endDate,
      offset: limit * offset,
      limit
    }
  });

  // console.log(resp.data);

  return resp.data;
}


export const getIncomesByUser = async (filterDto: FilterDto): Promise<IncomeByUser[]> => {

  console.log(filterDto)

  const { period, startDate, endDate, offset = 0, limit = 10 } = filterDto;

  const resp = await restauranteApi.get<IncomeByUser[]>(`/orders/incomes-by-user/`, {
    params: {
      period,
      startDate,
      endDate,
      offset: limit * offset,
      limit
    }
  });

  // console.log(resp.data);

  return resp.data;
}



export const getIncomes = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<DateIncome>(`/orders/incomes/`,
      { signal: controller.signal,
        params: {

          period: Period.TODAY,
        }

         }),
    controller,
    
  }

}

export const getOrdersEachDate = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<DateOrders>(`/orders/qty-each-date/`,
      { signal: controller.signal,
        params: {
          period: Period.TODAY,
        }
      }),
    controller
  }

}

export const getIncomesDate = async (filterDto: FilterDto): Promise<DateIncome[]> => {

  const { period, startDate, endDate, limit=10, offset = 0 } = filterDto;

  const resp = await restauranteApi.get<DateIncome[]>(`/orders/incomes/`, {
    params: {
      period,
      startDate,
      endDate,
      offset: limit * offset,
      limit
    }
  })

  return resp.data

}