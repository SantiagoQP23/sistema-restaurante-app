import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../../redux";


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

      {
        format(new Date(), 'EEEE dd MMMM.  ',
          {
            locale: es
          })


      }
      <br />
      {
        " Ult. actualización: " + format(new Date(lastUpdatedOrders), 'HH:mm:ss')
      }

    </>
  )
}