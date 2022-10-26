import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'cedula',
    headerName: 'Cedula',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', cedula: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', cedula: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', cedula: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', cedula: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', cedula: null },
  { id: 6, lastName: 'Melisandre', firstName: null, cedula: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', cedula: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', cedula: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function ClientsTable() {






  
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}