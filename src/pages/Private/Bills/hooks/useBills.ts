import { useSnackbar } from "notistack";
import { useState, useContext } from "react";
import { SocketContext } from "../../../../context";
import { IOrder } from "../../../../models";
import { SocketResponse } from "../../../../models/socket-response.dto";
import { EventsEmitSocket } from "../../Orders/interfaces/events-sockets.interface";
import { CreateBillDto, RemoveBillDto, UpdateBillDto } from "../dto";
import { useQuery } from "@tanstack/react-query";
import { getBill, getBills } from "../services/bills.service";
import { useWebSocket } from "../../../../hooks/useWebSockets";

export const useCreateBill = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useWebSocket<{ order: IOrder }, CreateBillDto>(
    EventsEmitSocket.createBill,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "success" });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "error" });
      },
    }
  );
};

export const useBill = (term: number) => {
  return useQuery(["bill", term], () => getBill(term), {
    enabled: !!term,
  });
};

export const useBills = () => {
  return useQuery(["bills"], () => getBills());
};

export const useDeleteBill = () => {
  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const deleteBill = async (order: RemoveBillDto) => {
    setLoading(true);

    socket?.emit(
      EventsEmitSocket.deleteBill,
      order,
      (resp: SocketResponse<{ order: IOrder }>) => {
        setLoading(false);
        if (resp.ok) {
          enqueueSnackbar(resp.msg, { variant: "success" });
        } else {
          console.log(resp);
          enqueueSnackbar(resp.msg, { variant: "error" });
        }
      }
    );
  };

  return {
    isLoading: loading,
    deleteBill,
  };
};

export const useUpdateBill = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useWebSocket<{ order: IOrder }, UpdateBillDto>(
    EventsEmitSocket.updateBill,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "success" });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: "error" });
      },
    }
  );
};
