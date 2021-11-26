import React, { useEffect, useState, forwardRef, useRef } from 'react';
import MaterialTable, { MTableToolbar, MTableAction } from 'material-table'
import { FormControl, InputLabel, Select, MenuItem, Tooltip, IconButton, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import {
  GetAllComboboxKySatHachRequest, getKetQuaSatHachByIdRequest,
  updateKetQuaSatHachRequest, getKetDiemThiLyThuyetSatHachRequest
} from '../../../../reducers/sat-hach/KetQuaSatHach/KetQuaSatHachAction'
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Check, Clear, Add } from '@material-ui/icons';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemDiemSatHach from './ThemDiemSatHach';
import './test.css'
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [listCombobox, setListCombobox] = React.useState([]);
  const [select, setSelect] = useState();
  const dispatch = useDispatch();
  const combobox = useSelector((state) => _get(state, 'kqSatHach.combobox', []));
  const rows = useSelector((state) => _get(state, 'kqSatHach.ketquasathachs', []));
  const diemDatSatHach = useSelector((state) => _get(state, 'kqSatHach.diemLyThuyet', []));

  const [show, setShow] = useState(false);
  const [addData, setAddData] = useState();


  const onClose = () => {
    setShow(false)
  }

  const setOpen = (value) => {
    setAddData(value)
    setShow(true)
  }


  const handleChange = (event) => {
    setSelect(event.target.value);
    getKQ(event.target.value);
    diemKQLyThuyet(event.target.value)
  };

  const getKQ = async (id) => {
    try {
      await dispatch(getKetQuaSatHachByIdRequest(id));
    } catch (error) {
      alert(error);
    }
  }

  const diemKQLyThuyet = async (id) => {
    try {
      await dispatch(getKetDiemThiLyThuyetSatHachRequest(id));
    } catch (error) {
      alert(error);
    }
  }



  useEffect(() => {
    dispatch(GetAllComboboxKySatHachRequest());
  }, []);

  useEffect(() => {
    setListCombobox(combobox);
    if (combobox.length !== 0) {
      setSelect(combobox[0].id);
      getKQ(combobox[0].id);
      diemKQLyThuyet(combobox[0].id)
    }
  }, [combobox]);


  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      hoTen: rows.hoTen,
      ngaySinh: moment(rows.ngaySinh).format("DD/MM/YYYY"),
      soCMND: rows.soCMND,
      soDT: rows.soDT,
      diaChi: rows.diaChi !== null ? rows.diaChi.tenDayDu : '',
      tenHang: rows.satHach.hangGPLX.tenHang,
      ngaySatHach: moment(rows.satHach.ngaySatHach).format("DD/MM/YYYY"),
      ketQuaSHs: rows.ketQuaSHs != null ? sortKetQuaSatHach(rows.ketQuaSHs) : [],
    }));

  useEffect(() => {
    dispatch(GetAllComboboxKySatHachRequest());

  }, []);

  const tableIcons = {
    Edit: forwardRef((props, ref) => <button type="button" className='btn btn-primary px-3' style={{ borderRadius: "0px" }}>
      <i className='fas fa-pencil-alt' style={{ fontSize: 16 }} aria-hidden="true"></i></button>),
    Delete: forwardRef((props, ref) => <Delete style={{ color: '#ff1744' }} {...props} />),
    Clear: forwardRef((props, ref) => <Clear style={{ color: '#616161' }} {...props} />),
    Check: forwardRef((props, ref) => <Check style={{ color: '#4caf50' }} {...props} />),
    Add: forwardRef((props, ref) => <Add style={{ color: '#4caf50' }} {...props} />),
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


  const handleUpdate = async (values) => {
    try {
      await dispatch(updateKetQuaSatHachRequest(values));
      await getKQ(select);
      onClose();
      alertSuccess('Thêm kết quả sát hạch thành công!');
    } catch (error) {
      alert(error.response.data?.message);
    }
  };


  function sortKetQuaSatHach(arrays) {
    if (arrays !== null) {
      arrays.sort((a, b) => (a.lanThi > b.lanThi) ? 1 : ((b.lanThi > a.lanThi) ? -1 : 0));

    }
    return arrays;
  }

  return (
    <>
      <div style={{ width: '100%' }}>
        {
          show ? <ThemDiemSatHach onClose={onClose} data={addData} handleUpdate={handleUpdate}
            diemDatSatHach={diemDatSatHach}
          /> :
            <MaterialTable style={{ width: '100%' }}
              title='Kết quả sát hạch'
              data={result}
              icons={tableIcons}
              columns={[
                {
                  title: 'Tên học viên', field: 'hoTen', align: 'center', cellStyle: { padding: '5px' },
                  render: rowdata => <div style={{ width: 150 }}>{rowdata.hoTen}</div>
                },
                {
                  title: 'Ngày sinh', field: 'ngaySinh', align: 'center', cellStyle: { padding: '5px' },
                  render: rowdata => <div style={{ width: 120 }}>{rowdata.ngaySinh}</div>,
                },
                {
                  title: 'Số CMND/HC', field: 'soCMND', align: 'center', cellStyle: { padding: '5px' },
                  render: rowdata => <div style={{ width: 120 }}>{rowdata.soCMND}</div>,
                },
                {
                  title: 'Số điện thoại', field: 'soDT', align: 'center', cellStyle: { padding: '5px' },
                  render: rowdata => <div style={{ width: 120 }}>{rowdata.soDT}</div>,
                },
                {
                  title: 'Địa chỉ', field: 'diaChi', align: 'center', cellStyle: { padding: '5px' },
                  render: rowdata => <div style={{ width: '250px' }}>{rowdata.diaChi}</div>,
                },
                {
                  title: 'Thao tác', field: 'thaoTac', align: 'center', cellStyle: { padding: '5px' },
                  render: rowdata => <Tooltip style={{ width: '50px' }}
                    title={`Thêm điểm sát hạch cho ${rowdata.hoTen}`}>
                    <IconButton onClick={() => setOpen(rowdata)} >
                      <Add color='primary' /></IconButton>
                  </Tooltip>
                }
              ]}
              detailPanel={
                [
                  {
                    tooltip: 'Chi tiết',
                    render: rowData => {
                      if (rowData.ketQuaSHs.length === 0) {
                        return <div style={{
                          textAlign: 'center', flexDirection: 'column', display: 'flex',
                          justifyContent: 'center', height: 60
                        }}>
                          Chưa có điểm sát hạch thí sinh {rowData.hoTen}
                        </div>;
                      }
                      return (
                        <div style={{ width: '100%' }}>

                          <MaterialTable style={{ width: '100%' }}
                            data={rowData.ketQuaSHs.map((rows, index) => (
                              {
                                i: index + 1,
                                idThiSinh: rowData.id,
                                tenHang: rowData.tenHang,
                                lanThi: rows.lanThi,
                                diemLyThuyet: rows.diemLyThuyet,
                                diemTH1: rows.diemTH1,
                                diemTH2: rows.diemTH2,
                                ketQuaSH: rows.ketQuaSH,
                                ngaySatHach: rowData.ngaySatHach
                              }))}
                            icons={tableIcons}
                            options={{
                              actionsColumnIndex: -1,
                              toolbar: false,
                              paging: false,
                              actionsCellStyle: {
                                minWidth: 120,
                                maxWidth: 120,
                                whiteSpace: 'nowrap',
                              },
                              sorting: false,
                              paging: false,
                              fixedColumns: {
                                left: 0,
                                right: 0
                              }
                            }}
                            editable={{
                              onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                  let ketqua = '';
                                  if (isNaN(newData.diemLyThuyet) || isNaN(newData.diemTH1) || isNaN(newData.diemTH2)) {
                                    alert('Không được để trống')
                                    resolve();
                                  } else {
                                    setTimeout(() => {
                                      if (newData.diemLyThuyet >= diemDatSatHach.diemdatSH && newData.diemTH1 >= 80 && newData.diemTH2 >= 80) {
                                        ketqua = 'Đạt';
                                      } else {
                                        ketqua = 'Không Đạt';
                                      }
                                      const dataUpdate = {
                                        "thiSinh": newData.idThiSinh,
                                        "lanThi": newData.lanThi,
                                        "diemLyThuyet": newData.diemLyThuyet,
                                        "diemTH1": newData.diemTH1,
                                        "diemTH2": newData.diemTH2,
                                        "ketQuaSH": ketqua
                                      }
                                      handleUpdate(dataUpdate);
                                      resolve();
                                    }, 1000);
                                  }
                                }),
                            }}
                            columns={[
                              {
                                title: 'Hạng GPLX', field: 'tenHang', editable: 'never',
                                render: rowdata => <div style={{ width: '120px' }}>{rowdata.tenHang}</div>
                              },
                              {
                                title: 'Điểm lý thuyết', field: 'diemLyThuyet', align: 'center', type: 'numeric',
                                render: rowdata => <div style={{ width: '120px' }}>{rowdata.diemLyThuyet}</div>
                              },
                              {
                                title: 'TH lái xe trong hình', field: 'diemTH1', type: 'numeric', align: 'center',
                                render: rowdata => <div style={{ width: '130px' }}>{rowdata.diemTH1}</div>
                              },
                              {
                                title: 'TH lái xe trên đường', field: 'diemTH2', type: 'numeric', align: 'center',
                                render: rowdata => <div style={{ width: '130px' }}>{rowdata.diemTH2}</div>
                              },
                              {
                                title: 'Lần thi', field: 'lanThi', editable: 'never', align: 'center',
                                render: rowdata => <div style={{ width: '120px' }}>{rowdata.lanThi}</div>
                              },
                              {
                                title: 'Ngày sát hạch', field: 'ngaySatHach', align: 'center', editable: 'never',
                                render: rowdata => <div style={{ width: '140px' }}>{rowdata.ngaySatHach}</div>
                              },
                              {
                                title: 'Kết Quả', field: 'ketQuaSH', editable: 'never', align: 'center',
                                render: rowdata => <div style={{ width: '120px' }}>{rowdata.ketQuaSH}</div>
                              },
                            ]}
                            localization={localizationStyle}
                          >
                          </MaterialTable>
                        </div>
                      )
                    }
                  }
                ]}
              components={{
                Toolbar: props => (
                  <div>
                    <div style={{ width: '20%' }} >
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Chọn kì sát hạch</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={select}
                          onChange={handleChange}
                          label="Chọn kì sát hạch"
                        >
                          {listCombobox.map((value) => (
                            <MenuItem key={value.id} value={value.id} >
                              {value.kySatHach}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <MTableToolbar {...props} />
                  </div>
                ),
              }}
              localization={localizationStyle}
              options={options}
            />
        }
      </div>
      <ToastContainer />
    </>
  );
}

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
    labelRowsSelect: 'Dòng'
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
    editTooltip: 'Cập nhật kết quả sát hạch',
  }
};

const options = {
  search: true,
  headerStyle: {
    backgroundColor: '#01579b',
    color: '#FFF',
    whiteSpace: 'nowrap'
  },
  addRowPosition: 'first',
  rowStyle: {
    backgroundColor: '#EEE',
  },
}