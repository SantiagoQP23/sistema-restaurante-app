

import { Subject } from 'rxjs';
import { IOrderDetail, IOrder } from '../../../../models/orders.model';



export class SubjectDescriptionDetail {
  subject$ = new Subject<{value: boolean, detalle: IOrderDetail}>();

  getSubject(){

    return this.subject$.asObservable();
  }

  setSubject(value: boolean, detalle: IOrderDetail){
    this.subject$.next({value, detalle});
  }
}

export class SubjectDispatchDetail {
  subject$ = new Subject<{value: boolean, detalle: IOrderDetail, orderId: string}>();

  getSubject(){

    return this.subject$.asObservable();
  }

  setSubject(value: boolean, detalle: IOrderDetail, orderId: string){
    this.subject$.next({value, detalle, orderId});
  }
}
export class SubjectModalDeleteOrder {
  subject$ = new Subject<{value: boolean, order: IOrder}>();

  getSubject(){

    return this.subject$.asObservable();
  }

  setSubject(value: boolean, order: IOrder){
    this.subject$.next({value, order});
  }
}

export class SubjectModalPayOrder {
  subject$ = new Subject<{value: boolean, order: IOrder}>();

  getSubject(){

    return this.subject$.asObservable();
  }

  setSubject(value: boolean, order: IOrder){
    this.subject$.next({value, order});
  }
}



