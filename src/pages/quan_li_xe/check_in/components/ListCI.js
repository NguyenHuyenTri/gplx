import React, { useEffect} from 'react';
import MaterialTable from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import { Add } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { GetAllCheckinRequest } from '../../../../reducers/qly-xe/Checkin/CheckinAction';
import moment from 'moment';

export default function ListCI() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rows = useSelector((state) => _get(state, 'checkin.checkins', []));
  var query = window.location.pathname.split("/");
  var id = query[query.length - 1];

  const columns = [
    {
      field: 'ngayThang',
      title: 'Ngày tháng',
      align: "center",
      cellStyle: {
        minWidth: 130,
        maxWidth: 130,
      },
    },
    {
      field: 'xe',
      title: 'Biển số xe',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'sanTapLai',
      title: 'Tên sân',
      cellStyle: {
        minWidth: 160,
        maxWidth: 160,
      },
    },
    {
      field: 'gioVaoSan',
      title: 'Giờ vào sân',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'gioRaSan',
      title: 'Giờ ra sân',
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'tongSoGio',
      title: 'Tổng số giờ lái xe',
      cellStyle: {
        minWidth: 180,
        maxWidth: 180,
      },
    },

    {
      field: 'tongSoTien',
      title: 'Tổng số tiền',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
  ];

  function formatNumber(number) {
    let formatNumber = (Number(number)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray = formatNumber.split('.');
    if (splitArray.length > 1) {
      formatNumber = splitArray[0];
    }
    return (formatNumber);
  }

  useEffect(() => {
    dispatch(GetAllCheckinRequest(id));
  }, []);

  const result = rows?.theTuRavaos?.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      ngayThang: rows.ngayThang === null ? '' : moment(rows.ngayThang).format("DD/MM/YYYY"),
      gioVaoSan: rows.gioVaoSan === null ? '' : moment(rows.gioVaoSan).format("HH:mm:ss"),
      gioRaSan: rows.gioRaSan === null ? '' : moment(rows.gioRaSan).format("HH:mm:ss"),
      tongSoGio: rows.tongSoGio,
      tongSoTien: formatNumber(rows.tongSoTien) +' VNĐ',
      xe: rows.xe?.bienSoXe,
      sanTapLai: rows.sanTapLai?.tenSan
    }));

  return (
    <>
      <MaterialTable
        columns={columns}
        data={result}
        title={`Danh sách ra vào của thẻ thuê xe: Mã thẻ (${rows.maThe})`}
        actions={[
          {
            tooltip: "Chỉnh sửa",
            icon: 'fas fa-pencil-alt',
            color: 'btn-primary',
            onClick: (event, rowData) => history.push(`/ql_xe/the_thue_xe/ra_vao_the/sua/${rowData.id}`)
          }
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
    color: '#FFF',
  },
  actionsCellStyle: {
    hover: false,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
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
      cancelTooltip: 'Hủy',
      saveTooltip: 'Đồng ý',
    },
    editTooltip: 'Chỉnh sửa'
  }
}



