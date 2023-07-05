import { IClient } from '../../../../models';
import { PaymentMethod } from '../../Orders/models/Invoice.model';
import { Transaction } from './transaction.model';


export interface Income {
  id: number;
  transaction: Transaction;

  client?: IClient;
  

  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;

}