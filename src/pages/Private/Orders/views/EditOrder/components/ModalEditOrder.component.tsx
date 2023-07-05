import { Close } from "@mui/icons-material"
import { FC, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Input, TextField, Typography, InputLabel } from '@mui/material';
import { IOrder, TypeOrder } from "../../../../../../models";
import { OrderTable } from "./OrderTable.component";
import { OrderTypeSelector } from "./OrderTypeSelector.component";
import { PeopleCounter } from "./PeopleCounter.component";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useUpdateOrder } from "../../../hooks/useUpdateOrder";
import { UpdateOrderDto } from "../../../dto";

interface Props {
  open: boolean;
  closeModal: () => void;
  order: IOrder;

}

export const ModalEditOrder: FC<Props> = ({ open, closeModal, order }) => {



  const [notes, setNotes] = useState<string>(order.notes || '');

  const {updateOrder} = useUpdateOrder();

  const [date, setDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    setDate(date)
  }

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value)
  }

  const submitUpdateOrder = () => {

    const data: UpdateOrderDto = {
      id: order.id,
      notes
    }

    if(date){
      data.deliveryTime = date;
    }

    console.log(data)

    // updateOrder(data);

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
        <Grid container spacing={2} mt={1}>





          <Grid item xs={12} >
            <InputLabel>Tipo de pedido</InputLabel>
            <OrderTypeSelector />
          </Grid>

          <Grid item xs={6} >
            <PeopleCounter order={order} />
          </Grid>

          {
            order.type === "IN_PLACE" as TypeOrder &&
            (
              <>
                <Grid item xs={6} >
                  <OrderTable />
                </Grid>
              </>
            )


          }
          </Grid>
          <Divider sx={{my: 3}}/>
          <Grid container spacing={2} >


          <Grid item xs={12}>
            <MobileDateTimePicker
              label="Hora de entrega"
              value={date}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
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