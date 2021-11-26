import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import { GetAllComboboxKhoaHocRequest } from '../../../../reducers/dao-tao/KetQua/KetQuaDaoTaoAction'
import { getDiemThiByIdRequest, updateDiemThiRequest, GetAllMonHocByIdRequest } from '../../../../reducers/dao-tao/DiemThi/DiemThiAction'
import MaterialTable, { MTableToolbar } from 'material-table'
import { FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button } from '@material-ui/core'
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { Edit, Delete, Check, Clear } from '@material-ui/icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UpdateDiemThi from './UpdateDiemThi';
import '../../../sat-hach/ket-qua/components/test.css';
import { GetAllMonHocRequest } from '../../../../reducers/dao-tao/KetQua/KetQuaDaoTaoAction'

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
  headerTable: {
    backgroundColor: "#01579B",
    color: "#FFFFFF"
  }
}));

const localizationStyle = {
  header: {
    thaoTac: '         Thao tác',
    // paddingLeft: '10px',
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} Tổng {count}',
    firstTooltip: 'Trang đầu',
    previousTooltip: 'Trang trước',
    nextTooltip: 'Trang sau',
    lastTooltip: 'Trang cuối',
    labelRowsSelect: 'Dòng'
  },
  toolbar: {
    nRowsSelected: '{0} hàng đã được chọn'
  },
  body: {
    emptyDataSourceMessage: 'Không có dữ liệu',
    editRow: {
      deleteText: 'Xác nhận thu!!!',
      cancelTooltip: 'Hủy',
      saveTooltip: 'Đồng ý',
    },
    deleteTooltip: 'Xác nhận',
    editTooltip: 'Chỉnh sửa'
  }
};
const optionsStyle = {
  search: true,
  // selection: true,
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: '#01579b',
    color: '#FFF'
  },
  actionsCellStyle: {
    minWidth: 150,
    maxWidth: 150,
  },
  rowStyle: {
    backgroundColor: '#EEE',
  }
}

export default function ListDT() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const [select, setSelect] = useState();
  const [dataKQ, setDataKQ] = useState();
  const [updateData, setUpdateData] = useState();
  const [show, setShow] = useState(false);

  const comboxboxKhoaHoc = useSelector((state) => _get(state, 'kqDaoTao.comboboxkhoahoc', []));
  const rows = useSelector((state) => _get(state, 'hocViens.diemThis', []));
  const listmonhoc = useSelector((state) => _get(state, 'kqDaoTao.listmonhoc', []));

  // open and close update data
  const setOpen = (value) => {
    setUpdateData(value)
    setShow(true)
  }

  const onClose = () => {
    setShow(false);
  }

  // handle show data based on select khoa hoc
  const handleChange = (event) => {
    setSelect(event.target.value);
    getDiemThi(event.target.value);
    dispatch(GetAllMonHocRequest(event.target.value))
  };

  const handleUpdate = async (values) => {
    try {
      await dispatch(updateDiemThiRequest(values));
      await dispatch(getDiemThiByIdRequest(select));
      showToast('Cập nhật điểm thi thành công!');
      onClose();
    } catch (error) {
      alert(error.response.data?.message);
    }
  };

  // lay diem thi theo id
  const getDiemThi = async (id) => {
    try {
      await dispatch(getDiemThiByIdRequest(id));
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    dispatch(GetAllComboboxKhoaHocRequest());
  }, []);

  useEffect(() => {
    setDataKQ(result)
  }, [rows]);

  useEffect(() => {
    if (comboxboxKhoaHoc.length !== 0) {
      setSelect(comboxboxKhoaHoc[0].id);
      getDiemThiByIdRequest(comboxboxKhoaHoc[0].id);
      getDiemThi(comboxboxKhoaHoc[0].id);
      GetAllMonHocByIdRequest(comboxboxKhoaHoc[0].id);
    }
  }, [comboxboxKhoaHoc]);

  const showToast = (message) => {
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

  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      hoTen: rows.hoTen,
      ngaySinh: moment(rows.ngaySinh).format("DD/MM/YYYY"),
      diaChi: rows.diaChi !== null ? rows.diaChi.tenDayDu : '',
      monHocs: rows.monHocs
    }));

  const tableIcons = {
    // Edit: forwardRef((props, ref) => <Edit style={{ color: '#ff1744' }} {...props} />),
    Delete: forwardRef((props, ref) => <Delete style={{ color: '#ff1744' }} {...props} />),
    Clear: forwardRef((props, ref) => <Clear style={{ color: '#616161' }} {...props} />),
    Check: forwardRef((props, ref) => <Check style={{ color: '#4caf50' }} {...props} />),
  };

  return (
    <>
      {show ?
        <UpdateDiemThi onClose={onClose} data={updateData} handleUpdate={handleUpdate}
          dataMonHocs={listmonhoc} /> :
        <MaterialTable style={{width:'100%'}}
          data={result}
          title='Điểm thi'
          columns={[
            {
              title: 'Tên Học Viên', field: 'showHoTen', editable: 'never',
              render: rowData => <div style={{ width: 150 }}><Link to={`/hoc_vien/chi_tiet_hv/${rowData.id}`} style={{
                paddingTop: 10,
                paddingBottom: 10, textDecoration: 'none',
              }} >{rowData.hoTen}</Link></div>,
              customFilterAndSearch: (term, rowData) => (rowData.hoTen).indexOf(term) != -1
            },
            {
              title: 'Ngày sinh', field: 'ngaySinh', editable: 'never',
              render: rowdata => <div style={{ width: 200 }}>{rowdata.ngaySinh}</div>
            },
            {
              title: 'Địa chỉ thường trú', field: 'diaChi', editable: 'never',
              render: rowdata => <div style={{ width: 400 }}>{rowdata.diaChi}</div>
            },
            {
              title: 'Thao Tác', field: 'thaoTac',
              render: rowdata => <button onClick={() => setOpen(rowdata)}  style={{ width: 150 }} type="button" className='btn btn-primary px-3' style={{ borderRadius: "0px" }}>
                <i className='fas fa-pencil-alt' style={{ fontSize: 16 }} aria-hidden="true"></i></button>

            },

          ]}

          detailPanel={rowData => {
            if (rowData.monHocs.length === 0) {
              return <div style={{
                textAlign: 'center', flexDirection: 'column', display: 'flex',
                justifyContent: 'center', height: 60, width: '100%'
              }}>
                <p>Chưa có dữ liệu <strong onClick={() => setOpen(rowData)} style={{color: "#18A3FF"}}>Cập nhật</strong></p>
              </div>;
            }
            return (
              <>
                <MaterialTable style={{width:'100%'}}
                  icons={tableIcons}
                  data={rowData.monHocs.map((rows, index) => (
                    {
                      i: index + 1,
                      id: rowData.id,
                      idMonHoc: rows.id,
                      tenMH: rows.tenMH,
                      diemThi: rows.diemThi.diem,
                    }))}
                  options={{
                    actionsColumnIndex: -1,
                    toolbar: false,
                    paging: false,
                    sorting: false,
                    paging: false,
                    headerStyle: {
                      whiteSpace: 'nowrap',
                      margin: 0,
                    }
                  }}
                  columns={[
                    {
                      title: 'STT', field: 'i', 
                      render: (rowData) => <div style={{ width: 300 }}>{rowData.i}</div>
                    },
                    {
                      title: 'Tên môn học', field: 'tenMH',
                      render: (rowData) => <div style={{ width: 600 }}>{rowData.tenMH}</div>
                    },
                    {
                      title: 'Điểm tổng kết', field: 'diemThi', type: 'numeric', align: 'center',
                      render: (rowData) => <div style={{ width: 250 }}>{rowData.diemThi}</div>
                    },
                  ]}
                  localization={localizationStyle}
                >
                </MaterialTable>
              </>
            )
          }}
          components={{
            Toolbar: props => (
              <div>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Chọn khóa học</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={select}
                        onChange={handleChange}
                        label="Chọn khóa học"
                      >
                        {comboxboxKhoaHoc.map((value) => (
                          <MenuItem key={value.id} value={value.id} >
                            { value.tenKH}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          localization={localizationStyle}
          options={optionsStyle}
        >
        </MaterialTable>}
      <ToastContainer />
    </>
  );

}
