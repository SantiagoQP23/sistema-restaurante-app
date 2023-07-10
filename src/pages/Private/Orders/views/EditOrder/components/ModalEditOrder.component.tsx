import { Close } from "@mui/icons-material"
import { FC, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Input, TextField, Typography, InputLabel } from '@mui/material';
import { IOrder, ITable, TypeOrder } from "../../../../../../models";
import { OrderTable } from "./OrderTable.component";
import { OrderTypeSelector } from "./OrderTypeSelector.component";
import { PeopleCounter } from "./PeopleCounter.component";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useUpdateOrder } from "../../../hooks/useUpdateOrder";
import { UpdateOrderDto } from "../../../dto";
import { CounterInput } from "../../../components";
import { formatDate } from '../../../../Common/helpers/format-date.helper';

interface Props {
  open: boolean;
  closeModal: () => void;
  order: IOrder;

}

export const ModalEditOrder: FC<Props> = ({ open, closeModal, order }) => {

  const [type, setType] = useState<TypeOrder>(order.type);

  const [tableId, setTableId] = useState<string>(order.table ? order.table.id : '');

  const [people, setPeople] = useState<number>(order.people || 0);

  const [notes, setNotes] = useState<string>(order.notes || '');


  const [deliveryTime, setDeliveryTime] = useState<Date | null>(order.deliveryTime || null);

  const { updateOrder } = useUpdateOrder();

  const handleChangeDeliveryTime = (date: Date | null) => {

    setDeliveryTime(date);

  }


  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value)
  }

  const handleChangePeople = (value: number) => {
    setPeople(value);
  }

  const handleChangeTable = (tableId: string) => {

    setTableId(tableId);

  }

  const handleChangeType = (type: TypeOrder) => {
    setType(type);
  }





  useEffect(() => {

    setType(order.type);
    setTableId(order.table ? order.table.id : '');
    setPeople(order.people || 0);
    setNotes(order.notes || '');
    setDeliveryTime(order.deliveryTime || null);

  }, [order])























  const submitUpdateOrder = () => {

    const data: UpdateOrderDto = {
      id: order.id,
      notes,
      people,
      tableId,
      typeOrder: type,
    }

    if (deliveryTime) {
      data.deliveryTime = deliveryTime;
    }

    console.log(data)

    updateOrder(data);

    closeModal();

  }




  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}



      >
        <Typography variant='h4'>
          Editar pedido
        </Typography>

        <IconButton
          onClick={closeModal}
        >
          <Close />
        </IconButton>

      </DialogTitle>


      <DialogContent>

        <Typography>
          Datos de entrega
        </Typography>
        <Grid container spacing={2} mt={1}>

          <Grid item xs={12} >
            <InputLabel>Tipo de pedido</InputLabel>
          </Grid>

          <Grid item xs={12} >
            <OrderTypeSelector type={type} setType={handleChangeType} />
          </Grid>
          {
            type === "IN_PLACE" as TypeOrder &&
            (
              <>
                <Grid item xs={12} sm={6}>
                  <OrderTable tableId={tableId} setTable={handleChangeTable} />
                  {
                    type === TypeOrder.IN_PLACE && !tableId && <Typography color='error'>Seleccione una mesa</Typography>

                  }
                </Grid>
              </>
            )


          }

          <Grid item xs={12} sm={6}>
            <MobileDateTimePicker
              label="Hora de entrega"
              value={deliveryTime}
              onChange={handleChangeDeliveryTime}
              renderInput={(params) => <TextField {...params} />}

            />
          </Grid>

        </Grid>
        <Divider sx={{ my: 3 }} />

        <Typography>
          Información adicional
        </Typography>

        <Grid container spacing={2} mt={1} >


          <Grid item xs={12}>
            <CounterInput
              value={people}
              onChange={handleChangePeople}
              min={6}
            />


          </Grid>


          <Grid item xs={12}>

            <TextField
              id="descripcion-pedido"
              label="Notas"
              margin="dense"
              multiline
              rows={4}

              // defaultValue={detail?.description}
              fullWidth

              value={notes}
              onChange={handleChangeNotes}


            />
          </Grid>

        </Grid>

      </DialogContent >

      <DialogActions>

        <Button
          variant='outlined'
          onClick={closeModal}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          onClick={submitUpdateOrder}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  )
}