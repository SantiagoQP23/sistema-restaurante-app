import { Box, IconButton } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import { ButtonTheme } from '../../components/';
import { PointOfSale } from '@mui/icons-material';
import { useCashRegisterStore } from '../../../../Common/store/cashRegisterStore';
import { useNavigate } from 'react-router-dom';

function HeaderButtons() {

  const { activeCashRegister } = useCashRegisterStore();

  const navigate = useNavigate();

  return (
    <Box sx={{}}>
      {/* <HeaderSearch /> */}
      <Box sx={{display: 'flex', gap: 1}} component="span">
        {/* <HeaderNotifications /> */}

        <IconButton
          
          sx={{
            display: {
              xs: 'flex',
              md: 'none',

            }
          }}

          onClick={() => {
            navigate('/balance');
          }}

        >
          <PointOfSale
            color={activeCashRegister ? 'success' : 'error'}

          />

        </IconButton>

        <ButtonTheme />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
