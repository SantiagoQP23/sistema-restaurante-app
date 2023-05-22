import {
  Typography, Select, MenuItem, TextField, Stack,
  Box, InputLabel, FormControl, Card, CardContent, List, ListItem,
  ListItemText, CardHeader, Button, ListItemAvatar, Avatar,
  IconButton, Divider, Grid, CardActions, TablePagination, CircularProgress, Checkbox
} from '@mui/material';
import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import { FilterDto, ResultBestSellingProducts, getBestSellingProducts } from '../../services/dashboard.service';
import { EditOutlined } from '@mui/icons-material';
import { Period } from '../../../../../models/period.model';
import { usePaginationAsync } from '../../../../../hooks/usePaginationAsync';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../redux';
import { getProducts } from '../../../../../helpers/menu.helper';
import { FormControlLabel, ListItemButton, ListItemSecondaryAction } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';



export const ProductsReports = () => {


  const {
    period, page, endDate, startDate, nextPage, prevPage, rowsPerPage,
    handleChangeStartDate,
    handleChangePeriod,
    handleChangePage,
    handleChangeRowsPerPage,
    endDateChecked,
    handleChangeEndDateChecked,

    handleChangeEndDate } = usePaginationAsync();


  const { data, refetch, isLoading, isFetching } = useQuery<ResultBestSellingProducts>(['best-selling-products', { period, startDate, endDate, offset: page, limit: rowsPerPage }], () => {
    return getBestSellingProducts({ period, startDate, endDate: endDateChecked ? endDate : null, offset: page, limit: rowsPerPage })
  })



  const handleSubmit = () => {

    refetch();
  }

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, period, endDateChecked])


  return (
    <>

      <TitlePage
        title='Productos'
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}

        my={2}

      >
        <FormControl>
          <InputLabel id="select-period-label">Periodo</InputLabel>
          <Select
            labelId="select-period-label"

            value={period}
            onChange={handleChangePeriod}
            fullWidth
            label="Periodo"
          >
            <MenuItem value='today'>Hoy</MenuItem>
            <MenuItem value='week'>Esta semana</MenuItem>
            <MenuItem value='month'>Este mes</MenuItem>
            <MenuItem value='year'>Este Año</MenuItem>
            <MenuItem value='custom'>Personalizado</MenuItem>


          </Select>
        </FormControl>

        {

          period === 'custom' && <>
            <Stack direction='column'>

              <DesktopDatePicker
                label="Fecha de inicio"
                inputFormat="yyyy-MM-dd"
                value={startDate}
                onChange={handleChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
                disableFuture
                maxDate={endDate ? endDate : undefined}

              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={endDateChecked}
                    onChange={handleChangeEndDateChecked}
                  />

                }
                label='Fecha de fin'
              />

            </Stack>
            {



              startDate && endDateChecked &&

              <DesktopDatePicker
                label="Fecha de fin"
                inputFormat="yyyy-MM-dd"
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
                disableFuture

              />
            }
          </>

        }

      </Stack>

      <Card>

        <CardHeader
          title='Productos más vendidos'
          action={
            isFetching && <CircularProgress sx={{ fontSize: '2px' }} />
          }
        />


        <List>
          {
            data && data.products?.map((product, index) => (
              <ListItemButton>

                <ListItemAvatar>
                  <Typography variant='h4'>{index + (page * rowsPerPage) + 1}</Typography>
                </ListItemAvatar>

                <ListItemText primary={product.name} />
                <ListItemSecondaryAction

                >
                  <Typography variant='h4'>{product.totalSold}</Typography>

                </ListItemSecondaryAction>


              </ListItemButton>
            ))
          }

        </List>


        <CardActions >
          <TablePagination
            page={page}
            count={100}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}

          />
        </CardActions>


      </Card>

    </>
  )
}