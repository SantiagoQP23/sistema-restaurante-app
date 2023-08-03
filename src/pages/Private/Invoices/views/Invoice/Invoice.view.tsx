import { Delete, Print, Remove, Share } from "@mui/icons-material"
import { Box, Button, Stack, Typography, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from "react-router-dom";
import { useInvoice } from "../../../Orders/hooks/useInvoices";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import html2canvas from "html2canvas";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';

import { PdfMakeWrapper, Txt, Table as TablePdf, Img, } from "pdfmake-wrapper";

import { Chart } from 'react-chartjs-2';

import logo from '../../../../../assets/logo3.png';



import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { PaymentMethod } from "../../../Orders/models/Invoice.model";
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { generateInvoicePdf } from "../../helpers/generateInvoicePdf.helper";

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 1,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      }
    );
  }

  chart.update();
}

export const Invoice = () => {

  const { invoiceId } = useParams();

  if (!invoiceId) return <div>Not found</div>

  const { invoiceQuery } = useInvoice(invoiceId);

  const chartRef = useRef<ChartJS>(null);

  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [12, 19, 8, 15, 10, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  const { data, isLoading } = invoiceQuery;



  const generatePDF = async () => {

    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();

    // Definir el contenido del documento
    pdf.add('¡Hola, este es mi documento PDF generado con pdfmake-wrapper!');

    // Total de la factura


    if (chartRef.current) {

      const canvas = await html2canvas(chartRef.current.canvas);


      const chartWidth = 400; // Ajusta el ancho del gráfico en el PDF
      const chartHeight = 300; // Ajusta la altura del gráfico en el PDF

      const imgData = canvas.toDataURL('image/png');

      console.log("Añadiendo imagen")

      pdf.add(
        new Txt('Gráfica de ventas')

          .bold()
          .fontSize(14)
          .margin([0, 20, 0, 0])
          .end
      );

      pdf.add(await new Img(imgData).width(chartWidth).height(chartHeight).build());




    }



    pdf.create().open();



    // Generar el archivo PDF
    // const pdfBlob = await pdf.create().toBlob();

    // // Descargar el archivo PDF
    // const downloadLink = document.createElement('a');
    // downloadLink.href = URL.createObjectURL(pdfBlob);
    // downloadLink.download = 'documento.pdf';
    // downloadLink.click();
  };


  const handlePrint = async () => {


    if(data){

      const pdf = await generateInvoicePdf(data);
      pdf.open();
    }

  }

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>Not found</div>



  return (
    <>
      <Stack spacing={1}
        my={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'normal', sm: 'space-between' }}
        alignItems={{ sm: 'center' }}  >

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Box>

            <Typography variant='h3'>Comprobante N° {data.transactionNumber}</Typography>


          </Box>

        </Stack>


        <Stack direction='row' justifyContent='flex-end' spacing={1}>
          <Button
            color="error"
          >
            <Delete />
          </Button>
          <Button>
            <Share />
          </Button>

          <Button
            variant='contained'
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </Stack>
      </Stack>

      {/* <Chart ref={chartRef} type='bar' data={chartData} options={chartOptions} /> */}

      {/* <div>
        <Bar data={chartData} options={chartOptions} />

      </div> */}

      <Card>




        <CardHeader
          title={
            <Typography variant='h4' > Restaurante Doña Yoli </Typography>
          }
          action={


            <Box>
              <Typography variant='h4' >Pedido N° {data.transactionNumber}</Typography>

            </Box>

          }


        />

        <CardContent>


          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
          // Establecer el tamaño de los elementos

          >

            <Box
              flexBasis='50%'
            >
              <Typography variant='h5' mb={1}>Cliente</Typography>
              <Typography variant='body1'>{data.client?.address}</Typography>
              <Typography variant='body1'>{data.client?.person.email}</Typography>
              <Typography variant='body1'>{data.client?.person.numPhone}</Typography>
              <Typography variant='body1'>{data.client?.person.firstName} {data.client?.person.lastName}</Typography>
            </Box>
            <Box
              flexBasis='50%'
            >
              <Typography variant='h5' mb={1}>Mesero</Typography>
              <Typography variant='body1'>{data.user.person.firstName} {data.user.person.lastName}</Typography>
              <Typography variant='body1'>{data.user.person.email}</Typography>
              <Typography variant='body1'>{data.user.person.numPhone}</Typography>

            </Box>



          </Stack>


          <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>


            <Box>
              <Typography variant='h5' mb={1}>Fecha</Typography>
              <Typography variant='body1'>{format(new Date(data?.createdAt), 'dd MMMM yyyy HH:mm', { locale: es })}</Typography>
            </Box>

          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Subtotal</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {
                  data.details.map((detail, index) => {
                    return (
                      <>
                        <TableRow key={detail.id} sx={{
                          whiteSpace: 'nowrap'
                        }}>
                          <TableCell align="center">{detail.quantity}</TableCell>
                          <TableCell sx={{
                            fontWeight: 'bold'
                          }}>{detail.product.name}</TableCell>
                          <TableCell align="right">${detail.product.price}</TableCell>
                          <TableCell align="right">${detail.amount}</TableCell>

                        </TableRow>

                      </>
                    )
                  })

                }

                {/* <TableRow>

                    <TableCell
                      align="right"
                      colSpan={3}
                      sx={{
                        border: 'none'
                      }}
                    >


                      <Typography variant='h5'>Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right"
                      sx={{
                        border: 'none'
                      }}
                    >${activeOrder.amount}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      align="right"
                      colSpan={3}
                      sx={{
                        border: 'none'
                      }}
                    >

                      <Typography variant='h5'>Descuento</Typography>
                    </TableCell>
                    <TableCell align="right"
                      sx={{
                        border: 'none'
                      }}
                    >${activeOrder.discount}</TableCell>

                  </TableRow> */}

                <TableRow>

                  <TableCell

                    align="right"
                    colSpan={3}
                    sx={{
                      border: 'none'
                    }}
                  >
                    <Typography variant='h4'>Total</Typography>
                  </TableCell>
                  <TableCell align="right"
                    sx={{
                      border: 'none'
                    }}
                  >${data.total}</TableCell>

                </TableRow>



              </TableBody>




            </Table>


          </TableContainer>




        </CardContent>



      </Card >

    </>
  )
}