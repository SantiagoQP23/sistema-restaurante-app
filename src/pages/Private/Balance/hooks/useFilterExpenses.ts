import { useDateFilter } from "../../../../hooks/useDateFilter";
import { usePaginationAsync } from "../../../../hooks/usePaginationAsync";
import { Period } from "../../../../models/period.model";
import { useFilterTransactions } from "./useFilterTransactions";




export const useFilterExpenses = () => {

  const dateFilter = useDateFilter(Period.TODAY);


  const pagination = usePaginationAsync();

  const transactionsFilter = useFilterTransactions();


  return {
    ...dateFilter,
    ...pagination,
    ...transactionsFilter
  }

}