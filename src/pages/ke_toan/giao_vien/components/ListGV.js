import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import { GetGiaoVienRequest, exportGVRequest } from '../../../../reducers/ke-toan/GiaoVien/GiaoVienAction';
import MaterialTable, { MTableToolbar } from 'material-table'
import { FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button, Tooltip, IconButton, } from '@material-ui/core'
import moment from "moment";
import { useReactToPrint } from 'react-to-print';
import { Link } from "react-router-dom";
import { Edit, Delete, Check, Clear } from '@material-ui/icons';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(3),
    minWidth: 80,
  },
}));

const localizationStyle = {
  header: {
    actions: 'Thao tác  ',
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} Tổng {count}',
    firstTooltip: 'Trang đầu',
    previousTooltip: 'Trang trước',
    nextTooltip: 'Trang sau',
    lastTooltip: 'Trang cuối',
    labelRowsSelect: 'Trang'
  },
  toolbar: {
    nRowsSelected: '{0} hàng đã được chọn'
  },
  body: {
    emptyDataSourceMessage: 'Không có dữ liệu',
  }
};
const optionsStyle = {
  search: true,
  selection: true,
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: '#01579b',
    color: '#FFF',
    whiteSpace: 'nowrap',
  },
  actionsCellStyle: {
    minWidth: 100,
    maxWidth: 100,
    align: 'center',
  },
  rowStyle: {
    backgroundColor: '#EEE',
  }
}

export default function ListGV() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => _get(state, 'giaoVienkt.giaoVienkts', []));
  const export1 = () => (
    dispatch(exportGVRequest())
  )
  /*
  * Data Table
  */
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

  const result = rows.map((rows, index) => (
    {
      
      i: index,
      id: rows.id,
      hoTen: rows.hoTen,
      ngaySinh: moment(rows.ngaySinh).format("DD/MM/YYYY"),
      giamTruGiaCanh: rows.giamTruGiaCanh,
      giamTruBanThan: rows.giamTruBanThan,
      thongTinKeToans: rows.thongTinKeToans,
      tongThuNhap: rows.tongThuNhap,
      tongKhoanThu: rows.tongKhoanThu,
      tongThuNhapChiuThue: rows.tongThuNhapChiuThue,
      thueTNCN: rows.thueTNCN,
    }));


  const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit style={{ color: '#448aff', }} {...props} />),
    Delete: forwardRef((props, ref) => <Delete style={{ color: '#ff1744' }} {...props} />),
    Clear: forwardRef((props, ref) => <Clear style={{ color: '#616161' }} {...props} />),
    Check: forwardRef((props, ref) => <Check style={{ color: '#4caf50' }} {...props} />),
    SaveAltIcon: forwardRef((props, ref) => <SaveAltIcon style={{ color: '#ff1744' }} {...props} />),
  };


  useEffect(() => {
    dispatch(GetGiaoVienRequest());
  }, []); 

  return (
    <>
      <MaterialTable style={{ width: '100%' }}
        title='Danh sách kế toán giáo viên'
        columns={[
          {
            title: 'Tên Học Viên', field: 'showHoTen', editable: 'never',
            render: rowData => <div style={{ width: 180 }}>{rowData.hoTen}</div>
          },
          {
            title: 'Ngày sinh', field: 'ngaySinh', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <div style={{ width: 120 }}>{rowdata.ngaySinh}</div>,
          },
          {
            title: 'Giảm trừ gia cảnh', field: 'giamTruGiaCanh', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <div style={{ width: 120 }}>{rowdata.giamTruGiaCanh}</div>,
          },
          {
            title: 'Giảm trừ bản thân', field: 'giamTruBanThan', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <div style={{ width: 120 }}>{rowdata.giamTruBanThan}</div>,
          },
          {
            title: 'Tổng thu nhập', field: 'tongThuNhap', editable: 'never',
            render: rowData => <div style={{ width: 180 }}>{rowData.tongThuNhap}</div>
          },
          {
            title: 'Tổng các khoản trừ', field: 'tongKhoanThu', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <div style={{ width: 120 }}>{rowdata.tongKhoanThu}</div>,
          },
          {
            title: 'Tổng thu nhập chịu thuế', field: 'tongThuNhapChiuThue', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <div style={{ width: 120 }}>{rowdata.tongThuNhapChiuThue}</div>,
          },
          {
            title: 'Thuế TNCN', field: 'thueTNCN', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <div style={{ width: 120 }}>{rowdata.thueTNCN}</div>,
          },
          {
            title: 'Thao tác', field: 'thaoTac', align: 'center', cellStyle: { padding: '5px' },
            render: rowdata => <Link to={`/ke_toan/sua_thong_tin_giao_vien_kt/${rowdata.id}`}><button type="button" className='btn btn-primary px-3' style={{ borderRadius: "0px" }}>
            <i className='fas fa-pencil-alt' style={{ fontSize: 16, bc: 'white'}} aria-hidden="true"></i></button></Link>
          },

        ]}
        detailPanel={[
          {
            tooltip: 'Chi tiết',
            render: rowData => {
              if (rowData.thongTinKeToans.length === 0) {
                return <div style={{
                  textAlign: 'center', flexDirection: 'column', display: 'flex',
                  justifyContent: 'center', height: 60, width: '100%'
                }}>
                  Chưa có dữ liệu
                </div>;
              }
              return (
                <div style={{ width: '100%' }}>
                  <MaterialTable style={{ width: '100%' }}
                    data={rowData.thongTinKeToans.map((rows, index) => (
                      {
                        i: index + 1,
                        tenTruong: rows.tenTruong,
                        loai: rows.loai,
                        soTien: rows.tongTien.soTien,
                      }))}
                    columns={[
                      {
                        title: 'STT', field: 'i',
                        render: rowdata => <div style={{ width: 20 }}>{rowdata.i}</div>
                      },
                      {
                        title: 'Tên trường', field: 'tenTruong',
                        render: rowdata => <div style={{ width: 100 }}>{rowdata.loai}</div>
                      },
                      {
                        title: 'Loại', field: 'loai',
                        render: rowdata => <div style={{ width: 100 }}>{rowdata.loai}</div>
                      },
                      {
                        title: 'Số tiền', field: 'soTien',
                        render: rowdata => <div style={{ width: 100 }}>{rowdata.soTien}</div>
                      },
                    ]}
                    options={{
                      actionsColumnIndex: -1,
                      toolbar: false,
                      paging: false,
                      actionsCellStyle: {
                        minWidth: 150,
                        maxWidth: 150,
                        whiteSpace: 'nowrap',
                      },
                      sorting: false,
                      paging: false,
                      headerStyle: {
                        whiteSpace: 'nowrap',
                        margin: 0,
                      }
                    }}
                    localization={localizationStyle}
                  >
                  </MaterialTable>
                </div>
              )
            }
          }
        ]
        }
        actions={[
          {
            icon: () => (
              <Link onClick={export1}>
                <IconButton >
                  <SaveAltIcon color='primary' /></IconButton>
              </Link>
            ),
            tooltip: "Tải xuống",
            isFreeAction: true,
          },
        ]}
        icons={tableIcons}
        data={result}
        localization={localizationStyle}
        options={optionsStyle}
      >
      </MaterialTable>
      <ToastContainer />
    </>
  );
}

