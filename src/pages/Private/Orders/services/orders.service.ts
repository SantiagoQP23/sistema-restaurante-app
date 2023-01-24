import { loadAbort } from '../../../../helpers/load-abort-axios.helper';
import restauranteApi from '../../../../api/restauranteApi';
import { IOrder } from '../../../../models/orders.model';
import { SubjectDescriptionDetail, SubjectDispatchDetail, SubjectModalDeleteOrder, SubjectModalPayOrder } from '../helpers/subject-orders.helper';


export const statusModalDescriptionDetail = new SubjectDescriptionDetail();
export const statusModalDispatchDetail = new SubjectDispatchDetail();
export const statusModalDeleteOrder = new SubjectModalDeleteOrder();

export const statusModalPayOrder = new SubjectModalPayOrder();

export const getOrdersToday = () => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IOrder>(`orders`,

      { signal: controller.signal }),
    controller

  }

}


export const getOrder = (orderId: string) => {

  const controller = loadAbort();

  return {
    call: restauranteApi.get<IOrder>(`orders/${orderId}`,

      { signal: controller.signal }),
    controller

  }

}
