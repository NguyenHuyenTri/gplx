import React, { useEffect, useState } from 'react'
import MaterialTable, { MTableToolbar } from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { Dialog, DialogTitle, Tooltip, DialogActions } from '@material-ui/core'
import { Add } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { getHangDaoTaoMonHocByIdRequest, deleteMonHocDaoTaoMonHocRequest, }
  from '../../../reducers/quan-tri/HangDaoTaoMonHoc/HangDaoTaoMonHocAction'
import EditMonHocHangDaoTao from './EditMonHocHangDaoTao';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';



const HangDaoTao = () => {

  let query = window.location.pathname.split("/");
  let id = query[query.length - 1];

  const history = useHistory();
  const dispatch = useDispatch();
  const [showUpdate, setShowUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState([]);

  const rows = useSelector((state) => _get(state, 'hangDaoTaoMonHoc.hangdaotaomonhocs', []));
  const tenhang = useSelector((state) => _get(state, 'hangDaoTaoMonHoc.tenhangdaotaomonhoc', []));


  const columns = [

    {
      field: 'tenhang',
      title: 'Hạng đào tạo',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'tenMH',
      title: 'Tên môn học',
      cellStyle: {
        minWidth: 250,
        maxWidth: 250,
      },
    },
    {
      field: 'tongSoGio',
      title: 'Tổng số giờ',
      cellStyle: {
        minWidth: 140,
        maxWidth: 140,
      },
    },

    {
      field: 'lyThuyet',
      title: 'Lý thuyết',
      cellStyle: {
        minWidth: 120,
        maxWidth: 120,
      },
    },
    {
      field: 'thucHanhHinh',
      title: 'Thực hành hình',
      cellStyle: {
        minWidth: 160,
        maxWidth: 160,
      },
    },

    {
      field: 'thucHanhDuong',
      title: 'Thực hành đường',
      cellStyle: {
        minWidth: 180,
        maxWidth: 180,
      },
    },
    {
      field: 'kiemTra',
      title: 'Kiểm tra',
      cellStyle: {
        minWidth: 115,
        maxWidth: 115,
      },
    },
    {
      field: 'trangThai',
      title: 'Trạng thái',
      cellStyle: {
        minWidth: 210,
        maxWidth: 210,
      },
    },
    {
      field: 'ghiChu',
      title: 'Ghi chú',
      cellStyle: {
        minWidth: 130,
        maxWidth: 130,
      },
    },
  ];

  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,

      tenMH: rows.tenMH,
      tenhang: tenhang,
      tongSoGio: rows.hangDTMH != null ? rows.hangDTMH.tongSoGio : '',
      kiemTra: rows.hangDTMH != null ? rows.hangDTMH.kiemTra : '',
      lyThuyet: rows.hangDTMH != null ? rows.hangDTMH.lyThuyet : '',
      thucHanhDuong: rows.hangDTMH != null ? rows.hangDTMH.thucHanhDuong : '',
      thucHanhHinh: rows.hangDTMH != null ? rows.hangDTMH.thucHanhHinh : '',
      trangThai: rows.hangDTMH != null ? rows.hangDTMH.trangThai === true ? 'Hiệu lực' : 'Chưa hiệu lực' : '',
      ghiChu: rows.hangDTMH != null ? rows.hangDTMH.ghiChu : '',
    }));

  const handleDetele = async (value) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        const data = {
          "monHoc": value
        }
        await dispatch(deleteMonHocDaoTaoMonHocRequest(data, id));
        getIdDaoTao(id)
        alertSuccess('Xóa môn học hạng đào tạo thành công!');
      } catch (error) {
        alertFailed(error.toString());
      }
    }
  };


  const alertSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const alertFailed = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const show = () => {
    getIdDaoTao(id)
    setShowUpdate(false)
  }

  const handleClickUpdate = (value) => {
    setDataUpdate(value)
    if (value != null) {
      setShowUpdate(true)
    }
  }


  useEffect(() => {
    dispatch(getHangDaoTaoMonHocByIdRequest(id));
  }, []);

  const getIdDaoTao = async (id) => {
    try {
      await dispatch(getHangDaoTaoMonHocByIdRequest(id));
    } catch (error) {
      alert(error);
    }
  }




  return (
    <>
      {
        !showUpdate ? <MaterialTable
          title="Danh sách môn học của hạng đào tạo"
          columns={columns}
          data={result}
          actions={[
            {
              tooltip: "Thêm môn học cho hạng đào tạo",
              isFreeAction: true,
              link: `/qt_he_thong/them_mon_hoc_hang_dao_tao/${id}`,
            },
            {
              tooltip: "Đóng môn học hạng đào tạo",
              icon: 'fas fa-times',
              color: 'light',
              isFreeAction: true,
              onClick: () => history.goBack()
            },
            {
              tooltip: "Cập nhật",
              icon: 'fas fa-pencil-alt',
              color: 'btn-primary',
              onClick: (event, rowData) => handleClickUpdate(rowData)
            },
            {
              tooltip: "Xóa",
              color: 'btn-danger',
              icon: 'fas fa-trash-alt',
              onClick: (event, rowData) => handleDetele(rowData.id)
            },
          ]}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
              </div>
            ),
            Action: props => (
              props.action.isFreeAction === true && props.action.tooltip !== 'Đóng môn học hạng đào tạo' ?
                <Tooltip title={props.action.tooltip} >
                  <Link to={props.action.link} style={{ textDecoration: 'none' }}>
                    <Add /> </Link>
                </Tooltip> :
                <Tooltip title={props.action.tooltip}>
                  <button type="button" className={`btn ${props.action.color} px-3`} style={{ borderRadius: "0px" }}
                    onClick={(event) => props.action.onClick(event, props.data)}>
                    <i className={props.action.icon} style={{ fontSize: 16 }} aria-hidden="true"></i></button></Tooltip>
            )

          }}
          options={optionStyle}
          localization={localizationStyle}
        >
        </MaterialTable> :
          <EditMonHocHangDaoTao show={show} dataUpdate={dataUpdate} idDaoTao={id} />
      }
      <ToastContainer />
    </>
  );
};

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


export default HangDaoTao;
