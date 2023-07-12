import { create } from 'zustand';

export enum TypeTransaction {

  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface CashTransaction {

  id: string;

  reason: string;

  responsible: string;

  amount: number;
  user: string;
  createdAt: Date;
  updatedAt: Date;


}