import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { get as _get } from 'lodash';
import { GetAllThongBaoRequest, deleteThongBaoRequest, activeThongBaoRequest, inactiveThongBaoRequest } from '../../../../reducers/quan-tri/ThongBao/ThongBaoAction';
import moment from "moment";
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';


const localizationStyle = {
  pagination: {
    labelDisplayedRows: '{from}-{to} Tổng {count}',
    firstTooltip: 'Trang đầu',
    previousTooltip: 'Trang trước',
    nextTooltip: 'Trang sau',
    lastTooltip: 'Trang cuối',
    labelRowsSelect: 'Dòng'
  },
  body: {
    emptyDataSourceMessage: 'Không có dữ liệu',
  }
};

/**                                                                                                                                                       
 * List thong bao                                                                                                                                  
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function StickyHeadTable() {
  const dispatch = useDispatch();

  // listen data of grid                                                                                                                                  
  const rows = useSelector((state) => _get(state, 'thongBaos.thongBaos', []));

  /**
   * confirm delete item
   * @param {*} id 
   */
  const confirmDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteThongBaoRequest(id));
      toast.success('Xóa thông báo thành công!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
    }
  }

  /**
   * columns map with table
   */
  useEffect(() => {
    dispatch(GetAllThongBaoRequest());
  }, []);

  /**
   * map column and row into datatable
   */
  const columns = [
    {
      field: 'tenTB', title: 'Tên Thông Báo', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'noiDung', title: 'Nội Dung', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'ngayGio', title: 'Ngày Giờ', cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'loaiTB', title: 'Loại Thông Báo', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'cachTB', title: 'Cách Thông Báo', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'thongBaoCho', title: 'Thông Báo Cho', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'soNgayTB', title: 'Số Ngày Báo Trước', cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'action', title: 'Thao Tác', cellStyle: {
        minWidth: 230,
        maxWidth: 230,
      },
    },
  ];

  const showNotification = (id) => {
    dispatch(activeThongBaoRequest(id));
    toast.success('Gửi thông báo thành công!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(GetAllThongBaoRequest());
  }

  const offNotification = (id) => {
    dispatch(inactiveThongBaoRequest(id));
    toast.success('Tắt thông báo thành công!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(GetAllThongBaoRequest());
  }

  const data = rows.map((row, index) => ({
    tenTB: row.tenTB == null || row.tenTB == '' ?
      'Chưa thêm tên' :
      row.tenTB.length > 50 ?
        row.tenTB.substr(0, 50) + '...' :
        row.tenTB,
    noiDung: row.noiDung == null || row.noiDung == '' ?
      'Chưa có nội dung' :
      row.noiDung,
    ngayGio: row.ngayGio === null ? '' : moment(row.ngayGio).format("DD/MM/YYYY"),
    loaiTB: row.loaiTB,
    cachTB: row.cachTB,
    thongBaoCho: row.thongBaoCho,
    soNgayTB: row.loaiTB === "Thông báo hệ thống" ? row.soNgayTB : '',
    action: <div>
      {/* Edit data thong bao */}
      {<Link to={`/qt_he_thong/chinh_sua_thong_bao/${row.id}`} >
        <button type="button" className="btn btn-primary px-3" style={{ borderRadius: "0px" }}>
          <i className="fas fa-pencil-alt" aria-hidden="true"></i></button>
      </Link>}
      {/* Delete data thong bao */}
      <button type="button" className="btn btn-danger px-3" style={{ borderRadius: "0px" }}
        onClick={() => { confirmDelete(row.id); }}
      ><i className="fas fa-trash-alt" aria-hidden="true"></i></button>
      {/* Active and unactive :row.loaiTB === "Thông báo hệ thống" row.cachTB === "Thông báo trên web"*/}
      {row.ngayGio === null ?
        <button type="button" className="btn btn-success px-3" style={{ borderRadius: "0px", paddingTop: "10px", paddingLeft: "", paddingRight: "25px" }}
          onClick={() => { showNotification(row.id) }}><NotificationsIcon /></button> :
        <button type="button" className="btn btn-success px-3" style={{ borderRadius: "0px", paddingTop: "10px", paddingLeft: "", paddingRight: "25px" }}
          onClick={() => { offNotification(row.id) }}><NotificationsOffIcon /></button>}
    </div>
  }));

  return (
    <div>
      <MaterialTable
        title="Danh Sách Thông Báo"
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => (
              <Link to={`/qt_he_thong/them_thong_bao`}>
                <AddIcon />
              </Link>
            ),
            tooltip: "Thêm mới thông báo",
            isFreeAction: true,
          },
        ]}
        options={{
          search: true,
          tablelayout: "fixed",
          headerStyle: {
            backgroundColor: "#01579B",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: '#EEE',
          }
        }}
        localization={localizationStyle}
      />
      <ToastContainer />
    </div>
  );
}
