import { FC, useContext, useEffect, useState } from 'react';



import { Box, IconButton, ListItemAvatar, ListItemButton, ListItemText, TableCell, TableRow, Typography, } from '@mui/material';

import { AddCircleOutline, RemoveCircleOutline, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ICreateOrderDetail, IOrderDetail } from '../../../../../../models';
import { useCounter } from '../../../hooks';

import { OrderActionType, OrderContext } from '../../../context/Order.context';
import { sharingInformationService } from '../../../services/sharing-information.service';
import { CounterInput } from '../../../components/CounterInput.component';


interface Props {
  detalle: ICreateOrderDetail;
}

export const NewOrderDetail: FC<Props> = ({ detalle }) => {

  const { state: counter, increment, decrement } = useCounter(detalle.quantity);

  const [quantity, setQuantity] = useState<number>(detalle.quantity);

  const { dispatch } = useContext(OrderContext);

  const update = () => { 
    dispatch({ type: OrderActionType.UPDATE_DETAIL, payload: { ...detalle, quantity } });
  }

  const handleChangeQuantity = (value: number) => {

    setQuantity(value);

    update();
  }

  const deleteDetail = () => {

    dispatch({ type: OrderActionType.DELETE_DETAIL, payload: detalle });

  }

  const editDescription = () => {

    console.log(detalle);

    sharingInformationService.setSubject(true, detalle);

  }

  useEffect(() => {

    update();

  }, [quantity])



  return (
    <>
      <TableRow
        sx={{
          whiteSpace: 'nowrap',
        }}
      >


        <TableCell align='center'>
          <CounterInput
            value={quantity}
            onChange={handleChangeQuantity}
            min={0.5}


          />
        </TableCell>

        <TableCell>
          <Typography variant='h5' noWrap>{detalle.product.name}</Typography>
          {/* <Typography variant='body1'>$ {detalle.product.price}</Typography> */}

        </TableCell>

        <TableCell>

          <Typography variant="body2" whiteSpace='pre-wrap'>

            {detalle.description ? detalle.description : "Normal"}


          </Typography>

        </TableCell>

        {/* <TableCell align='center'>
          <Typography variant="body1" >$ {detalle.product.price * quantity}</Typography>
        </TableCell> */}

        <TableCell
          align='center'
        >




          <IconButton
            onClick={editDescription}
            color='inherit'
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            aria-label="Eliminar detalle"
            onClick={deleteDetail}
            disabled={false}
            color='error'
          >
            <DeleteOutline />
          </IconButton>
        </TableCell>








      </TableRow>



    </>
  )
}


