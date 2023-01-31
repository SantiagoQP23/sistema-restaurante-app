import { Staff } from '../models/staff.interface';

export function estimateStaff(expectedInflux: number): Staff {
  let cooks = 0;
  let waiters = 0;
  let chefs = 2;

  if (expectedInflux <= 100) {
    chefs = 2;
    waiters = 2;
    cooks = 1;
  } else if (expectedInflux > 100 && expectedInflux <= 200) {
    chefs = 2;
    waiters = 2;
    cooks = 2;
  } else if (expectedInflux > 200 && expectedInflux <= 300) {
    chefs = 2;
    waiters = 3;
    cooks = 6;
  } else if (expectedInflux > 300 && expectedInflux <= 400) {
    chefs = 2;
    waiters = 4;
    cooks = 8;
  } else {
    chefs = 2;
    waiters = 5;
    cooks = 9;
  }


  return {
    cooks,
    waiters,
    chefs, 
    total: cooks + waiters + chefs
  };
}
