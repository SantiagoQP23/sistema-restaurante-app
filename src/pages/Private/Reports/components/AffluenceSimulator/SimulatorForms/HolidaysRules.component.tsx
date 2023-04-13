import { useState, FC, useContext } from 'react';

import { CardHeader, CardContent, Card, Grid, TextField, List, Box, ListItem, IconButton, Button, alpha, ListItemButton, styled, lighten, CardActionArea, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { getHolidays, statusModalDeleteHoliday, statusModalHoliday } from '../services/holidays.service';
import { useAsync } from '../../../../../../hooks/useAsync';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { Add, AddTwoTone, DeleteOutline, Edit, EditOutlined } from '@mui/icons-material';
import { SimulationContext } from '../../../context/SimulationContext';
import { Holiday } from '../models/holiday.model';
import { useQuery } from '@tanstack/react-query';
import { useTypesHolidays } from '../../../hooks/useTypesHolidays';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatDateToPicker } from '../../../../helpers/format-date.helper';


interface HolidayProps {
  holiday: Holiday
}


const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);


const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(2)};
        height: ${theme.spacing(2)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 80%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 80%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const HolidayItem: FC<HolidayProps> = ({ holiday }) => {

  const editHoliday = () => {
    statusModalHoliday.setSubject(true, holiday);

  }

  const deleteHoliday = () => {
    statusModalDeleteHoliday.setSubject(true, holiday);
  }

  return (
    <>
      <ListItem
        secondaryAction={<>
          <IconButton onClick={editHoliday}>
            <EditOutlined />
          </IconButton>
          <IconButtonError onClick={deleteHoliday}>
            <DeleteOutline/>
          </IconButtonError>
        </>
        }
        // Cambia de color cuando pasa el mouse
        sx={{
          borderRadius: 0.5,
          '&:hover, &.Mui-focusVisible':
          {
            bgcolor: (theme) => alpha(theme.palette.action.active,
              theme.palette.action.hoverOpacity),
          },
        }}
      >
        <ListItemText
          secondary={holiday.typeHoliday.name}
          primary={
            <Typography
              variant='h5'
            >
              {
                format(formatDateToPicker(holiday.date), 'EEEE dd/MM/yyyy', {
                  locale: es,
                })
              }   </Typography>
          }
        />

      </ListItem>

    </>
  )


}



export const HolidaysRules = () => {


  const { isLoading, data, isFetching, } = useQuery(['holidays'], () => getHolidays())

  const { holidays, loadHolidays } = useContext(SimulationContext);




  const openModal = () => {
    statusModalHoliday.setSubject(true, undefined);
  }

  const getTypesHolidays = useTypesHolidays();


  return (
    <>
      <Card>
        <CardHeader
          title='Feriados'
          subheader='Feriados que se aplicarán en la simulación'
        // action={

        //   <Button
        //     variant='outlined'
        //     onClick={openModal}
        //     size='small'
        //   >
        //     <Add/>
        //   </Button>
        // }
        />




        <List>
          {data?.length === 0 && <p>No hay feriados</p>
          }
          {
            data?.map((holiday, index) => {
              return (
                <HolidayItem holiday={holiday} key={holiday.id} />

              )
            })}




          <CardAddAction
            onClick={openModal}

          >
            <CardActionArea sx={{ px: 1 }}>
              <CardContent>
                <AvatarAddWrapper>
                  <AddTwoTone fontSize="medium" />
                </AvatarAddWrapper>
              </CardContent>
            </CardActionArea>
          </CardAddAction>

          {/* <Controller
                  name='name'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) =>
                    <>
                      <InputLabel id='select-seccion'>Nombre del feriado</InputLabel>
                      <Select
                        labelId="select-seccion"

                        label="Seccion"
                        fullWidth
                        margin='dense'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.name}

                      >
                        {
                          Object.values(ValidHolidays).map((holiday) => (
                            <MenuItem key={holiday} value={holiday}>{holiday}</MenuItem>
                          ))
                        }




                      </Select>
                    </>
                  }

                /> */}



        </List>








      </Card>

    </>
  )
}