import { useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ActiveCashRegister,
  createCashRegister,
  getAllCashRegisters,
  getCashRegister,
  getCashRegisterActive,
  updateCashRegister,
} from "../services/cash-register.service";
import { useSnackbar } from "notistack";
import { CashRegister } from "../models/cash-register.model";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { useCashRegisterStore } from "../../Common/store/cashRegisterStore";
import { UpdateCashRegisterDto } from "../dto/update-cash-register.dto";
import { useDateFilter } from "../../../../hooks/useDateFilter";
import { Period } from "../../../../models/period.model";
import { usePaginationAsync } from "../../../../hooks/usePaginationAsync";

export const useAllCashRegister = () => {
  const dateFilter = useDateFilter(Period.MONTH);
  const pagination = usePaginationAsync();

  const cashRegisterQuery = useQuery(
    ["cashRegister"],
    () =>
      getAllCashRegisters({
        ...dateFilter,
        ...pagination,
      }),
    {
      onSuccess: () => {},
    }
  );

  useEffect(() => {
    cashRegisterQuery.refetch();
    pagination.resetPage();
  }, [
    pagination.rowsPerPage,
    dateFilter.startDate,
    dateFilter.endDate,
    dateFilter.period,
  ]);

  useEffect(() => {
    cashRegisterQuery.refetch();
  }, [pagination.page]);

  return {
    cashRegisterQuery,
    ...dateFilter,
    ...pagination,
  };
};

export const useCashRegister = (term: string) => {
  const cashRegisterQuery = useQuery(
    ["cashRegister", term],
    () => getCashRegister(term),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    cashRegisterQuery,
  };
};

export const useCashRegisterActive = () => {
  const { setActiveCashRegister } = useCashRegisterStore((state) => state);

  const cashRegisterQuery = useQuery<ActiveCashRegister>(
    ["cashRegisterActive"],
    getCashRegisterActive,
    {
      // enabled: false,
      onSuccess: (data) => {
        setActiveCashRegister(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    cashRegisterQuery,
  };
};

export const useCreateCashRegister = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setActiveCashRegister } = useCashRegisterStore((state) => state);

  return useMutation<ActiveCashRegister, unknown, CreateCashRegisterDto>(
    createCashRegister,
    {
      onSuccess: (data) => {
        enqueueSnackbar("Caja creada correctamente", { variant: "success" });
        setActiveCashRegister(data);
      },
      onError: () => {
        enqueueSnackbar("Ocurrió un error al crear la caja", {
          variant: "error",
        });
      },
    }
  );
};

export const useUpdateCashRegister = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setActiveCashRegister } = useCashRegisterStore((state) => state);

  return useMutation<CashRegister, unknown, UpdateCashRegisterDto>(
    updateCashRegister,
    {
      onSuccess: () => {
        enqueueSnackbar("Caja actualizada correctamente", {
          variant: "success",
        });
        setActiveCashRegister(null);
      },
      onError: () => {
        enqueueSnackbar("Ocurrió un error al actualizar la caja", {
          variant: "error",
        });
      },
    }
  );
};
