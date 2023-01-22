import { IOrder } from '../../../../models/orders.model';
import { ITable } from '../../../../models/table.model';

export interface SocketResponse {
  ok: boolean;
  msg: string;
}


export interface SocketResponseOrder extends SocketResponse {
  order?: IOrder;
}

export interface SocketResponseTable extends SocketResponse {
  table?: ITable;
}