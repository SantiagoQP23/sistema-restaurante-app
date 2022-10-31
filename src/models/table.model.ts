


export interface ITable {
  id: number;
  name: string;
  description: string;
  chairs: number;

}


export interface ICreateTable {
  name: string;
  description?: string;
  chairs: number;

}