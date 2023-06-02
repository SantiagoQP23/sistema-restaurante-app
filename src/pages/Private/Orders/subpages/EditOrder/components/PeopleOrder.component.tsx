import { Done } from "@mui/icons-material";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../../../../../context";
import { selectOrders, setActiveOrder } from "../../../../../../redux";
import { UpdateOrderDto } from "../../../dto/update-order.dto";
import { EventsEmitSocket } from "../../../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../../../interfaces/responses-sockets.interface";
import { useUpdateOrder } from "../../../hooks/useUpdateOrder";

interface Props {
  people: number;
}


export const PeopleOrder: FC<Props> = ({  }) => {


  const [people, setPeople] = useState<number>();

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { updateOrder, loading } = useUpdateOrder();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num < 1) return setPeople(1);

    setPeople(Number(event.target.value))
  }

  const updatePeopleOrder = () => {

    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      people,
    }

    updateOrder(data);



  }


  useEffect(() => {

    setPeople(activeOrder?.people);

    return () => {
      setPeople(0);
    }
  }, [activeOrder])


  return (
    <>
      <Box display='flex'>


        <TextField
          type='number'
          label='Personas'
          value={people}
          onChange={handleChange}
          variant='outlined'
          fullWidth
        />

        {
          activeOrder?.people !== people &&
          <IconButton
            onClick={() => updatePeopleOrder()}



          >
            {
              loading ? <CircularProgress size={20} /> : <Done />

          }

          </IconButton>

        }
      </Box>

    </>
  )
}
