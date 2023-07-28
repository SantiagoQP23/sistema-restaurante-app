import { FC } from 'react';

import { Receipt } from "@mui/icons-material"
import { Card, CardContent, Stack, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, ListItemSecondaryAction } from "@mui/material"
import { format } from "date-fns"
import { Invoice } from "../../../models/Invoice.model";
import { useDrawerInvoiceStore } from '../../../store/drawerInvoiceStore';
import { CardHeader, CardActions } from '@mui/material/';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';


interface Props {
  invoices: Invoice[];
}

export const InvoicesList: FC<Props> = ({ invoices }) => {

  const { setActiveInvoice, setOpen } = useDrawerInvoiceStore(state => state);

  const handleOpenDrawer = (invoice: Invoice) => {
    setActiveInvoice(invoice);
    setOpen(true);
  }


  return (
    <>

      <Card>

        <CardHeader
          title={'Pagos'}
        />
        <CardContent>
          <Stack>
            {
              invoices.map(invoice => (

                <>
                  <ListItemButton
                    onClick={() => handleOpenDrawer(invoice)}
                  >

                    <ListItemAvatar>
                      <Avatar

                      >
                        <Receipt color={invoice.isActive ? 'inherit' : 'error'} />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography variant='h5' fontWeight='bold'>Factura N° {invoice.transactionNumber}</Typography>

                      }
                      secondary={
                        <>
                          <Typography >{invoice.client.person.lastName} {invoice.client.person.firstName}</Typography>
                          <Typography fontSize={11}>
                            {format(new Date(invoice.createdAt), 'dd/MM/yyy HH:mm')}

                          </Typography>
                        </>
                      }
                    />

                    <ListItemSecondaryAction>
                      <Typography variant='h5'>
                        {formatMoney(invoice.amount)}
                      </Typography>
                    </ListItemSecondaryAction>

                  </ListItemButton>

                </>
              ))
            }

          </Stack>

        </CardContent>

        <CardActions
          sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}
        >
          <Typography>
            Total
          </Typography>

          <Typography variant='h5'>
            {
              formatMoney(invoices.reduce((acc, d) => acc + d.total, 0) || 0)
            }
          </Typography>

        </CardActions>
      </Card>
    </>
  )
}