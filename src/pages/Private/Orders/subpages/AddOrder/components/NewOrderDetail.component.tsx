import { FC, useContext, useEffect } from 'react';



import { Box, IconButton, ListItemAvatar, ListItemButton, ListItemText, TableCell, TableRow, Typography, } from '@mui/material';

import { AddCircleOutline, RemoveCircleOutline, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ICreateOrderDetail, IOrderDetail } from '../../../../../../models';
import { useCounter } from '../../../hooks';

import { OrderContext } from '../../../context/Order.context';
import { sharingInformationService } from '../../../services/sharing-information.service';


interface Props {
  detalle: ICreateOrderDetail;
}

export const NewOrderDetail: FC<Props> = ({ detalle }) => {

  const { state: counter, increment, decrement } = useCounter(detalle.quantity);

  const { updateDetail, deleteDetail } = useContext(OrderContext);

  const update = () => {
    updateDetail({ ...detalle, quantity: counter })

  }

  const deleteDet = () => {

    deleteDetail(detalle.product.name);

  }

  const editDescription = () => {

    console.log(detalle);

    sharingInformationService.setSubject(true, detalle);

  }


  useEffect(() => {
    update();

  }, [counter])



  return (
    <>
      <TableRow>
      

        <TableCell align='center'>
          <Box display='flex' justifyContent='space-between' alignItems='center' >

            {
              counter > 1
                ?
                <IconButton
                  onClick={() => {
                    decrement()

                  }}
                >
                  <RemoveCircleOutline />
                </IconButton>
                :
                <IconButton
                  aria-label="Eliminar detalle"
                  onClick={deleteDet}
                  disabled={false}
                  color='error'
                >
                  <DeleteOutline />
                </IconButton>
            }

            <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
            <IconButton
              onClick={() => {
                increment()

              }}
            >
              <AddCircleOutline />
            </IconButton>

          </Box>
        </TableCell>

        <TableCell>
          <Typography variant='h5' noWrap>{detalle.product.name}</Typography>
          <Typography variant='body1'>$ {detalle.product.price}</Typography>

        </TableCell>

        <TableCell>

          <Typography variant="body2" whiteSpace='pre-wrap'>

            {detalle.description ? detalle.description : "Normal"}


          </Typography>

        </TableCell>

        <TableCell align='center'>
          <Typography variant="body1" >$ {detalle.product.price * counter}</Typography>
        </TableCell>

        <TableCell
          align='center'
        >
          <IconButton
            onClick={editDescription}
          >
            <EditOutlined />
          </IconButton>
        </TableCell>








      </TableRow>



    </>
  )
}


