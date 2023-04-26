import { FC, useContext, useEffect } from 'react';



import { Box, IconButton, Typography,  } from '@mui/material';

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

    <Box
      sx={{
        // border: '1px solid #ddd',

        // borderRadius: '8px',
        p:1 
      }}
    >





      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h5"
            color="initial"
          >

            {detalle.product.name} -
          </Typography>

          <Typography variant='subtitle1'>
            $ {detalle.product.price}
          </Typography>
        </Box>




      </Box>


      <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>

        <Typography variant="body2" color={detalle.description ? "orange" : "gray"}>

          {detalle.description ? detalle.description : "Normal"}
          <IconButton
            onClick={editDescription}
          >
            <EditOutlined />
          </IconButton>

        </Typography>

        <Box alignContent="right" >
          <Box display='flex' justifyContent='space-between' alignItems='center'>

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

            <Typography variant="body1" textAlign='right' fontWeight='bold'>$ {detalle.product.price * counter}</Typography>
          </Box>



        </Box>
      </Box>
      </Box>


      


    </>
  )
}


