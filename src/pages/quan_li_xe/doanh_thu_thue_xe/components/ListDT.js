import React, { useEffect, useState } from 'react';
import MaterialTable, {MTableToolbar}  from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllDoanhThuRequest, updateDoanhThuRequest } from '../../../../reducers/qly-xe/DoanhThu/DoanhThuAction'
import {Typography,Tooltip,Link,Dialog, DialogTitle,DialogActions,Button} from '@material-ui/core'
import { Add } from '@material-ui/icons';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import moment from "moment";

export default function ListDT() {


  const [data, setData] = useState();
  const dispatch = useDispatch();
  const rows = useSelector((state) => _get(state, 'allLichThueXe.doanhthus', []));

  const [open, setOpen] = useState(false);
  const [total ,setTotal] =useState(0);
  const [showTotal,setShowTotal] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const columns = [
    {
      field: 'bienSoXe',
      title: 'Biển số xe',
      align: "center",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: 'hangXe',
      title: 'Nhãn hiệu - Loại',
      align: "center",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: 'tenNguoiThue',
      title: 'Tên người thuê',
      cellStyle: {
        minWidth: 200,
        maxWidth:200,
      },
    },
    {
      field: 'soDT',
      title: 'Số điện thoại',
      cellStyle: {
        maxWidth: 150,
        minWidth: 150
      },
    },
    {
      field: 'tenSan',
      title: 'Tên sân',
      cellStyle: {
        maxWidth: 200,
        minWidth: 200
      },
    },
    {
      field: 'tongSoTien',
      title: 'Số tiền',
      cellStyle: {
        maxWidth: 160,
        minWidth: 160
      },
    },
    {
      field: 'ngayGioBDThue',
      title: 'Ngày giờ thuê',
      cellStyle: {
        maxWidth: 200,
        minWidth: 200
      },
    },
    {
      field: 'ngayThuTien',
      title: 'Ngày thu tiền',
      cellStyle: {
        maxWidth: 200,
        minWidth: 200
      },
    },

  ];

  useEffect(() => {
    dispatch(GetAllDoanhThuRequest());
  }, []);


  useEffect(() => {
    setData(result)
  }, [rows]);

    const result =  rows.map((rows, index) => (
      {
        i: index,
        id: rows.id,
        ngayGioBDThue: moment(rows.ngayGioBDThue).format("DD/MM/YYYY hh:mm:ss"),
        thuTien:rows.thuTien,
        soDT: rows.soDT,
        ngayThuTien: rows.ngayThuTien != null ?moment(rows.ngayThuTien).format("DD/MM/YYYY") :'',
        tenNguoiThue: rows.tenNguoiThue,
        tongSoTien: formatNumber(rows.tongSoTien) +' VNĐ',
        totalTien:rows.tongSoTien.toString(),
        tenSan: rows.sanTapLai === null ? 'Không có sân': rows.sanTapLai.tenSan,
        bienSoXe: rows.xe !=null ?rows.xe.bienSoXe :'',
        hangXe: rows.xe!=null ?rows.xe.hangXe + ' - ' + rows.xe.dongXe:'',
      }));


  const xacnhanThuTien = async (values) => {
    if (window.confirm('Đồng ý thu tiền?')) {
      try {
        await dispatch(updateDoanhThuRequest(values.id));
        await dispatch(GetAllDoanhThuRequest());
        alertSuccess('Thành công!');
      } catch (error) {
        alert(error.toString());
      }
      }
  };

  function formatNumber(number) {
    let formatNumber = (Number(number)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray = formatNumber.split('.');
    if (splitArray.length > 1) {
      formatNumber = splitArray[0];
    }
    return (formatNumber);
  }


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

  const totalMoney =()=>{
    let total = 0 ;
    data.map((value)=>{
        if(value.thuTien){
          total=total+parseInt(parseInt(value.totalTien));        
        }
      })
      setTotal(total);
      setShowTotal(true);
  }

  return (
    <>
    
      <ToastContainer />
      <MaterialTable
        title="Danh thu thuê xe"
        columns={columns}
        data={data}
        options={optionStyle}
        localization={localizationStyle}
        actions={[
          {
            tooltip: "Xóa",
            color: 'btn-danger',
            icon: 'fas fa-trash-alt',
            onClick: (event, rowData) => xacnhanThuTien(rowData)
          },
        ]}
        components={{
          
          Action: props => (
            props.action.isFreeAction === true ?
              <Tooltip title={props.action.tooltip}>
                <Link to={props.action.link}>
                  <Add /> </Link>
              </Tooltip> :
              <Button variant='contained' color="primary"  disabled={props.data.thuTien}
                onClick={(event) => props.action.onClick(event, props.data)}
              >Xác nhận</Button>
          ),
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{padding: '0px 10px',height:70}} >
                <Typography style={{marginLeft:15}} >
                  {
                    showTotal ?  <span style={{color:'black'}}>Tổng số tiền : {formatNumber(total) + ' VNĐ'}</span> :null
                  }
                <Button onClick={totalMoney} variant='container' style={{marginLeft:15,float:'right',backgroundColor:'#01579B',color:'#FFFFFF'}}>
                  Tính số tiền
              </Button>
              </Typography>
              </div>
            </div>
          ),
        }}
      
      />
      <ToastContainer />
    </>
  );
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
    minWidth: 150,
    maxWidth:150,
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


