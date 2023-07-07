import { create } from 'zustand';


export interface CashIncome{
    id: string;
    amount: number;
    user: string;
    createdAt: Date;
    updatedAt: Date;


}