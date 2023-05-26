import { FC } from 'react'

import { useSelector } from 'react-redux';

import { Box, Typography, styled, LinearProgress, Tooltip, IconButton, useTheme, ListItemButton, ListItemText, ListItemAvatar } from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


import { IOrderDetail } from '../../../../../../models';
import { selectAuth } from '../../../../../../redux';
import { Text } from '../../../../components';
import { statusModalDispatchDetail, statusModalEditOrderDetail } from '../../../services/orders.service';
import { Label } from '../../../../../../components/ui';


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

  const editDetail = () => {
    statusModalEditOrderDetail.setSubject(true, detail, orderId);
  }

  return (

    <>

      <Tooltip title={`Editar ${detail.product.name}`} arrow>

        <ListItemButton
          onClick={editDetail}
          sx={{
            border: `1px solid ${theme.colors.alpha.black[10]}`,
            py: 1.5,
          }}


        >
          <ListItemAvatar>
            <Typography
              variant='h5'
              color={detail.qtyDelivered === detail.quantity ? 'GrayText' : 'textPrimary'}

            >{detail.quantity}</Typography>
          </ListItemAvatar>

          <ListItemText
            primary={detail.product.name}
            primaryTypographyProps={
              {
                variant: 'h5',
                color: detail.qtyDelivered === detail.quantity ? 'GrayText' : 'textPrimary'
              }

            }

            secondary={
              <>
                <Typography

                  whiteSpace='pre-wrap'
                  variant='body1'

                >
                  {detail.description}

                </Typography>
                {

                  detail.quantity !== detail.qtyDelivered && <LinearProgressWrapper
                    value={(detail.qtyDelivered * 100) / detail.quantity}
                    color="primary"
                    variant="determinate"
                  />
                }

              </>
            }

          />


        </ListItemButton>

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

      </Tooltip>



    </>


  )
}
