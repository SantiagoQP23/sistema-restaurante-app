import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import { ButtonTheme } from '../../components/';

function HeaderButtons() {
  return (
    <Box sx={{  }}>
      {/* <HeaderSearch /> */}
      <Box sx={{ }} component="span">
        {/* <HeaderNotifications /> */}
        <ButtonTheme />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
