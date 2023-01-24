

import React, { FC } from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceTableBlankSpace, InvoiceTableFooter, InvoiceTableHeader, InvoiceTableRow } from './';
import { IOrder } from '../../../../../../models/orders.model';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

interface Props {
  order: IOrder;
}

  export const InvoiceItemsTable:FC<Props> = ({order}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow details={order.details} />
        <InvoiceTableBlankSpace rowsCount={ tableRowsCount - order.details.length} />
        <InvoiceTableFooter order={order}  />
    </View>
  );
  
