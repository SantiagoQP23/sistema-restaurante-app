import React, {FC, Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import { IOrderDetail } from '../../../../../../models/orders.model';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

interface Props{
  details: IOrderDetail[]
}


export const InvoiceTableRow:FC<Props> = ({details}) => {
    const rows = details.map( detail => 
        <View style={styles.row} key={detail.id}>
            <Text style={styles.description}>{detail.product.name}</Text>
            <Text style={styles.qty}>{detail.quantity}</Text>
            <Text style={styles.rate}>{detail.product.price}</Text>
            <Text style={styles.amount}>{Number(detail.amount).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
