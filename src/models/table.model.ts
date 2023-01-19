


export interface ITable {
  id: number;
  name: string;
  description: string;
  chairs: number;
  isAvailable: boolean;

}


export interface ICreateTable {
  name: string;
  description?: string;
  chairs: number;

}