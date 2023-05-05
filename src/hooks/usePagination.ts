import { useState } from "react";



export const usePagination = <T>(list: T[]) => {

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [paginatedList, setPaginatedList] = useState<T[]>(list);


  const nextPage = () => {
    setPage(page + 1);
  }

  const prevPage = () => {
    setPage(page - 1);
  }

  const resetPage = () => {
    setPage(0);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaginatedList(list.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaginatedList(list.slice(page * parseInt(event.target.value, 10), page * parseInt(event.target.value, 10) + parseInt(event.target.value, 10)));
    setRowsPerPage(parseInt(event.target.value, 10));
    resetPage();
  };

  return {
    page,
    rowsPerPage,
    nextPage,
    prevPage,
    resetPage,
    handleChangePage,
    handleChangeRowsPerPage, 
    paginatedList
  }




}