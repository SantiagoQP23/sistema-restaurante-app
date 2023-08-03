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
import { BestSellingCategoriesResponse, FilterDto, ResultBestSellingProducts, getBestSellingCategories, getBestSellingProducts } from '../../services/dashboard.service';
import { EditOutlined, Print } from '@mui/icons-material';
import { usePaginationAsync } from '../../../../../hooks/usePaginationAsync';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../redux';
import { getProducts } from '../../../../../helpers/menu.helper';
import { FormControlLabel, ListItemButton, ListItemSecondaryAction, Chip } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { useDateFilter } from '../../../../../hooks/useDateFilter';
import { CustomGroupBy, GroupBy, Period, useFilterSoldProducts } from '../../hooks/useFilterSoldProducts';
import { format, parse, startOfMonth } from 'date-fns';
import { CategoriesBestSelling } from '../IncomesReports/components/CategoriesBestSelling.component';
import { NavLink as RouterLink } from 'react-router-dom';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { generateProductsReport } from '../../helpers/pdf-products-reports';



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

  const { sections } = useSelector(selectMenu);

  const filters = useFilterSoldProducts(Period.DAILY);


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


  } = filters;


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

  const categoriesQuery = useQuery<BestSellingCategoriesResponse>(['best-selling-categories', { period, startDate, endDate, offset: page, limit: rowsPerPage }], () => {
    return getBestSellingCategories({ period, startDate, endDate: endDateChecked ? endDate : null, offset: page, limit: rowsPerPage, groupBy, customGroupBy })
  }, {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const handlePrint = async () => {

    if (data && categoriesQuery.data) {

      const pdf = await generateProductsReport(filters, categoriesQuery.data, data);
      pdf.open();
    }


  }




  const handleSubmit = () => {

    refetch();
  }


  const counterSections = sections.length;
  const counterCategories = sections.reduce((acc, section) => section.categories.length + acc, 0);
  const counterProducts = sections.reduce((acc, section) => section.categories.reduce((acc, category) => category.products.length + acc, 0) + acc, 0);


  useEffect(() => {
    refetch();
    categoriesQuery.refetch();
  }, [page, rowsPerPage, period, endDateChecked, startDate, endDate, groupBy, customGroupBy])




  return (
    <>





      <TitlePage
        title='Productos'

        action={
          <Button
            variant='contained'
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        }


      />

      <Grid container spacing={2} my={1}>


        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title='Secciones'
              // subheader='Secciones registradas'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to="/menu"
                  size='small'
                >
                  Administrar
                </Button>
              }
            />

            <CardContent sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'

            }}>

              <Typography variant='h3'>{counterSections}</Typography>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title='Categorías'
              // subheader='Categorías registradas'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to="/menu"
                  size='small'
                >
                  Administrar
                </Button>
              }
            />

            <CardContent sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'

            }}>

              <Typography variant='h3'>{counterCategories}</Typography>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title='Productos'
              // subheader='Productos registrados'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to="/menu"
                  size='small'
                >
                  Administrar
                </Button>
              }
            />

            <CardContent sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'

            }}>

              <Typography variant='h3'>{
                counterProducts
              }</Typography>

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-period-label">Periodo</InputLabel>
            <Select
              labelId="select-period-label"

              value={period}
              onChange={handleChangePeriod}
              fullWidth

              label="Periodo"
              size='medium'
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


        <Grid item xs={12} md={2} >
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

        </Grid>

        {

          startDate && period === Period.CUSTOM &&

          <Grid item xs={12} md={2}>


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


      <Grid
        container

        spacing={2}

        my={1}

      >

        <Grid item xs={12} md={6}>

          <Card>

            <CardHeader
              title='Productos más vendidos'
            // action={
            //   <Button
            //     size='small'
            //     variant='contained'
            //     startIcon={<Print />}
            //   >
            //     Imprimir
            //   </Button>
            // }

            />

            <List>
              {
                data && data.products?.map((product, index) => (
                  <ListItem>
                    <ListItemText
                      primary={product.productName}
                      primaryTypographyProps={{ variant: 'h5' }}
                      secondary={
                        <Chip
                          sx={{ mt: 0.5 }}
                          label={product.categoryName}
                          size='small'
                        />
                      }
                    />
                    <ListItemSecondaryAction

                    >
                      <Typography variant='h6'>{product.totalSold}</Typography>
                      <Typography variant='h5' color='success'>{formatMoney(product.productPrice * product.totalSold)}</Typography>

                    </ListItemSecondaryAction>


                  </ListItem>
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



        </Grid>


        <Grid item xs={12} md={6}>

          <CategoriesBestSelling categoriesQuery={categoriesQuery} />

        </Grid>

      </Grid>


    </>
  )
}