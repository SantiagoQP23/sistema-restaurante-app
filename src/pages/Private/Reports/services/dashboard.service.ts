

import { restauranteApi } from "../../../../api";
import { loadAbort } from "../../../../helpers";
import { IUser } from "../../../../models";
import { DateIncome, DateOrders } from '../models/date-orders.interface';
import { CustomGroupBy, GroupBy, Period } from '../hooks/useFilterSoldProducts';
import { filter } from "rxjs";
import { DateFiltePaginationDto, DateFilterDto } from "../../Common/dto";




export interface FilterDto {
  period: Period;
  startDate?: Date | null;
  endDate?: Date | null;
  offset?: number;
  limit?: number;
  groupBy: GroupBy | null;
  customGroupBy: CustomGroupBy;


}

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  categoryName: string;
  totalSold: number;
}

export interface ResultBestSellingProducts {
  products: Product[];
  count: number;
}

export interface BestSellingCategoriesResponse {
  categories: {
    categoryId: string;
    categoryName: string;
    totalSold: string;
  }[];
  count: number;
}

export interface ResponseIncomesByUser{
 
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    roleName: string;
    total: string;
    orderCount: string;

 
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
      limit,
      groupBy: filterDto.groupBy,
      customGroupBy: filterDto.customGroupBy === CustomGroupBy.PRODUCT ? filterDto.customGroupBy : undefined

    }
  });

  // console.log(resp.data);

  return resp.data;
}
export const getBestSellingCategories = async (filterDto: FilterDto): Promise<BestSellingCategoriesResponse> => {

  console.log(filterDto)

  const { period, startDate, endDate, offset = 0, limit = 10 } = filterDto;

  const resp = await restauranteApi.get<BestSellingCategoriesResponse>(`/orders/best-selling-categories/`, {
    params: {
      period,
      startDate,
      endDate,
      offset: limit * offset,
      limit,

    }
  });

  // console.log(resp.data);

  return resp.data;
}






export const getIncomesByUser = async (filterDto: DateFilterDto): Promise<ResponseIncomesByUser[]> => {

  console.log(filterDto)

  const { period, startDate, endDate,  } = filterDto;

  const resp = await restauranteApi.get<ResponseIncomesByUser[]>(`/orders/incomes-by-user/`, {
    params: {
      period,
      startDate,
      endDate,
     
    }
  });

  // console.log(resp.data);

  return resp.data;
}



export const getIncomes = () => {

  // const controller = loadAbort();

  // return {
  //   call: restauranteApi.get<DateIncome>(`/orders/incomes/`,
  //     { signal: controller.signal,
  //       params: {

  //         period: Period.TODAY,
  //       }

  //        }),
  //   controller,
    
  // }

}

export const getOrdersEachDate = () => {

  // const controller = loadAbort();

  // return {
  //   call: restauranteApi.get<DateOrders>(`/orders/qty-each-date/`,
  //     { signal: controller.signal,
  //       params: {
  //         period: Period.TODAY,
  //       }
  //     }),
  //   controller
  // }

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