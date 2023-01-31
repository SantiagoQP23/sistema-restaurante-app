export interface IDay {
  id: number;
  date: string;
  precip: number;
  temp: number;
  affluences: IAffluence[];
  nameDay: string;
  tempMax: number;
  tempMin: number;
  holiday: boolean;

}


export enum TypeAffluence {
  REAL = "REAL",
  SIMULATED = "SIMULATED",
  PREDICTED = "PREDICTED"
}

export interface IAffluence {
  id: number;
  type: TypeAffluence;
  affluence: number;
}