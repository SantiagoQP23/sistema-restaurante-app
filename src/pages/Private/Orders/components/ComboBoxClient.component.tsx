import { useContext, FC, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useClients } from "../../Clients/hooks/useClients";
import { OrderContext } from '../context/Order.context';
import { IClient } from '../../../../models';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../redux';
import { useUpdateOrder } from '../hooks/useUpdateOrder';


interface Props {
  client: IClient | null;
  handleChangeClient: (client: IClient | null) => void;
}

export const ComboBoxClient: FC<Props> = ({client, handleChangeClient}) => {


  const { clientsQuery, term, setTerm } = useClients();

  const { activeOrder } = useSelector(selectOrders);

  useEffect(() => {

    clientsQuery.refetch();


  }, [term])



 



  return (
    <>
      <Autocomplete
        id="combo-box-client"


        filterOptions={(x) => x}
        options={clientsQuery.data?.clients || []}
        getOptionLabel={(option) => option.person.firstName + ' ' + option.person.lastName}
        value={client}

        renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}

        onChange={(event, newValue: IClient | null) => {
          handleChangeClient(newValue);
          // setClients(newValue ? [newValue, ...clients] : clients)

        }}

        onInputChange={(event, newInputValue) => {
          setTerm(newInputValue);
        }}
        fullWidth

      />
    </>
  )
}