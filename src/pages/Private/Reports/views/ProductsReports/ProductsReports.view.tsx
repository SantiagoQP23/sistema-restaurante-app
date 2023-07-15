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
import { usePaginationAsync } from '../../../../../hooks/usePaginationAsync';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../redux';
import { getProducts } from '../../../../../helpers/menu.helper';
import { FormControlLabel, ListItemButton, ListItemSecondaryAction } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { useDateFilter } from '../../../../../hooks/useDateFilter';
import { CustomGroupBy, GroupBy, Period, useFilterSoldProducts } from '../../hooks/useFilterSoldProducts';
import { format, parse, startOfMonth } from 'date-fns';



export const ProductsReports = () => {


  // const {
  //   period,
  //   startDate,
  //   endDate,
  //   endDateChecked,
  //   handleChangeEndDate,
  //   handleChangeEndDateChecked,
  //   handleChangePeriod,
  //   handleChangeStartDate,


  // } = useDateFilter(Period.TODAY);

  const {
    period,
    startDate,
    endDate,
    endDateChecked,
    handleChangeEndDate,
    handleChangeEndDateChecked,
    handleChangePeriod,
    handleChangeStartDate,
    groupBy,
    handleChangeGroupBy,
    customGroupBy,
    handleChangeCustomGroupBy,


  } = useFilterSoldProducts(Period.DAILY);

  const {
    page, nextPage, prevPage, rowsPerPage,

    handleChangePage,
    handleChangeRowsPerPage,


  } = usePaginationAsync();

  const { data, refetch, isLoading, isFetching } = useQuery<ResultBestSellingProducts>(['best-selling-products', { period, startDate, endDate, offset: page, limit: rowsPerPage }], () => {
    return getBestSellingProducts({ period, startDate, endDate: endDateChecked ? endDate : null, offset: page, limit: rowsPerPage, groupBy, customGroupBy })
  }, {
    onSuccess: (data) => {
      console.log(data)
    }
  })



  const handleSubmit = () => {

    refetch();
  }


  const getDate = (date: string): string => {

    let dateParsed;
    if (groupBy === GroupBy.MONTH) {

      // const dateSplited = date.split('/');
      // const month = dateSplited[0];
      // const year = dateSplited[1];
      const dates = startOfMonth(parse(date, 'MM/yyyy', new Date()));

      console.log(dates)

      dateParsed = format(new Date(dates), 'MMMM yyyy')

      // dateParsed = new Date(`${month}/01/${year}`)

      // console.log(`${month}/01/${year}`)
      // console.log(format(dateParsed, 'MMMM yyyy'))
    }


    return date;


  }

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, period, endDateChecked, startDate, endDate, groupBy, customGroupBy])


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

        {/* {

          period === 'custom' && <>
            <Stack direction='column'>



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

        } */}

      </Stack>

      <Card>

        <CardHeader
          title='Productos más vendidos'
          action={
            // isFetching && <CircularProgress sx={{ fontSize: '2px' }} />
            <FormControl fullWidth>
              <InputLabel id="select-period-label">Mostrar por</InputLabel>
              <Select
                labelId="select-period-label"

                value={customGroupBy}
                onChange={(e) => handleChangeCustomGroupBy(e.target.value as any)}
                fullWidth

                label="Periodo"
              >
                <MenuItem value={CustomGroupBy.FECHA}>Fecha</MenuItem>
                <MenuItem value={CustomGroupBy.PRODUCT}>Producto</MenuItem>



              </Select>
            </FormControl>
          }

          
        />

        <Box
          p={2}
        >

          <Grid container spacing={2}>


            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="select-period-label">Periodo</InputLabel>
                <Select
                  labelId="select-period-label"

                  value={period}
                  onChange={handleChangePeriod}
                  fullWidth

                  label="Periodo"
                >
                  <MenuItem value={Period.DAILY}>Diario</MenuItem>
                  <MenuItem value={Period.MONTHLY}>Mensual</MenuItem>
                  <MenuItem value={Period.YEARLY}>Anual</MenuItem>
                  {
                    GroupBy.DAY !== groupBy && (
                      <>
                      </>
                    )
                  }

                  {
                    GroupBy.DAY === groupBy &&
                    <MenuItem value={Period.CUSTOM}>Personalizado</MenuItem>
                  }



                </Select>
              </FormControl>

            </Grid>


            {
              customGroupBy !== CustomGroupBy.PRODUCT && Period.DAILY !== period &&
              (<Grid item xs={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="select-period-label">Agrupar por</InputLabel>
                  <Select
                    labelId="select-period-label"

                    value={groupBy}
                    onChange={(e) => handleChangeGroupBy(e.target.value as any)}
                    fullWidth

                    label="Periodo"
                  >
                    <MenuItem value={GroupBy.DAY}>Día</MenuItem>
                    <MenuItem value={GroupBy.MONTH}>Mes</MenuItem>
                    <MenuItem value={GroupBy.YEAR}>Año</MenuItem>


                  </Select>
                </FormControl>

              </Grid>)
            }





            {/* <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="select-period-label">Agrupar por</InputLabel>
                <Select
                  labelId="select-period-label"

                  value={customGroupBy}
                  onChange={(e) => handleChangeCustomGroupBy(e.target.value as any)}
                  fullWidth

                  label="Periodo"
                >
                  <MenuItem value={''}>Fecha</MenuItem>
                  <MenuItem value={CustomGroupBy.PRODUCT}>Producto</MenuItem>



                </Select>
              </FormControl>

            </Grid> */}

            <Grid item xs={12} md={3}>
              <DesktopDatePicker
                label="Fecha de inicio"
                inputFormat={
                  period === Period.MONTHLY ? 'yyyy MMMM' :
                    period === Period.YEARLY ? 'yyyy' : 'yyyy-MM-dd'
                }
                value={startDate}
                onChange={handleChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
                disableFuture
                maxDate={endDate ? endDate : undefined}
                views={
                  period === Period.MONTHLY ? ['year', 'month'] :
                    period === Period.YEARLY ? ['year'] : ['day']

                }

              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={endDateChecked}
                    onChange={handleChangeEndDateChecked}
                  />

                }
                label='Fecha de fin'
              /> */}
            </Grid>

            {

              startDate && period === Period.CUSTOM &&

              <Grid item xs={12} md={3}>


                <DesktopDatePicker
                  label="Fecha de fin"
                  inputFormat="yyyy-MM-dd"
                  value={endDate}
                  onChange={handleChangeEndDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={startDate}
                  disableFuture

                />
              </Grid>
            }

          </Grid>

        </Box>


        <List>
          {
            data && data.products?.map((product, index) => (
              <ListItemButton>

                <ListItemAvatar>
                  <Typography variant='h4'>{index + (page * rowsPerPage) + 1}</Typography>
                </ListItemAvatar>

                <ListItemText primary={
                  product.name || product.date

                }

                />
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