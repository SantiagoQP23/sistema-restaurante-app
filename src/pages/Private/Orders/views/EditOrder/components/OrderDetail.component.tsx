import { FC, useContext, useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Typography, Button, CircularProgress, LinearProgress, TableCell, TableRow, Stack, Checkbox } from '@mui/material';

import { AddCircleOutline, RemoveCircleOutline, SaveOutlined, DeleteOutline, EditOutlined, CloseOutlined, CurtainsSharp, CheckCircle, Pending, CheckCircleOutline } from '@mui/icons-material';
import { IOrderDetail } from '../../../../../../models';
import { useCounter } from '../../../hooks';

import { Label } from '../../../../../../components/ui';
import { SocketContext } from '../../../../../../context/SocketContext';


import { UpdateOrderDetailDto } from '../../../dto/update-order-detail.dto';
import { EventsEmitSocket } from '../../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';
import { setActiveOrder } from '../../../../../../redux';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { statusModalDeleteOrderDetail, statusModalDescriptionDetail, statusModalEditOrderDetail } from '../../../services/orders.service';
import { DeleteOrderDetailDto } from '../../../dto/delete-order-detail.dto';
import { styled, useTheme } from '@mui/material/styles';
import { useUpdateOrderDetail } from '../../../hooks/useUpdateOrderDetail';
import { CounterInput } from '../../../components/CounterInput.component';
import { useDeleteOrderDetail } from '../../../hooks/useDeleteOrderDetail';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';


interface Props {
  detail: IOrderDetail;
}


export const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }`
);


export const OrderDetail: FC<Props> = ({ detail }) => {

  const { state: counter, increment, decrement } = useCounter(detail.quantity, 1, 500, detail.qtyDelivered);

  const [quantity, setQuantity] = useState(detail.quantity);

  const handleChangeQuantity = (value: number) => {

    setQuantity(value);

  }

  const dispatch = useDispatch();

  const theme = useTheme();

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const { update, loading } = useUpdateOrderDetail();

  const editDescription = () => {
    statusModalDescriptionDetail.setSubject(true, detail);
  }


  const { loading: loadingDelete, deleteOrderDetail } = useDeleteOrderDetail();
  
  const [checked, setChecked] = useState(detail.qtyDelivered === detail.quantity);


  
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.checked;

    if(value) {
      updateQtyDelivered(detail.quantity)
      
    }else {
      updateQtyDelivered(0)
      
    }

    setChecked(event.target.checked);
  };

  const updateQuantity = () => {

    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail.id,
      quantity
    }

    update(data);

  }

  const updateQtyDelivered = (qtyDelivered: number) => {



    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail!.id,
      qtyDelivered: qtyDelivered,

    }

    update(data)
    
  }




  const editDetail = () => {

    statusModalEditOrderDetail.setSubject(true, detail, activeOrder!.id);
  }




  const deleteDetail = () => {

    statusModalDeleteOrderDetail.setSubject(true, detail, activeOrder!.id);

    // const data: DeleteOrderDetailDto = {
    //   detailId: detail!.id,
    //   orderId: activeOrder!.id
    // }

    // deleteOrderDetail(data)

  }

  return (
    <>


      <TableRow
        sx={{
          whiteSpace: 'nowrap'
        }}

      >


        <TableCell align='center' padding='checkbox'>
          <Box display='flex' justifyContent='space-between' alignItems='center' >

            <CounterInput
              value={quantity}
              onChange={handleChangeQuantity}
              min={0.5}


            />



            {
              quantity !== detail.quantity && quantity > 0 && quantity >= detail.qtyDelivered &&
              <IconButton
                disabled={!quantity || quantity === detail.quantity || quantity < detail.qtyDelivered}
                color='primary'
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity()
                }}
              >
                <SaveOutlined />
              </IconButton>

            }
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant='h5' noWrap>{detail.product.name}</Typography>
          <Typography variant="body2" whiteSpace='pre-wrap'>

            {detail.description && detail.description}


          </Typography>

        </TableCell>

        <TableCell>

          <Typography variant='body1'>{formatMoney(detail.price)}</Typography>

        </TableCell>

        <TableCell align='left'>

          <Stack direction='column' alignItems='right' mt={0.5} >

            <LinearProgressWrapper
              value={(detail.qtyDelivered * 100) / detail.quantity}
              color="info"
              variant="determinate"
              sx={{
                width: '100%'
              }}

            />
            <Typography variant='subtitle1' fontSize={12}>{detail.qtyDelivered} / {detail.quantity}</Typography>
          </Stack>

        </TableCell>

        <TableCell align='right'>
          {
            // detail.discount > 0 &&
            // <Typography variant="subtitle1" >$ {detail.product.price * quantity} - $ {detail.discount}</Typography>
          }
          <Typography variant="body1" fontWeight='bold'>{formatMoney(detail.amount)}</Typography>
        </TableCell>

        <TableCell
          align='center'
        >

          <Checkbox
            icon={<CheckCircleOutline />}
            checkedIcon={<CheckCircle />}
            checked={checked}
            onChange={handleChangeChecked}
            inputProps={{ 'aria-label': 'controlled' }}
            color='success'
          />

          <IconButton
            onClick={editDetail}
            color='primary'
          >
            <EditOutlined />
          </IconButton>

          <IconButton
            onClick={deleteDetail}
            color='error'
          >
            <DeleteOutline />
          </IconButton>

        </TableCell>

      </TableRow>

    </>
  )
}

