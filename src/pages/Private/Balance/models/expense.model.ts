import { PaymentMethod } from '../../Orders/models/Invoice.model';
import { Supplier } from '../../Suppliers/models/supplier.model';
import { Transaction } from './transaction.model';


export interface Expense {
    id: number;

    transaction: Transaction;
    supplier?: Supplier;
    
   
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;

}