export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  address: string;
  capacity: number;
  percentageAttendance: number;
  simulationEndDate: string;
  simulationStartDate: string;
  lastSimulationUpdate: string;
  lastPredictionUpdate: number;
}
