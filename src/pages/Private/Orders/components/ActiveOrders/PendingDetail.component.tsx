import { FC } from 'react'

import { useSelector } from 'react-redux';

import { Card, Box, Typography, Divider, styled, LinearProgress, Container, ListItemButton, Tooltip, IconButton, useTheme } from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// import { IDetallePedido } from '../../interfaces';
// import { Text } from '../ui/';
// import { selectAuth } from '../../reducers';
import { IOrderDetail } from '../../../../../models';
import { selectAuth } from '../../../../../redux';
import { Text } from '../../../components';
import { statusModalDispatchDetail } from '../../services/orders.service';


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



export const PendingDetail: FC<Props> = ({ detail, orderId}) => {

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

          padding: '8px 3px',
          width: '100%'
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box >
            <Typography variant="h5" noWrap gutterBottom>
              <Text color="success">{detail.qtyDelivered}</Text> de {' '}
              <Text color="info">{detail.quantity}</Text> {' '}
              {`${detail.product.name}`}
            </Typography>
            <Typography variant="h6" color='blue'>
              {detail.description}
            </Typography>
          </Box>
          <Box display='flex'>
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
      </Box>




    </>


)
}
