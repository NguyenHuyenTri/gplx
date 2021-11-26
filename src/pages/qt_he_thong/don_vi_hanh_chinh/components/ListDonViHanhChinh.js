import React, { useEffect, useState } from 'react';
import { get as _get } from 'lodash';
import MaterialTable from 'material-table'
import { GetAllDonViHanhChinhRequest, deleteDonViHanhChinhRequest, } from '../../../../reducers/quan-tri/DonViHanhChinh/DonViHanhChinhAction';
import { GetAllDonViVanTai, deleteDonViVanTaiRequest } from '../../../../reducers/quan-tri/DonViHanhChinh/DonViVanTaiAction';

import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core'
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { useHistory } from "react-router-dom";

export default function ListDonViHanhChinh() {

  const dispatch = useDispatch();
  const rows = useSelector((state) => _get(state, 'dvhc.donvihanhchinhs', []));
  const rowsVt = useSelector((state) => _get(state, 'donviVt.donvivantais', []));
  const history = useHistory();

  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      ten: rows.ten,
      tenDVHC: rows.loaiDVHC.loai + ' ' + rows.ten,
      tenDayDu: rows.tenDayDu,
      loaiDVHC: rows.loaiDVHC.loai,
      trangThai: rows.trangThai,
      showTrangThai: rows.trangThai === true ? 'Hiệu lực' : 'Chưa hiệu lực',
    }));

  const resultVt = rowsVt.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      tenDV: rows.tenDV,
      tenCQQL: rows.tenCQQL,
      loaiDVGTVT: rows.loaiDVGTVT != null ? rows.loaiDVGTVT.loai : '',
      ghiChu: rows.ghiChu === null ? '' : rows.ghiChu
    }));


  const columns = [
    {
      title: 'Tên đơn vị hành chính', field: 'tenDVHC', editable: 'never',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    { title: 'Tên ngắn gọn', field: 'ten' },
    {
      title: 'Tên đầy đủ', field: 'tenDayDu',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: 'Loại đơn vị hành chính', field: 'loaiDVHC', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      title: 'Trạng thái', field: 'showTrangThai',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
  ]

  const columnsVt = [
    {
      title: 'Tên đơn vị GTVT', field: 'tenDV',
      cellStyle: {
        minWidth: 300,
        maxWidth: 300,
      },
    },
    {
      title: 'Cơ quan quản lý', field: 'tenCQQL', cellStyle: {
        minWidth: 300,
        maxWidth: 300,
      },
    },
    {
      title: 'Loại đơn vị GTVT', field: 'loaiDVGTVT', cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: 'Ghi chú', field: 'ghiChu',
      cellStyle: {
        minWidth: 250,
        maxWidth: 250,
      },
    },
  ]

  useEffect(() => {
    dispatch(GetAllDonViHanhChinhRequest());
    dispatch(GetAllDonViVanTai());
  }, []);

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

 

  const handleDetele = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        await dispatch(deleteDonViHanhChinhRequest(id));
        alertSuccess('Xóa hạng đơn vị hành chính thành công!');
      } catch (error) {
        alert(error.toString());
      }
    }
  };
  const handleDeteleVt = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        await dispatch(deleteDonViVanTaiRequest(id));
        alertSuccess('Xóa hạng đơn vị vận tải thành công!');
      } catch (error) {
        alert(error.toString());
      }
    }
  };
  return (
    <>
      <div style={{ maxWidth: '100%' }}>

        <MaterialTable
          title='Đơn vị hành chính'
          actions={[
            {
              tooltip: "Thêm đơn vị hành chính",
              isFreeAction: true,
              link: `/qt_he_thong/them_don_vi_hanh_chinh`,
            },
            {
              tooltip: "Cập nhật",
              icon: 'fas fa-pencil-alt',
              color: 'btn-primary',
              onClick: (event, rowData) => history.push(`/qt_he_thong/chinh_sua_don_vi_hanh_chinh/${rowData.id}`)
            },
            {
              tooltip: "Xóa",
              color: 'btn-danger',
              icon: 'fas fa-trash-alt',
              onClick: (event, rowData) => handleDetele(rowData.id)
            },
          ]}
          columns={columns}
          data={result}
          components={componentsStyle}
          options={optionStyle}
          localization={localizationStyle}
        />

        <MaterialTable
          style={{ marginTop: 50 }}
          title='Đơn vị giao thông vận tải'
          actions={[
            {
              tooltip: "Thêm đơn vị vận tải",
              isFreeAction: true,
              link: `/qt_he_thong/them_don_vi_van_tai`,
            },
            {
              tooltip: "Cập nhật",
              icon: 'fas fa-pencil-alt',
              color: 'btn-primary',
              onClick: (event, rowData) => history.push(`/qt_he_thong/chinh_sua_don_vi_van_tai/${rowData.id}`)
            },
            {
              tooltip: "Xóa",
              color: 'btn-danger',
              icon: 'fas fa-trash-alt',
              onClick: (event, rowData) => handleDeteleVt(rowData.id)
            },
          ]}
          columns={columnsVt}
          data={resultVt}
          components={componentsStyle}
          options={optionStyle}
          localization={localizationStyle}
        />

      </div>
      <ToastContainer />
    </>
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


