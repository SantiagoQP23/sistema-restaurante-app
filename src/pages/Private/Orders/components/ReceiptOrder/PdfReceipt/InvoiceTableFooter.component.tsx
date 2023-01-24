import React, { FC } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { IOrder } from '../../../../../../models/orders.model';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold',
  },
  description: {
    width: '85%',
    textAlign: 'right',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

interface Props {
  order: IOrder;
}

export const InvoiceTableFooter: FC<Props> = ({ order }) => {

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>SUBTOTAL</Text>
        <Text style={styles.total}>{Number.parseFloat(String(order.amount)).toFixed(2)}</Text>
      </View>
      {
        order.isPaid && (
          <>

            <View style={styles.row}>
              <Text style={styles.description}>DESCUENTO</Text>
              <Text style={styles.total}>{Number.parseFloat(String(order.discount)).toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.description}>TOTAL</Text>
              <Text style={styles.total}>{Number.parseFloat(String(order.total)).toFixed(2)}</Text>
            </View>
          </>
        )

      }
    </>
  )
};

