
import { Table } from '@david.kucsai/react-pdf-table';
import { DataTableCell } from '@david.kucsai/react-pdf-table/lib/DataTableCell';
import { TableHeader } from '@david.kucsai/react-pdf-table/lib/TableHeader';
import { TableCell } from '@david.kucsai/react-pdf-table/lib/TableCell';
import { TableBody } from '@david.kucsai/react-pdf-table/lib/TableBody';



import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';
import { IOrder } from '../../../../../../models/orders.model';
import { format } from 'date-fns';
import { InvoiceItemsTable } from './InvoiceItemsTable.component';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },

  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  reportTitle: {
    color: '#61dafb',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',

  },
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end'
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60
  },

  headerContainer: {
    marginTop: 36
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique'
  },


});

interface Props {
  order: IOrder;
}


export const ReceiptPdf: FC<Props> = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Pedido</Text>
        </View>

        <View style={styles.invoiceNoContainer}>
          <Text style={styles.label}>Pedido N°</Text>
          <Text >{order.num}</Text>

        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Fecha</Text>
          <Text >{format(new Date(order.createdAt), 'dd/MM/yyyy')}</Text>

        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>Datos del cliente</Text>
          {
            order.client &&
            <>
              <Text >{order.client.person.firstName} {order.client.person.lastName} </Text>
              <Text>{order.client.person.identification.type}: {order.client.person.identification.num}</Text>
              <Text>Email: {order.client.person.email}</Text>
              <Text>Teléfono: {order.client.person.numPhone}</Text>
              <Text>Dirección: {order.client.address}</Text>
            </>
          }
        </View>

        <InvoiceItemsTable order={order}/>

       



      </Page>

    </Document >

  )
}