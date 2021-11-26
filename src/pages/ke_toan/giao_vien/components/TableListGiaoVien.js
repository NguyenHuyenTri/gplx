import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Link, useHistory } from "react-router-dom";
import { get as _get, round } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetGiaoVienRequest } from '../../../../reducers/ke-toan/GiaoVien/GiaoVienAction';

const columns = [
  { id: 'hoTen', label: 'Họ và tên', minWidth: 160 },
  { id: 'ngaySinh', label: 'Ngày sinh', minWidth: 160 },
  {
    id: 'tongThuNhap',
    label: 'Tổng thu nhập',
    minWidth: 160,
  },
  {
    id: 'tongKhoanTru',
    label: 'Tổng các khoản trừ',
    minWidth: 160,
  },
  {
    id: 'giamTruGiaCanh',
    label: 'Giảm trừ gia cảnh',
    minWidth: 160,
  },
  {
    id: 'giamTruBanThan',
    label: 'Giảm trừ bản thân',
    minWidth: 160,
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
  headerStyle: {
    minWidth: 220,
    backgroundColor: "#01579B",
    color: "#FFF",
  },
  rowStyle: {
    minWidth: 220,
  },
});

export default function StickyHeadTable() {
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
  const rows = useSelector((state) => _get(state, 'giaoVienkt.giaoVienkts', []));
  console.log(rows)

  var tongThuNhap = 0;
  var tongKhoanThu = 0;
  var tongThuNhapChiuThue = 0;
  var thueTNCN = 0;

  // tính thuế
  rows.forEach(item => {
    tongThuNhap = 0;
    tongKhoanThu = 0;
    tongThuNhapChiuThue = 0;
    thueTNCN = 0;

    item.thongTinKeToans.forEach(element => {
      // tổng thu nhập
      if (element.loai == 'Khoản thu nhập') {
        tongThuNhap += Number(element.tongTien.soTien);
      }

      // tổng khoản thu
      if (element.loai == 'Khoản trừ') {
        tongKhoanThu += Number(element.tongTien.soTien);
      }
    });

    // tổng thu nhập chịu thuế
    tongThuNhapChiuThue = tongThuNhap - tongKhoanThu - item.giamTruGiaCanh - item.giamTruBanThan;
    if (tongThuNhapChiuThue < 0) {
      tongThuNhapChiuThue = 0;
    }
    // tính thuế thu nhap ca nhan
    if (tongThuNhapChiuThue <= 0) {
      thueTNCN = 0;
    } else {
      if (tongThuNhapChiuThue <= 5000000) {
        thueTNCN = 0;
      } else {

      }
    }

    // update giá trị lại cho row
    item['tongThuNhap'] = tongThuNhap;
    item['tongKhoanThu'] = tongKhoanThu;
    item['tongThuNhapChiuThue'] = tongThuNhapChiuThue;
    item['thueTNCN'] = thueTNCN;
  });

  console.log('rowsupdate', rows)

  useEffect(() => {
    dispatch(GetGiaoVienRequest());
  }, []);

  return (
    <Paper className={classes.root} >
      <TableContainer className={classes.container} align="center">
        <Table stickyHeader aria-label='sticky table' align="center">
          <TableHead>
            <TableRow align="center">
              {columns.map((column) => (
                <TableCell className={classes.headerStyle} align="center"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell className={classes.headerStyle} align="center">
                <p>Các khoản thu nhập</p>
                <TableRow>
                  <TableCell className={classes.headerStyle} align="center">Khoản thu nhập</TableCell>
                  <TableCell className={classes.headerStyle} align="center">Các khoản trừ</TableCell>
                </TableRow>
              </TableCell>
              <TableCell className={classes.headerStyle} align="center">Tổng thu nhập chịu thuế</TableCell>
              <TableCell className={classes.headerStyle} align="center">Thuế TNCN</TableCell>
              <TableCell className={classes.headerStyle}>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  <TableCell>{row.hoTen}</TableCell>
                  <TableCell>{row.ngaySinh}</TableCell>
                  <TableCell align="center">
                    {row.tongThuNhap}
                  </TableCell>
                  <TableCell align="center">
                    {row.tongKhoanThu}
                  </TableCell>
                  <TableCell align="center">{row.giamTruGiaCanh}</TableCell>
                  <TableCell align="center">{row.giamTruBanThan}</TableCell>
                  <TableCell align="center">
                    <TableCell className={classes.rowStyle} align="center">
                      {row.thongTinKeToans.map((value, index) => {
                        if (value.loai == 'Khoản thu nhập') {
                          return <>
                            {value.tenTruong} <br></br>
                          </>
                        }
                      })}
                    </TableCell>
                    <TableCell className={classes.rowStyle} align="center">
                      {row.thongTinKeToans.map((value, index) => {
                        if (value.loai == 'Khoản trừ') {
                          return <>
                            {value.tenTruong} <br></br>
                          </>
                        }
                      })}
                    </TableCell>
                  </TableCell>
                  <TableCell align="center">{row.tongThuNhapChiuThue}</TableCell>
                  <TableCell align="center">{row.thueTNCN}</TableCell>
                  <TableCell >
                    <div>
                      <Link to={`/ke_toan/sua_thong_tin_giao_vien_kt/${row.id}`}  >
                        <button type="button" className="btn btn-primary px-3" style={{ borderRadius: "0px" }}>
                          <i className="fas fa-pencil-alt" aria-hidden="true"></i></button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        labelRowsPerPage='Dòng'
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
