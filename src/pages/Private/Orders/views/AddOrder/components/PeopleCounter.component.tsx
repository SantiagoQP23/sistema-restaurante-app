import { Typography, Stack, Box, Button, InputBase } from '@mui/material';
import { FC, useContext } from "react";
import { CounterInput } from "../../../components/CounterInput.component";
import { OrderContext, OrderActionType } from "../../../context/Order.context";

import { Pagination } from '@mui/lab';
import { useModal } from '../../../../../../hooks';

export const PeopleCounter: FC = () => {

  const { state, dispatch } = useContext(OrderContext);

  const handleChangePeople = (value: number) => {
    dispatch({ type: OrderActionType.SET_PEOPLE, payload: value })
  }

  const { isOpen, handleClose, handleOpen } = useModal()

  return (
    <>
      <Typography variant='subtitle1' >Personas</Typography>
      <Stack direction='row' spacing={2} justifyContent='space-between'>

        <Pagination
          count={5}
          hidePrevButton
          hideNextButton
          // variant='outlined'
          color='primary'
          page={state.people || 0}
          onChange={(e, value) => handleChangePeople(value)}

        />

        {
          !isOpen && (
            <Button
              variant='outlined'
              size='small'
              onClick={handleOpen}
            >
              Otro
            </Button>

          )
        }

        {
          isOpen && (
            <InputBase
              value={state.people || ''}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                if (newValue >= 0) {
                  handleChangePeople(newValue);
                }
              }}
              type='number'
              inputProps={{
                min: 0,
              }}
              sx={{
                border: (theme) => `1px solid ${theme.colors.primary.main} `,
                borderRadius: '8px',
                padding: '0 8px',
                width: '80px',
              }}
              size='small'
            />

          )
        }


        {/* <CounterInput
          value={state.people || 1}
          onChange={handleChangePeople}
          min={1}

        /> */}

      </Stack>



    </>
  )
}

