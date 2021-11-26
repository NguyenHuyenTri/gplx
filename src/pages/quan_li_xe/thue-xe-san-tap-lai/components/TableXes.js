import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'bienSoXe', headerName: 'Biển số xe', flex: 0.5 },
  { field: 'giaThueXe', headerName: 'Giá thuê xe', flex: 0.5 },
];

export default function DataTable(props) {
  const { listXes, onClick } = props;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={listXes} columns={columns} pageSize={5} onCellClick={onClick} />
    </div>
  );
}
