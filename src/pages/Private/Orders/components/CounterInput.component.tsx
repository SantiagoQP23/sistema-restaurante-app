import { FC, useEffect } from 'react';

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material"
import { Stack, IconButton, TextField } from "@mui/material"
import { useCounter } from "../hooks"


interface Props {

  min?: number;
  value: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;

}

export const CounterInput: FC<Props> = ({ value, min = 1, max, step, onChange }) => {


  const { state: counter, increment, decrement, setCounter } = useCounter(value, step, max, min);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = parseFloat(e.target.value) || 0;

    if (Number.isNaN(value))
      setCounter(0);
    else
      setCounter(value);

    if (onChange) {
      onChange(value);
    }

  }


  useEffect(() => {

    onChange && onChange(counter);

  }, [counter]);



  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        width={130}
        justifyContent='center'
        // divider={<Divider orientation="vertical" flexItem />}
        sx={{
          borderRadius: '8px',

        }}
      >

        <IconButton
          size="small"
          onClick={decrement}

        >
          <RemoveCircleOutline />
        </IconButton>


        <TextField
          style={{ marginLeft: '1px', textAlign: 'center' }}
          value={counter}
          onChange={handleChange}
          type='number'
          variant='outlined'
          size='small'
          inputProps={{
            min: 0.5,
            step: step || 0.5,
            
          }}

          sx={{ input: { textAlign: "center" } }}
        />

        <IconButton
          size="small"
          onClick={increment}
        >
          <AddCircleOutline />
        </IconButton>

        {/* <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography> */}

      </Stack>

    </>
  )
}