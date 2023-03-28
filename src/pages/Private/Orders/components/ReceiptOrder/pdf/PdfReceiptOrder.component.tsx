
import { FC } from 'react';

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IOrder } from '../../../../../../models/orders.model';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 50,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

interface Props {
  order: IOrder
}


// Componente para crear el PDF del comprobante
export const PdfReceiptOrder: FC<Props> = ({ order }) => {
  return (
    <Document>
      <Page size='A5' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Comprobante de pedido</Text>
          <Text style={styles.subtitle}>Detalles del pedido</Text>
          <Text style={styles.text}>Número de pedido: {order.num}</Text>
          <Text style={styles.text}>Fecha: {`${order.createdAt}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Información del cliente</Text>
          <Text style={styles.text}>Nombre: {order.client?.person.firstName}</Text>
          <Text style={styles.text}>
            Dirección: {order.client?.address}
          </Text>
          <Text style={styles.text}>Email: {order.client?.person.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Productos</Text>
          {order.details.map((detail) => (
            <View key={detail.id}>
              <Text style={styles.text}> {detail.quantity} - {detail.product.name}</Text>
              <Text style={styles.text}>
               Precio: ${detail.product.price}
              </Text>
              <Text style={styles.text}>
                Subtotal: ${detail.amount}
              </Text>
            </View>
          ))}
        </View>
        <View>

          <Text style={styles.text}>Subtotal: ${order.amount}</Text>
          <Text style={styles.text}>Descuento: ${order.discount}</Text>
          <Text style={styles.text}>Total: ${order.total}</Text>

        </View>

      </Page>
    </Document>
  );
};

