import { IUser, PaymentMethod } from "../../../../models";


export interface Transaction {

    id: number;
    amount: number;
    description: string;
    paymentMethod: PaymentMethod;
    responsible: string;

    user: IUser;

}