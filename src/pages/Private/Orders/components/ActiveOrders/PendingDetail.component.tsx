import { FC } from 'react'

import { useSelector } from 'react-redux';

import { Box, Typography, styled, LinearProgress, Tooltip, IconButton, useTheme } from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


import { IOrderDetail } from '../../../../../models';
import { selectAuth } from '../../../../../redux';
import { Text } from '../../../components';
import { statusModalDispatchDetail } from '../../services/orders.service';
import { Label } from '../../../../../components/ui';


const LinearProgressWrapper = styled(LinearProgress)(
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

interface Props {
  detail: IOrderDetail;
  orderId: string
}



export const PendingDetail: FC<Props> = ({ detail, orderId }) => {

  const { user } = useSelector(selectAuth);

  const theme = useTheme();

  const despacharDetalle = () => {

    console.log('Despachar detalle')
    statusModalDispatchDetail.setSubject(true, detail, orderId);
  }

  return (

    <>


      <Box mb={1} component='div'
        sx={{

          px: 1,
          width: '100%',

        }}
      >
        {
          detail.qtyDelivered === detail.quantity
            ? <>
              <Box display="flex" alignItems="center" justifyContent="space-between">
               
                  <Typography variant='h4' color='gray'>
                    {`${detail.quantity}`} - {`${detail.product.name}`}

                  </Typography>
                  <Tooltip title="Editar detalle" arrow>
                    <IconButton
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                      onClick={() => despacharDetalle()}
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

               
              </Box>
            </>
            :
            <>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box >
                  <Typography variant='h4'>
                    {`${detail.quantity} -  ${detail.product.name}`}

                  </Typography>
                  <Typography variant="h6" >
                    {detail.description}
                  </Typography>
                </Box>
                <Box display='flex'>
                  <Box>
                    {/* <Typography variant="h5" >
                      Entregado {detail.qtyDelivered} de {' '}
                      <Text color="info">{detail.quantity}</Text> {' '}
                    </Typography> */}
                    <Label color='success' >{detail.qtyDelivered}</Label>

                  </Box>
                  {

                    user?.role.name === 'admin' && (
                      <Tooltip title="Editar detalle" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => despacharDetalle()}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                </Box>
              </Box>
              <LinearProgressWrapper
                value={(detail.qtyDelivered * 100) / detail.quantity}
                color="primary"
                variant="determinate"
              />
            </>

        }
      </Box>




    </>


  )
}
