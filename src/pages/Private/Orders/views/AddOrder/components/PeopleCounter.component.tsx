import { Typography, Stack } from '@mui/material';
import { FC, useContext } from "react";
import { CounterInput } from "../../../components/CounterInput.component";
import { OrderContext, OrderActionType } from "../../../context/Order.context";

export const PeopleCounter: FC = () => {

  const { state, dispatch } = useContext(OrderContext);

  const handleChangePeople = (value: number) => {
    dispatch({ type: OrderActionType.SET_PEOPLE, payload: value })
  }

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='subtitle1' >Personas</Typography>
        <CounterInput
          value={state.people || 1}
          onChange={handleChangePeople}
          min={1}

        />

      </Stack>



    </>
  )
}

