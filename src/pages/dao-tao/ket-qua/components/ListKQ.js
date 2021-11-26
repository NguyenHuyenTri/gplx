import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';
import {
  GetAllComboboxKhoaHocRequest, getKetQuaDaoTaoByIdRequest, saveCSVRequest,
  updateKetQuaDaoTaoRequest, getUpdateDateRequest, exportDaoTao,
  GetAllMonHocRequest, GetAllMonHocDaoTaoRequest
}
  from '../../../../reducers/dao-tao/KetQua/KetQuaDaoTaoAction'
import MaterialTable, { MTableToolbar } from 'material-table'
import { FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button, } from '@material-ui/core'
import moment from "moment";
import { useReactToPrint } from 'react-to-print';
import { Link } from "react-router-dom";
import { Edit, Delete, Check, Clear, ExitToApp } from '@material-ui/icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../inbang.css'
import anh from '../maubang.jpg';
import '../css/sheets-of-paper.css';
import UpdateKetQua from './UpdateKetQua';
import DialogFullScreen from './DialogFullScreen'
import axios from 'axios'


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
    editTooltip: 'Chỉnh sửa'
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

export default function ListKQ() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const componentRef = useRef();

  const tableRef = React.createRef();

  const [select, setSelect] = useState('');
  const [print, setPrint] = useState([]);
  const [changeDate, setChangeDate] = useState(false);

  const [show, setShow] = useState(false);
  const [updateData, setUpdateData] = useState();

  const [showKQ, setShowKQ] = useState(false)
  const [listSatHach, setSatHach] = useState()

  const comboxboxKhoaHoc = useSelector((state) => _get(state, 'kqDaoTao.comboboxkhoahoc', []));
  const listmonhocdaotao = useSelector((state) => _get(state, 'kqDaoTao.listmonhocdaotao', []));
  const listmonhoc = useSelector((state) => _get(state, 'kqDaoTao.listmonhoc', []));
  const rows = useSelector((state) => _get(state, 'kqDaoTao.ketquadaotaos', []));
  const [date, setDate] = useState(moment(Date()).format("YYYY-MM-DD"))

  /*
  * Close Update Diem
  */

  const onClose = () => {
    setSatHach([]);
    setShow(false)
    setShowKQ(false)
  }


  /*
  * Open Update Diem
  */

  const setOpen = (value) => {
    setUpdateData(value)
    setShow(true)
  }

  /*
  *  Value select KhoaHoc
  */

  const handleChange = (event) => {
    
    setSelect(event.target.value);
    getHV(event.target.value);
  };


  /*
  * Print
  */

  const handlePrint = useReactToPrint({
    
    content: () => componentRef.current,
  });


  /*
  * Get Hoc Vien and Get All Chung Chi
  */

  const getHV = async (id) => {
    try {
      await dispatch(getKetQuaDaoTaoByIdRequest(id));
      await dispatch(GetAllMonHocRequest(id));
    } catch (error) {
      alert(error.toString());
    }
  }


  const result = rows.map((rows, index) => (
    {
      i: index,
      id: rows.id,
      hoTen: rows.hoTen,
      ngaySinh: moment(rows.ngaySinh).format("DD/MM/YYYY"),
      diaChi: rows.diaChi !== null ? rows.diaChi.tenDayDu : '',
      gioiTinh: rows.gioiTinh,
      diemThiLai: rows.ketQuaDT.length !== 0 ? rows.ketQuaDT[0].diemThiLai : '',
      diemTKKH: rows.ketQuaDT.length !== 0 ? rows.ketQuaDT[0].diemTKKH : '',
      xepLoai: rows.ketQuaDT.length !== 0 ? rows.ketQuaDT[0].xepLoai : '',
      soHieu: rows.ketQuaDT.length !== 0 ? rows.ketQuaDT[0].soHieu : '',
      soCCN: rows.ketQuaDT.length !== 0 ? rows.ketQuaDT[0].soCCN : '',
      monHocs: rows.monHocs,
      ngayTN: rows.ketQuaDT.length !== 0 ? rows.ketQuaDT[0].ngayTN : date,
    }));


  const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit style={{ color: '#448aff', }} {...props} />),
    Delete: forwardRef((props, ref) => <Delete style={{ color: '#ff1744' }} {...props} />),
    Clear: forwardRef((props, ref) => <Clear style={{ color: '#616161' }} {...props} />),
    Check: forwardRef((props, ref) => <Check style={{ color: '#4caf50' }} {...props} />),
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
      await dispatch(updateKetQuaDaoTaoRequest(values));
      getHV(select);
      alertSuccess('Cập nhật kết quả đào tạo thành công!');
      setTimeout(() => {
        onClose();
      }, 1);
    } catch (error) {
      alert(error.response.data?.message);
    }
  };

  const handleChangeDateTT = (event) => {
    setDate(event.target.value)
    setChangeDate(true)
  }

  /**
   * Chuyển Hv sang sát hạch
   */
  const ChuyenSatHach = async (value) => {
    try {
      const data = {
        "hocVien": value
      }
      await dispatch(exportDaoTao(data));
      await dispatch(getKetQuaDaoTaoByIdRequest(select));
      onClose();
      alertSuccess('Chuyển thành công');
    } catch (error) {
      alert(error.response.data?.message);
    }

  }

  const handleDateUpdate = async () => {

    try {
      const data = {
        "ngayTN": date
      }
      await dispatch(getUpdateDateRequest(select, data));
      await dispatch(getKetQuaDaoTaoByIdRequest(select));
      setChangeDate(false)
      alertSuccess('Cập nhật thành công');
    } catch (error) {
      alert(error.response.data?.message);
    }
  };

  useEffect(() => {
    dispatch(GetAllComboboxKhoaHocRequest());
    dispatch(GetAllMonHocDaoTaoRequest());
  }, []);


  useEffect(() => {

    if (comboxboxKhoaHoc.length !== 0) {
      setSelect(comboxboxKhoaHoc[0].id);
      getHV(comboxboxKhoaHoc[0].id);
    }
  }, [comboxboxKhoaHoc]);


  return (
    <>
      {
        showKQ ? <DialogFullScreen onClose={onClose} list={listSatHach} submit={ChuyenSatHach} /> : null
      }
      {show ? <UpdateKetQua onClose={onClose} data={updateData} listmonhocdaotao={listmonhocdaotao}
        listmonhoc={listmonhoc}
        handleUpdate={handleUpdate}
      /> :
        <MaterialTable style={{ width: '100%' }}
          tableRef={tableRef}
          title='Kết quả đào tạo'
          columns={[
            {
              title: 'Tên Học Viên', field: 'showHoTen', editable: 'never',
              render: rowData => <div style={{ width: 180 }}><Link to={`/hoc_vien/chi_tiet_hv/${rowData.id}`} style={{
                paddingTop: 10,
                paddingBottom: 10, textDecoration: 'none',
              }} >{rowData.hoTen}</Link></div>,
              customFilterAndSearch: (term, rowData) => (rowData.hoTen).indexOf(term) != -1
            },
            {
              title: 'Giới tính', field: 'gioiTinh', editable: 'never', align: 'center',
              render: rowdata => <div style={{ width: 50 }}>{rowdata.gioiTinh}</div>
            },
            {
              title: 'Ngày sinh', field: 'ngaySinh', editable: 'never',
              render: rowdata => <div style={{ width: 90 }}>{rowdata.ngaySinh}</div>
            },
            {
              title: 'Địa chỉ', field: 'diaChi', editable: 'never',
              render: rowdata => <div style={{ width: 200 }}>{rowdata.diaChi}</div>
            },
            {
              title: 'Điểm TKKH', field: 'diemTKKH', editable: 'never',
              render: rowdata => <div style={{ width: 30 }}>{rowdata.diemTKKH}</div>
            },
            {
              title: 'Điểm thi lại lý thuyết lần 2', field: 'diemThiLai',
              align: 'center',
              type: 'numeric',
              render: rowdata => <div style={{ width: 30 }}>{rowdata.diemThiLai}</div>
            },
            {
              title: 'Xếp loại', field: 'xepLoai', editable: 'never',
              render: rowdata => <div style={{ width: 100 }}>{rowdata.xepLoai}</div>
            },
            {
              title: 'Số CNN', field: 'soCCN', render: rowdata => <div style={{ width: 120 }}>{rowdata.soCCN}</div>
            },
            {
              title: 'Số hiệu', field: 'soHieu',
              render: rowdata => <div style={{ width: 150 }}>{rowdata.soHieu}</div>
            },
            {
              title: 'Thao Tác', field: 'thaoTac',
              render: rowdata =>
                <button onClick={() => setOpen(rowdata)} type="button" className='btn btn-primary px-3' style={{ borderRadius: "0px" }}>
                  <i className='fas fa-pencil-alt' style={{ fontSize: 16 }} aria-hidden="true"></i></button>
            },
          ]}
          detailPanel={[
            {
              tooltip: 'Chi tiết',
              render: rowData => {
                if (rowData.monHocs.length === 0) {
                  return <div style={{
                    textAlign: 'center', flexDirection: 'column', display: 'flex', marginTop: 13,
                    justifyContent: 'center', height: 50, width: '100%'
                  }}>
                    <p> Chưa có dữ liệu <a onClick={() => setOpen(rowData)} ><strong style={{ color: '#007bff' }}>cập nhật</strong></a></p>

                  </div>;
                }
                return (
                  <div style={{ width: '100%' }}>
                    <MaterialTable style={{ width: '100%' }}
                      data={rowData.monHocs.map((rows, index) => (
                        {
                          i: index + 1,
                          phanLoai: rows.phanLoai === 'Kết quả đào tạo' ? 'Điểm kiểm tra kết thúc khóa học' : 'Điểm tổng kết môn học',
                          tenMH: rows.tenMH,
                          diemThi: rows.diemThi.diem,
                        }))}
                      columns={[
                        {
                          title: 'STT', field: 'i',
                          render: rowdata => <div style={{ width: 300 }}>{rowdata.i}</div>
                        },
                        {
                          title: 'Phân loại', field: 'phanLoai',
                          render: rowdata => <div style={{ width: 450 }}>{rowdata.phanLoai}</div>
                        },
                        {
                          title: 'Tên môn học', field: 'tenMH',
                          render: rowdata => <div style={{ width: 700 }}>{rowdata.tenMH}</div>
                        },
                        {
                          title: 'Điểm tổng kết', field: 'diemThi', align: 'center',
                          render: rowdata => <div style={{ width: 200 }}>{rowdata.diemThi}</div>
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
          icons={tableIcons}
          actions={[
            {
              tooltip: "Tải xuống",
              icon: "save_alt",
              isFreeAction: true,
              onClick: () => {
                if (result.length > 0) {
                  var listId = [];
                  for (var i = 0; i < result.length; i++) {
                        listId.push(result[i].id);  
                  }
                  const dataSubmit = {
                    "khoaHoc": select,
                    "listHV": listId
                  }
                  dispatch(saveCSVRequest(dataSubmit));
                }
              },
            },
            {
              tooltip: "Tải xuống",
              icon: "save_alt",
              onClick: function (evt, data) {
                if (data.length > 0) {
                  var listId = [];
                  for (var i = 0; i < data.length; i++) {
                      listId[i] = data[i].id;
                  }
                  const dataSubmit = {
                    "khoaHoc": select,
                    "listHV": listId
                  }
                  dispatch(saveCSVRequest(dataSubmit));
                }
              },
            },
            {
              tooltip: "In",
              icon: "print",
              isFreeAction: true,
              onClick: async () => {
                axios.get(`daotao/chungchisocap/${select}`)
                .then(function (response) {
                  if (result.length > 0 && response.data.hocViens.length>0) {
                    var listId = [];
                    for (var i = 0; i < result.length; i++) {
                      for (var j = 0; j < response.data.hocViens.length; j++) {
                        if (result[i].id === response.data.hocViens[j].id) {
                          listId.push(response.data.hocViens[j]);
                        }
                      }
                    }
                    setPrint(listId);
                    handlePrint();
                  }
                })
                .catch(function (error) {
                  alert(error.response.data?.message);
                });
              },
            },
            {
              tooltip: "In",
              icon: "print",
              onClick: async function (evt, data) {
                axios.get(`daotao/chungchisocap/${select}`)
                  .then(function (response) {
                    if (data.length > 0 && response.data.hocViens.length > 0) {
                      var listId = [];
                      for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < response.data.hocViens.length; j++) {
                          if (data[i].id === response.data.hocViens[j].id) {
                            listId.push(response.data.hocViens[j]);
                          }
                        }
                      }
                      setPrint(listId);
                      handlePrint();
                    }
                  })
                  .catch(function (error) {
                    alert(error.response.data?.message);
                  });
              },
            }, {
              tooltip: "Chuyển học viên sang sát hạch",
              icon: () => <ExitToApp />,
              isFreeAction: true,
              onClick: () => {
                if (result.length > 0) {
                  for (let i = 0; i < result.length; i++) {
                    tableRef.current.onToggleDetailPanel([result[i].i], rowData => <div></div>)
                  }
                  setSatHach(result)
                  setShowKQ(true)
                }
              }
            },
            {
              tooltip: "Chuyển học viên sang sát hạch",
              icon: () => <ExitToApp />,
              isFreeAction: false,
              onClick: function (evt, data) {

                var listId = [];

                if (data.length > 0) {
                  for (var i = 0; i < data.length; i++) {
                    tableRef.current.onToggleDetailPanel([data[i].i], rowData => <div></div>)
                    listId[i] = data[i];
                  }
                  setSatHach(listId)
                  setShowKQ(true)
                }
              }
            },
          ]}
          data={result}

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
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        variant='outlined'
                        id="date"
                        label="Chọn ngày tốt nghiệp"
                        type="date"
                        value={date}
                        onChange={handleChangeDateTT}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                    {
                      changeDate ? <Button variant="contained" color="primary" size="small" onClick={handleDateUpdate} className={classes.margin}>
                        Cập nhật
                  </Button> : null
                    }
                  </Grid>
                </Grid>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          localization={localizationStyle}
          options={optionsStyle}
        >
        </MaterialTable>
      }

      <div style={{ display: 'none' }}>
            <ComponentToPrint ref={componentRef} data={print} /> 
      </div>
      <ToastContainer />
    </>
  );
}

const formatDateWithModal = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const convertTime = (time, formatType) => {
  return moment(time).locale('en').format(formatType);
}

const ComponentToPrint = React.forwardRef((props, ref) => (
  
  <>
    <Grid item sm={12} ref={ref} >
      {
        props.data.map((value, index) =>
          <>
           <div className='document' >
              <div class="page bang-lai" contenteditable="true">
                {/* <p className='text-center bang-lai' style={{ display: 'block', marginTop: 50 }} > */}
                  {/* <Image src={anh} className='image' /> */}
                  <div class="info">
                    <strong><p className='text ho-va-ten-en'>{removeVietnameseTones(value.hoTen).toUpperCase()}</p></strong>
                    <strong><p className='text ho-va-ten-vn'>{value.hoTen.toUpperCase()}</p></strong>
                    <strong><p className='text hang-gplx-en'>{value.khoaHoc.hangDT.hangGPLX.tenHang.toUpperCase()}</p></strong>
                    <strong><p className='text hang-gplx-vn'>{value.khoaHoc.hangDT.hangGPLX.tenHang.toUpperCase()}</p></strong>
                    <strong><p className='text xep-loai-en'>{value.ketQuaDT[0].xepLoaiEN}</p></strong>
                    <strong><p className='text gioi-tinh-en'>{value.gioiTinh}</p></strong>
                    <strong><p className='text birthday-vn'>{moment(value.ngaySinh).format("DD/MM/YYYY")}</p></strong>
                    <strong><p className='text birthday-en'>{moment(value.ngaySinh).format("DD/MM/YYYY")}</p></strong>
                    <strong><p className='text xep-loai-vn'>{value.ketQuaDT[0].xepLoai}</p></strong>
                    
                      <div className="text format">
                        <p className="format month">{convertTime(value.ketQuaDT[0].ngayTN, "MMMM")}</p>
                        <div>
                          <p className="format date">{convertTime(value.ketQuaDT[0].ngayTN, "DD")}</p>
                          <sup className="format unit">{formatDateWithModal(convertTime(value.ketQuaDT[0].ngayTN, "DD"))}</sup>
                        </div>
                        <p className="format year">{", " + convertTime(value.ketQuaDT[0].ngayTN, "YYYY")}</p>
                      </div>
                   
                    <strong><p className='text date'>{moment(value.ketQuaDT[0].ngayTN).format("DD")}</p></strong>
                    <strong><p className='text month'>{moment(value.ketQuaDT[0].ngayTN).format("MM")}</p></strong>
                    <strong><p className='text year'>{moment(value.ketQuaDT[0].ngayTN).format("YYYY")}</p></strong>
                    <strong><p className='text number-ccn'>{value.ketQuaDT[0].soCCN}</p></strong>
                    <strong><p className='text number-vsccn'>{value.ketQuaDT[0].soCCN}</p></strong>
                    <strong><p className='text so-hieu'>{value.ketQuaDT[0].soHieu}</p></strong>
                    <img className='text anh-the' src={`http://14.241.134.20:8081/${value.hinhAnh.duongDan}`}>
                    </img>
                    <img className='text chu-ki' src='http://14.241.134.20:8081/sigature/chuky.png'>
                    </img>
                  </div>
                {/* </p> */}
              </div>

              {/* <footer className='test' >-</footer> */}
            </div>
          </>

        )
      }


    </Grid>
  </>

));


function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}
