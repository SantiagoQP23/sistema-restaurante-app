import { useState } from "react";
import { Period } from "../models/period.model";
import { SelectChangeEvent } from "@mui/material";



export const usePaginationAsync = (periodo = Period.TODAY) => {

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [period, setPeriod] = useState<Period>(periodo);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [endDate, setEndDate] = useState<Date | null>();

  const [endDateChecked, setEndDateChecked] = useState(false);

  const handleChangeEndDateChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateChecked(event.target.checked);

  };



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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    resetPage();
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as Period);
    resetPage();
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    setStartDate(newValue);
    resetPage();
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    setEndDate(newValue);
    resetPage();
  };

  

  return {
    
    // Getters
    page,
    rowsPerPage,
    period,
    startDate,
    endDate,
    endDateChecked,
    
    // Setters
    nextPage,
    prevPage,
    resetPage,
    

    // Handlers
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangePeriod,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeEndDateChecked


  }
}