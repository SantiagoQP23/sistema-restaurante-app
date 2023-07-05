

export interface UpdateRestaurantDto {

  id: string;

  name?: string;
  address?: string;
  capacity?: number;
  percentageAttendance?: number;
  simulationStartDate?: string;
  simulationEndDate?: string;
  lastSimulationUpdate?: Date;
  lastPredictionUpdate?: Date;

}