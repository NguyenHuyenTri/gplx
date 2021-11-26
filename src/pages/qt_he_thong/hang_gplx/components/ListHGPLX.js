import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllHangGPLXRequest, deleteHangGPLXRequest, } from '../../../../reducers/quan-tri/HangGPLX/HangGPLXAction';
import { get as _get } from 'lodash';
import { Add } from '@material-ui/icons';
import { Dialog, DialogTitle, Tooltip, DialogActions, Paper, Box, Grid } from '@material-ui/core'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
}));

export default function ListHGPLX() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const rows = useSelector((state) => _get(state, 'hangGplx.hanggplxs', []));

  const columns = [
    {
      field: 'tenHang',
      title: 'Tên hạng',
      align: "center",
      cellStyle: {
        minWidth: 130,
        maxWidth: 130,
      },
      customFilterAndSearch: (term, rowData) => (rowData.showTenHang).indexOf(term) != -1
    },
    {
      field: 'tenHangEN',
      title: 'Tên hạng (EN)',
      cellStyle: {
        minWidth: 170,
        maxWidth: 170,
      },
    },
    {
      field: 'hanSuDung',
      title: 'Hạn sử dụng (năm)',
      cellStyle: {
        minWidth: 190,
        maxWidth: 190,
      },
    },
    {
      field: 'diemDatSH',
      title: 'Điểm đạt sát hạch',
      cellStyle: {
        minWidth: 180,
        maxWidth: 180,
      },
    },

    {
      field: 'moTa',
      title: 'Mô tả',
      cellStyle: {
        minWidth: 250,
        maxWidth: 250,
      },
    },
    {
      field: 'trangThai',
      title: 'Trạng thái',
      cellStyle: {
        minWidth: 160,
        maxWidth: 160,
      },
    },
    {
      field: 'ghiChu',
      title: 'Ghi chú',
      cellStyle: {
        minWidth: 250,
        maxWidth: 250,
      },
    },
  ];


  useEffect(() => {
    dispatch(GetAllHangGPLXRequest());
  }, []);

  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      tenHangEN: rows.tenHangEN,
      showTenHang:rows.tenHang,
      tenHang: <Link to={`/qt_he_thong/hang_dao_tao/${rows.id}`} style={{paddingTop:10,paddingBottom:10,textDecoration:'none'}} >{rows.tenHang}</Link>,
      hanSuDung: rows.hanSuDung,
      moTa: rows.moTa,
      ghiChu: rows.ghiChu,
      trangThai: rows.trangThai == true ? 'Hiệu lực' : 'Chưa hiệu lực',
      diemDatSH: rows.diemDatSH,
    }));



  const handleDetele = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
    try {
      await dispatch(deleteHangGPLXRequest(id));
      alertSuccess('Xóa hạng giấy phép lái xe thành công!');
    } catch (error) {
      alert(error.toString());
    }
    }
  };

  const alertSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }


  return (
    <>
      <MaterialTable
        columns={columns}
        data={result}
        title="Danh sách hạng giấy phép lái xe"
        actions={[
          {
            tooltip: "Thêm hạng giấy phép lái xe",
            isFreeAction: true,
            link: `/qt_he_thong/them_hang_GPLX`,
          },
          {
            tooltip: "Chỉnh sửa",
            icon: 'fas fa-pencil-alt',
            color: 'btn-primary',
            onClick: (event, rowData) => history.push(`/qt_he_thong/sua_thong_tin_hang_GPLX/${rowData.id}`)
          },
          {
            tooltip: "Xóa",
            color: 'btn-danger',
            icon: 'fas fa-trash-alt',
            onClick: (event, rowData) => handleDetele(rowData.id)
          },
        ]}
        components={componentsStyle}
        options={optionStyle}
        localization={localizationStyle}
      >

      </MaterialTable>
      <ToastContainer />

    </>
  );
};

const componentsStyle = {
  Action: props => (
    props.action.isFreeAction === true ?
      <Tooltip title={props.action.tooltip}>
        <Link to={props.action.link}>
          <Add /> </Link>
      </Tooltip> :
       <Tooltip title={props.action.tooltip}>
       <button type="button" className={`btn ${props.action.color} px-3`} style={{ borderRadius: "0px" }}
         onClick={(event) => props.action.onClick(event, props.data)}>
         <i className={props.action.icon} style={{fontSize:16}} aria-hidden="true"></i></button></Tooltip>
  )
}
const optionStyle = {
  search: true,
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: '#01579b',
    color: '#FFF'
  },
  actionsCellStyle: {
    hover: false,
    width: 200,
    align: 'center',
  },
  // selection: true,
  rowStyle: {
    backgroundColor: '#EEE',
  },
}
const localizationStyle = {
  header: {
    actions: 'Thao tác',
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} Tổng {count}',
    firstTooltip: 'Trang đầu',
    previousTooltip: 'Trang trước',
    nextTooltip: 'Trang sau',
    lastTooltip: 'Trang cuối',
    labelRowsSelect: 'Dòng'
  },
  body: {
    emptyDataSourceMessage: 'Không có dữ liệu',
    editRow: {
      deleteText: 'Xác nhận xóa đơn vị hành chính này!!!',
      cancelTooltip: 'Hủy',
      saveTooltip: 'Đồng ý',
    },
    deleteTooltip: 'Xác nhận',
    editTooltip: 'Chỉnh sửa'
  }
}



