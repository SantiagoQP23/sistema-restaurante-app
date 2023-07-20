import { useQuery } from "@tanstack/react-query";
import { FootfallResponse, getFootfall, getSimulatedFootfall, executeSimulation, getPredictionFootfall, getComparisonFootfall } from '../services/footfall.service';
import { useDateFilter } from "../../../../hooks/useDateFilter";
import { Period, GroupBy } from "../../../../models/period.model";
import {useEffect} from 'react';
import { queryClient } from "../../../../main";



export const useFootfall = () => {
  return useQuery(['footfall'], getFootfall, { });
}



export const useSimulatedFootfall = (period: Period, groupBy: GroupBy) => {

  const dateFilter = useDateFilter(period);

  const simulatedFootfallQuery = useQuery<FootfallResponse>(['simulatedFootfall', dateFilter.startDate, dateFilter.endDate],
  () =>  getSimulatedFootfall({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
    period: dateFilter.period,
    groupBy

  }), {
    onSuccess: (data) => {
      console.log(data)
    }

   })


  useEffect(() => {
    simulatedFootfallQuery.refetch()
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period])


  return {
    ...dateFilter,
    simulatedFootfallQuery
  }

}


export const useExecuteSimulation = () => {

  const executeSimulationQuery = useQuery(['executeSimulation'], executeSimulation, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['simulatedFootfall'])
    }
  })

  return executeSimulationQuery;
}


export const useForecastFootfall = () => {

  const forecastFootfallQuery = useQuery(['forecastFootfall'], () => {
    return getPredictionFootfall()
     
  }, {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return forecastFootfallQuery;

}


export const useComparisonFootfall = (period: Period, groupBy: GroupBy) => {

  const dateFilter = useDateFilter(period);

  const comparisonFootfallQuery = useQuery(['comparisonFootfall', dateFilter.startDate, dateFilter.endDate],
  () =>  getComparisonFootfall({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate,
    period: dateFilter.period,
    groupBy

  }), {
    onSuccess: (data) => {
      console.log(data)
    }

   })

   useEffect(() => {
    comparisonFootfallQuery.refetch()
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period])


  return {
    ...dateFilter,
    comparisonFootfallQuery
  }

}
