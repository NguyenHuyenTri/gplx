import React, { useEffect} from 'react';
import MaterialTable from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import { Add } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { deleteTheThueXeRequest, GetAllTheThueXeRequest } from '../../../../reducers/qly-xe/TheThueXe/TheThueXeAction';

export default function ListTTX() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rows = useSelector((state) => _get(state, 'theThueXe.thethuexes', []));

  const columns = [
    {
      field: 'maThe',
      title: 'Mã thẻ',
      align: "center",
      cellStyle: {
        minWidth: 130,
        maxWidth: 130,
      },
    },
    {
      field: 'hoTen',
      title: 'Tên chủ thẻ',
      cellStyle: {
        minWidth: 170,
        maxWidth: 170,
      },
    },
    {
      field: 'soDT',
      title: 'Số điện thoại',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'soTien',
      title: 'Tổng số tiền đã nộp',
      cellStyle: {
        minWidth: 230,
        maxWidth: 230,
      },
    },

    {
      field: 'soTienConLai',
      title: 'Tổng số tiền hiện tại',
      cellStyle: {
        minWidth: 230,
        maxWidth: 230,
      },
    },
    {
      field: 'ghiChu',
      title: 'Ghi chú',
      cellStyle: {
        minWidth: 160,
        maxWidth: 160,
      },
    }
  ];


  useEffect(() => {
    dispatch(GetAllTheThueXeRequest());
  }, []);

  function formatNumber(number) {
    let formatNumber = (Number(number)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray = formatNumber.split('.');
    if (splitArray.length > 1) {
      formatNumber = splitArray[0];
    }
    return (formatNumber);
  }

  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      maThe: <Link to={`/ql_xe/the_thue_xe/ra_vao_the/${rows.id}`} style={{textDecoration:'none'}} >{rows.maThe}</Link>,
      hoTen: rows.hoTen,
      soDT: rows.soDT,
      soTien: formatNumber(rows.soTien) +' VNĐ',
      soTienConLai: formatNumber(rows.soTienConLai) +' VNĐ',
      ghiChu: rows.ghiChu,
    }));

  const handleDetele = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
    try {
      await dispatch(deleteTheThueXeRequest(id));
      alertSuccess('Xóa thẻ thuê xe thành công!');
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
        title="Danh sách thẻ thuê xe"
        actions={[
          {
            tooltip: "Thêm thẻ thuê xe",
            isFreeAction: true,
            link: `/ql_xe/the_thue_xe/them_ttx`,
          },
          {
            tooltip: "Chỉnh sửa",
            icon: 'fas fa-pencil-alt',
            color: 'btn-primary',
            onClick: (event, rowData) => history.push(`/ql_xe/the_thue_xe/sua_ttx/${rowData.id}`)
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



