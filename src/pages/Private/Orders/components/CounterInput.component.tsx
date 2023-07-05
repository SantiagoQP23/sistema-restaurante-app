import { FC, useEffect } from 'react';

import { RemoveCircleOutline, AddCircleOutline, AddBoxOutlined, AddBox, Add, Remove } from "@mui/icons-material"
import { Stack, IconButton, TextField, Divider, InputBase } from "@mui/material"
import { useCounter } from "../hooks"


interface Props {

  min?: number;
  value: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  fullWidth?: boolean;

}

export const CounterInput: FC<Props> = ({ value, min = 1, max, step, onChange, fullWidth = false }) => {


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
        width={fullWidth ? '100%': 130}
        justifyContent='center'
        // divider={<Divider orientation="vertical" flexItem />}
        sx={{
          borderRadius: '8px',
          border: '1px solid #777',
          // borderColor: 'inherit',

        }}
        
      >

        <IconButton
          size="small"
          onClick={decrement}

        >
          <RemoveCircleOutline />
        </IconButton>


        {/* <TextField
        
          value={counter}
          onChange={handleChange}
          type='number'
          size='small'
          inputProps={{
            min: 0.5,
            step: step || 0.5,
            
          }}
          variant='standard'

          
          

          sx={{ input: { textAlign: "center" } , borderBottom:  "none" }}
        /> */}

        <InputBase

          value={counter}
          onChange={handleChange}
          type='number'
          size='small'
          inputProps={{
            min: 0.5,
            step: step || 0.5,

          }}

          sx={{ input: { textAlign: "center" }, borderBottom: "none" }}
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