import { FC } from "react";
import { Add, Close } from "@mui/icons-material";
import { Dialog,Stack, DialogTitle, Typography, IconButton, DialogContent, Paper, InputBase, CircularProgress, Box, ListItemText } from "@mui/material";
import { IUser } from "../../../../models";
import { useUsers } from "../hooks/useUsers";
import SearchIcon from '@mui/icons-material/Search';


interface Props {
  onChange: (user: IUser | null) => void;
  onClose: () => void;
  open: boolean;
}

export const ModalSelectUser:FC<Props> = ({
  open, onClose, onChange
}) => {

  const {usersQuery, handleChangeSearch, search} = useUsers();


  const handleChange = (user: IUser) => {

    onChange(user);
    onClose();
  }


  return (
     <Dialog
      open={open}
      onClose={onClose}

      maxWidth='md'

     sx={{
        zIndex: 10500
     }}




    >
      <DialogTitle

        display='flex'
        justifyContent='space-between'
        alignItems="center"
      >
        <Typography variant="h4"
        >
          Usuarios
        </Typography>
        <IconButton
          onClick={onClose}
        >
          <Close />
        </IconButton>


      </DialogTitle>

      <DialogContent>



        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          elevation={1}
        >

          <InputBase
            type='text'
            onChange={handleChangeSearch}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar usuario"
            inputProps={{ 'aria-label': 'Buscar cliente' }}
            value={search}
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
          // onClick={updateList}
          >
            {
              usersQuery.isLoading
                ? <CircularProgress size={20} />
                : <SearchIcon />
            }
          </IconButton>


        </Paper>





        <Stack
          sx={{ width: 325, my: 2 }}

          direction='column'
          spacing={2}

        >
          {
            usersQuery.data?.users.map((user) => (
              <Box key={user.id} display='flex' justifyContent='space-between' alignItems='center'>
                <ListItemText
                  primary={user.person.firstName + ' ' + user.person.lastName}
                  secondary={user.person.email}
                />
                <IconButton
                  size="small"

                  onClick={() => handleChange(user)}
                >
                  <Add />
                </IconButton>



              </Box>
            ))
          }




        </Stack>

      </DialogContent>



    </Dialog>



  )
}