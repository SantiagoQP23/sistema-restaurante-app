import { Card, CardContent, FormControlLabel, Checkbox, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, IconButton, Button, TextField } from '@mui/material';
import { useInvoiceStore } from "../../../store/invoiceStore";
import { FC, useState } from "react";
import { IOrder } from "../../../../../../models";
import { CounterInput } from "../../../components";
import { CardHeader } from '@mui/material/';
import { ArrowBackIos, ArrowRight, Print } from '@mui/icons-material';
import { Label } from '../../../../../../components/ui';

interface Props {
  order: IOrder;
}


export const Account: FC<Props> = ({ order }) => {

  const { details, addDetail, updateDetail, removeDetail, resetDetails, discount, handleBackStep, handleNextStep, setDiscount, amount } = useInvoiceStore((state) => state)



  const [selectedDetails, setSelectedDetails] = useState<string[]>(details.map((detail) => detail.orderDetail.id));
  const [selectAll, setSelectAll] = useState(false);

  const handleUpdateDetail = (detailId: string, quantity: number) => {
    const orderDetail = order.details.find((detail) => detail.id === detailId)!;
    updateDetail({ orderDetail, quantity })
  }


  const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = Number(e.target.value);

    if (isNaN(value))
      setDiscount(0);
      
    if (value < 0) {
      setDiscount(0);
      return;
    }

    if (value > order!.total) {
      return;
    }


    setDiscount(value);
  }


  const handleDetailToggle = (detailId: string) => () => {
    const selectedIndex = selectedDetails.indexOf(detailId);
    let newSelectedDetails = [];

    if (selectedIndex === -1) {
      // Agregar detalle seleccionado
      newSelectedDetails = [...selectedDetails, detailId];

      const orderDetail = order.details.find((detail) => detail.id === detailId)!;

      addDetail({
        orderDetail,
        quantity: orderDetail.quantity - orderDetail.qtyPaid
      })
    } else {
      // Eliminar detalle seleccionado
      newSelectedDetails = selectedDetails.filter((id) => id !== detailId);

      removeDetail(detailId)
    }

    setSelectedDetails(newSelectedDetails);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedDetails([]);

      resetDetails();


    } else {
      const allDetails = order.details.filter(detail => detail.qtyPaid !== detail.quantity).map((detail) => detail.id);

      allDetails.forEach((detailId) => {
        const orderDetail = order.details.find((detail) => detail.id === detailId)!;

        addDetail({
          orderDetail,
          quantity: orderDetail.quantity - orderDetail.qtyPaid
        })
      })

      setSelectedDetails(allDetails);
    }

    setSelectAll(!selectAll);
  };


  const BtnNext = () => (
    <Button
      color='primary'
      onClick={handleNextStep}
      endIcon={<ArrowRight fontSize='small' />}
      size='small'
      variant='contained'

    >
      Siguiente
    </Button>
  )

  const BtnBack = () => (
    <Button
      color='inherit'
      onClick={handleBackStep}
      startIcon={<ArrowBackIos fontSize='small' />}
      size='small'

    >
      Atras
    </Button>
  )



  return (
    <>

      <Stack spacing={2}>

        <Card>


          <CardContent>

            <Typography variant='h5' >Productos por pagar</Typography>


            <div>

              <FormControlLabel
                label="Todos los productos"
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}

                  // checked={checked[0] && checked[1]}
                  // indeterminate={checked[0] !== checked[1]}
                  // onChange={handleChange1}
                  />
                }
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {
                  order.details.map((detail, index) => detail.qtyPaid !== detail.quantity && (


                    <FormControlLabel
                      label={
                        <>
                          <Typography>
                            {detail.quantity - detail.qtyPaid + ' - ' + detail.product.name}
                           
                          </Typography>
                        </>
                      }
                      control={<Checkbox
                        disabled={detail.qtyPaid === detail.quantity}
                        checked={selectedDetails.indexOf(detail.id) !== -1}
                        onChange={handleDetailToggle(detail.id)}
                      />}
                    />

                  ))
                }

              </Box>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title='Detalle de la orden'

            action={
              details.length > 0 &&
              (<IconButton color='success'>
                <Print />
              </IconButton>)
            }
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox' align='center'>
                    Cantidad
                  </TableCell>
                  <TableCell>
                    Producto
                  </TableCell>
                  <TableCell>
                    Precio
                  </TableCell>

                  <TableCell>
                    Subtotal
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {
                  details.map((detail, index) => (
                    <TableRow
                      key={index}
                    >
                      <TableCell>

                        <CounterInput
                          value={detail.quantity}
                          onChange={(value: number) => {
                            handleUpdateDetail(detail.orderDetail.id, value)
                          }}
                          max={detail.orderDetail.quantity - detail.orderDetail.qtyPaid}
                        />
                      </TableCell>
                      <TableCell>
                        {detail.orderDetail.product.name}
                      </TableCell>
                      <TableCell>
                        {detail.orderDetail.price}
                      </TableCell>
                      <TableCell>
                        {detail.orderDetail.price * detail.quantity}
                      </TableCell>
                      {/* <TableCell align='center'>
                            <IconButton
                              color='primary'
                              onClick={() => { }}
                            >
                              <DetailsOutlined />
                            </IconButton>
                          </TableCell> */}
                    </TableRow>
                  ))
                }


              </TableBody>
            </Table>

            {
              details.length === 0 ?
                <Typography variant='h6' color='textSecondary' textAlign='center' p={2}>No hay detalles</Typography>
                :


                <Grid container spacing={3} p={2} width='auto'>

                  <Grid item xs={8}>
                    <Typography variant='subtitle1' color='textSecondary' textAlign='right'>Subtotal</Typography>

                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='h6' textAlign='right'>${amount}</Typography>

                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='subtitle1' color='textSecondary' textAlign='right'>Descuento</Typography>

                  </Grid>
                  <Grid item xs={4} display='flex' justifyContent='right'>

                    <TextField

                      value={discount}
                      onChange={handleChangeDiscount}
                      size='small'

                    />


                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='h6' color='textSecondary' textAlign='right'>Total</Typography>

                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='h4' textAlign='right'>${amount - discount}</Typography>

                  </Grid>



                </Grid>
            }
          </TableContainer>
        </Card>

        <Stack
          direction='row'
          spacing={1}
          justifyContent='space-between'
        >
          <BtnBack />
          <BtnNext />

        </Stack>
      </Stack>

    </>
  )
}