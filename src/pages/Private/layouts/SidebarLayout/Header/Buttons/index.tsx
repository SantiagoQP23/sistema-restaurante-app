import { Box, IconButton } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications";
import { ButtonTheme } from "../../components/";
import { PointOfSale, WifiTetheringErrorOutlined } from "@mui/icons-material";
import { useCashRegisterStore } from "../../../../Common/store/cashRegisterStore";
import { useNavigate } from "react-router-dom";
import { CashRegisterPopover } from "./CashRegister/CashRegisterPopover.component";
import { useContext } from "react";
import { SocketContext } from "../../../../../../context";
import { SocketConnectionButton } from "./SocketConnectionButton/SocketConnectionButton.component";

function HeaderButtons() {
  const { activeCashRegister } = useCashRegisterStore();

  const { online, conectarSocket } = useContext(SocketContext);

  const navigate = useNavigate();

  return (
    <Box sx={{}}>
      {/* <HeaderSearch /> */}
      <Box sx={{ display: "flex", gap: 1 }} component="span">
        <ButtonTheme />
        
        <SocketConnectionButton />

        <HeaderNotifications />

        <CashRegisterPopover />

      </Box>
    </Box>
  );
}

export default HeaderButtons;
