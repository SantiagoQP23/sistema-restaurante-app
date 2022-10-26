import { FormControl, InputLabel, Input, FormHelperText, Divider, IconButton, InputBase, Paper, Grid, Button } from '@mui/material';
import { useState } from "react";
import { TextField } from '@mui/material/';


import SearchIcon from '@mui/icons-material/Search';
import ClientsTable from "./ClientsTable.component";

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';




export const ClientsList = () => {

  const [name, setName] = useState('Composed TextField');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };




  return (
    <>

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Nombre del cliente"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>


          </Paper>
        </Grid>

        <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Añadir cliente
        </Button>
        </Grid>

      </Grid>





      <ClientsTable />



    </>





  )
}

{/* <FormControl variant="standard" fullWidth>
      <TextField
        id="component-helper"
        label="Nombre del cliente"

        value={name}
        onChange={handleChange}
        aria-describedby="component-helper-text"
      />
      {/* <FormHelperText id="component-helper-text">
        Some important helper text
      </FormHelperText> 
    </FormControl> */}
