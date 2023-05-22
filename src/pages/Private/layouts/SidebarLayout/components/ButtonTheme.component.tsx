import { useContext } from "react";

import { LightMode, DarkMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ThemeContext } from '../../../../../theme/ThemeProvider';


export const ButtonTheme = () => {

  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';

  const setNameTheme = useContext(ThemeContext);


  return (
    <>

    <IconButton
      onClick={ () => {
        setNameTheme(curThemeName === 'PureLightTheme' ? 'NebulaFighterTheme' : 'PureLightTheme')
      }}
      size='small'
      color="primary"
      

     
    >
      {
        curThemeName === 'PureLightTheme' ? <DarkMode  /> : <LightMode />
      }

    </IconButton>

     

    </>
  )
}