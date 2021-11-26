import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit } from '@material-ui/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ModalDelete from './ModalDelete';
import { useDispatch, useSelector } from 'react-redux';
import { getHSSHRequest } from '../../../../reducers/sat-hach/HSSH/HSSHAction';
import { get as _get } from 'lodash';

const columns = [
  { id: 'sst', label: 'STT', minWidth: 100 },
  {
    id: 'kySatHach',
    label: 'Kỳ Sát Hạch',
    minWidth: 100,
  },
  {
    id: 'ngaySatHach',
    label: 'Ngày Sát Hạch',
    minWidth: 100,
    format: (value) => moment(new Date(value)).format('DD/MM/YYYY'),
  },
  {
    id: 'hangGPLX',
    label: 'Hạng GPLX',
    minWidth: 100,
  },
];



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    marginRight: 3,
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
  const dispatch = useDispatch();

  const rows = useSelector((state) => _get(state, 'toast.satHachs', []));
  useEffect(() => {
    dispatch(getHSSHRequest());
  }, []);
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
              <TableCell>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
              return (
                      <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.kySatHach}</TableCell>
                          <TableCell>{row.ngaySatHach}</TableCell>
                          <TableCell>{row.hangGPLX.tenHang}</TableCell>
                          
                          {/* <TableCell >
                            <Link to={'/'} className={classes.link}>
                                  <Edit/>               
                            </Link>
                            <Delete onClick={() => setOpenDelete(!openDelete)} /> */}
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
      <ModalDelete open={openDelete} setOpenDelete={setOpenDelete} />
    </Paper>
  );
}
