import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../../redux";
import { Typography, Stack } from '@mui/material';


export const Clock = () => {
  const [date, setDate] = useState(new Date());

  const { lastUpdatedOrders } = useSelector(selectOrders);


  function tick() {
    setDate(new Date());
  }


  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, [])


  return (
    <>
      <Stack direction={{sx: 'column'}} spacing={2} py={1}>

        <Typography variant="h5" >
          Fecha: {format(date, 'eeee dd/MM/yyyy', { locale: es })}
        </Typography>

        <Typography variant="body1" >

          {
            " Ult. actualización: " + format(new Date(lastUpdatedOrders), 'HH:mm:ss')
          }
        </Typography>

      </Stack>
    </>
  )
}