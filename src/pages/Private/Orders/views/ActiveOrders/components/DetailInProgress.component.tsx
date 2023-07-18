import { FC, useState } from 'react'

import { useSelector } from 'react-redux';

import {
  Box, Typography, styled, LinearProgress,
  Tooltip, IconButton, useTheme, ListItemButton, ListItemIcon,
  ListItemText, ListItemAvatar, CircularProgress, Stack, Chip, Checkbox
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


import { IOrderDetail } from '../../../../../../models';
import { selectAuth } from '../../../../../../redux';
import { Text } from '../../../../components';
import { statusModalDispatchDetail, statusModalEditOrderDetail } from '../../../services/orders.service';
import { Label } from '../../../../../../components/ui';
import { CheckCircle, CheckCircleOutline, MoreVertOutlined } from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../../../dto';
import { useUpdateOrderDetail } from '../../../hooks/useUpdateOrderDetail';


const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 6px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }`
);

interface Props {
  detail: IOrderDetail;
  orderId: string
}



export const DetailInProgress: FC<Props> = ({ detail, orderId }) => {

  const { user } = useSelector(selectAuth);

  const theme = useTheme();

  const { update, loading } = useUpdateOrderDetail();

  const [checked, setChecked] = useState(detail.qtyDelivered === detail.quantity);


  const editDetail = () => {
    statusModalEditOrderDetail.setSubject(true, detail, orderId);
  }

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.checked;

    if(value) {
      updateQtyDelivered(detail.quantity)
      
    }else {
      updateQtyDelivered(0)
      
    }

    setChecked(event.target.checked);
  };

  const updateQtyDelivered = (qtyDelivered: number) => {



    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered: qtyDelivered,

    }

    update(data)
    
  }


  return (

    <>

      {/* <Tooltip title={`Editar ${detail.product.name}`} arrow> */}

      <Box

        sx={{
          // border: `1px solid ${theme.colors.alpha.black[10]}`,
          // py: 1.5,
          // backgroundColor: `${theme.colors.alpha.black[5]}`,
          display: 'flex',
          alignItems: detail.quantity > 1 ? 'flex-start' : 'center',
          p: 1,
        }}


      >
        {/* <Box
             sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
             }}
          > */}

        {/* <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                size={25}
                value={detail.qtyDelivered * 100 / detail.quantity}
                sx={{ color: 'success.main' }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                // sx={{ color: detail.qtyDelivered === detail.quantity ? 'success.main' : 'warning.main' }}

                >{detail.quantity}</Typography>
              </Box>
            </Box> */}

        {/* 
          </Box> */}

        <ListItemIcon>
          <Chip
            label={

              <Typography
                variant='h4'
                color={detail.qtyDelivered === detail.quantity ? 'GrayText' : 'textPrimary'}


              >{detail.quantity}</Typography>
            }
            variant={detail.qtyDelivered !== detail.quantity ? 'filled' : 'outlined'}
          />

        </ListItemIcon>

        <ListItemText
          primary={`${detail.product.name}`}
          primaryTypographyProps={
            {
              variant: 'h4',
              color: detail.qtyDelivered === detail.quantity ? 'GrayText' : 'textPrimary',
              sx: {
                textDecoration: detail.qtyDelivered === detail.quantity ? 'line-through' : 'none',
              }
            }

          }

          secondary={
            <>
              <Typography

                whiteSpace='pre-wrap'
                variant='body1'
                // sx={{
                //   textDecoration: detail.qtyDelivered === detail.quantity ? 'line-through' : 'none',
                // }}
                

              >
                {detail.description}

              </Typography>
              {

                detail.quantity !== detail.qtyDelivered && detail.quantity > 1 &&

                (
                  <>
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
                  </>
                )
              }

            </>
          }

        />

        <Stack direction='row' spacing={0.5}>

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
            size='small'
          >
            <MoreVertOutlined />
          </IconButton>

        </Stack>

      </Box>

      {/* <Box component='div'
          sx={{

            p: 0.5,
            px: 0.5,
            borderRadius: `5px`,
            bgcolor: `${theme.colors.alpha.black[5]}`,

            '&:hover': {
              bgcolor: `${theme.colors.alpha.black[10]}`,
              cursor: 'pointer'

            }
            




          }}

          onClick={editDetail}

        > */}

      {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
            <Box >
              <Typography 
              variant='h4'
                color={detail.qtyDelivered === detail.quantity ? 'GrayText' : 'textPrimary'}
              >
                {`${detail.quantity} -  ${detail.product.name}`}

              </Typography>

              <Typography
                variant="h6"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {detail.description}
              </Typography>
            </Box>
          
       
          </Box>
          {

          detail.quantity > 1 && <LinearProgressWrapper
            value={(detail.qtyDelivered * 100) / detail.quantity}
            color="primary"
            variant="determinate"
          />
          } 
          */}


      {/* </Box> */}

      {/* </Tooltip> */}



    </>


  )
}
