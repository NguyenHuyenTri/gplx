import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Delete, Edit } from '@material-ui/icons';
import  ModalDelete  from './ModalDelete';


import { Link, useLocation } from 'react-router-dom';

const columns = [
  {
    id: 'TenMonHocHangDaoTao',
    label: 'Tên môn học',
    minWidth: 100,
  },
  {
    id: 'TongSoGio',
    label: 'Tổng số giờ',
    minWidth: 100,

    
  },
  {
    id: 'LyThuyet',
    label: 'Lý thuyết',
    minWidth: 100,
    
  },
  {
    id: 'ThucHanhHinh',
    label: 'Thực hành hình',
    minWidth: 100,
  },
  {
    id: 'ThucHanhDuong',
    label: 'Thực hành đường',
    minWidth: 100,
  },
  {
    id: 'KiemTra',
    label: 'Kiểm tra',
    minWidth: 100,
    
  },
  {
    id: 'GhiChu',
    label: 'Ghi chú',
    minWidth: 100,
  },
  {
    id: 'TrangThai',
    label: 'Trạng thái',
    minWidth: 100,
  },
];

function createData(TenMonHocHangDaoTao, TongSoGio, LyThuyet, ThucHanhHinh, ThucHanhDuong, KiemTra, GhiChu, TrangThai) {
  return {TenMonHocHangDaoTao, TongSoGio, LyThuyet, ThucHanhHinh, ThucHanhDuong, KiemTra, GhiChu, TrangThai};
}
const rows = [
  createData('B1', 123549, '27', '3','120KM','Chính chủ','120KM','true'),
  createData('B1-B2', 195636, '30', '5','300KM','Chính chủ','120KM','true'),
  createData('B11', 19633, '40', '5','500KM','Chính chủ','120KM','true'),
  createData('B12', 34678, '20', '8','800KM','Chính chủ','120KM','true'),
  createData('B13', 876543, '18', '1','900KM','Chính chủ','120KM','true'),
  createData('B14', 45236, '18', '6','10KM','Chính chủ','120KM','true'),
  createData('B15', 897653, '20', '10','50KM','Chính chủ','120KM','true'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button:{
    marginRight:3,
  },
});

export default function StickyHeadTable(props) {
  const { showInfo, setInfo } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell >
                  Thao Tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={row.code}
                 
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}  onClick={() => {
                        showInfo();
                        setInfo(row);
                      }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell >
                  <ButtonGroup size="small" aria-label="small outlined button group"> 
                  <Link to={'/qt_he_thong/sua_mon_hoc_hang_dao_tao'} className={classes.link}>
                    <Button variant='contained' color='primary' className={classes.button}>
                        <Edit/>               
                    </Button>
                  </Link>
                    <Button variant='contained' color='primary' onClick={() => setOpenDelete(!openDelete)}>
                      <Delete />
                    </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
       <ModalDelete open={openDelete} setOpenDelete={setOpenDelete}/>
    </Paper>
  );
}
