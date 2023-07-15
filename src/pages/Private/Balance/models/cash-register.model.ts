import { IUser } from "../../../../models";
// import { CashIncome } from "./cash-transaction.model";


export interface CashRegister {
    id: string;

    initialAmount: number;

    finalAmount: number;

    isClosed: boolean;

    closingDate: Date;

    balance: number;


    createdAt: Date;
    updatedAt: Date;
    user: IUser;

    // cashIncomes: CashIncome[];



}