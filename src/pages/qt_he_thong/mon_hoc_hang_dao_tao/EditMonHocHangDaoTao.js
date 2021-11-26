import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import { Button, makeStyles, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { GetComboboxMonHocRequest, updateHangDaoTaoMonHocRequest } from '../../../reducers/quan-tri/HangDaoTaoMonHoc/HangDaoTaoMonHocAction';

const useStyles = makeStyles((theme) => ({

  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
  },
  formControl: {
    marginTop: theme.spacing(3),
    marginLeft: 10,
    marginBottom: theme.spacing(3),
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(10),
  },
  formText: {
    marginRight: 20,
    fullWidth: true,
  }
}));

const EditMonHocHangDaoTao = (props) => {

  const { show, dataUpdate, idDaoTao } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  let query = window.location.pathname.split("/");
  let id = query[query.length - 1];

  const comboboxMonHoc = useSelector((state) => _get(state, 'hangDaoTaoMonHoc.monHocs', []));

  const [lyThuyet, setLyThuyet] = useState(dataUpdate.lyThuyet)
  const [thucHanhHinh, setThucHanhHinh] = useState(dataUpdate.thucHanhHinh)
  const [thucHanhDuong, setThucHanhDuong] = useState(dataUpdate.thucHanhDuong)
  const [kiemTra, setKiemTra] = useState(dataUpdate.kiemTra)
  const [ghiChu, setGhiChu] = useState(dataUpdate.ghiChu)
  const [trangThai, setTrangThai] = useState(dataUpdate.trangThai === 'Hiệu lực' ? true : false);
  const [tongSoGio, setTongSoGio] = useState(dataUpdate.tongSoGio)
  const [select, setSelect] = useState(dataUpdate.id)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (select === '') {
    } else {
      const data = {
        "monHoc": select,
        "tongSoGio": tongSoGio,
        "lyThuyet": lyThuyet,
        "thucHanhHinh": thucHanhHinh,
        "thucHanhDuong": thucHanhDuong,
        "kiemTra": kiemTra,
        "ghiChu": ghiChu,
        "trangThai": trangThai
      }
      console.log(data)

      submitUpdate(data)
    }
  }

  const submitUpdate = async (values) => {
    console.log(values)

    try {
      await dispatch(updateHangDaoTaoMonHocRequest(values, idDaoTao));
      alertSuccess('Cập nhật môn học thành công!');
      setTimeout(() => show(), 1100);
    } catch (error) {
      alert(error.response.data?.message);
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

  useEffect(() => {
    dispatch(GetComboboxMonHocRequest());
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header"><b>Cập nhật môn học cho hạng đào tạo</b></div>
        <div className="card-body">
          <React.Fragment>
            <Paper>
              <form onSubmit={handleSubmit} className={classes.form}>

                <Grid container spacing={3}>
                  <Grid item xs={12} >
                    <FormControl variant="outlined" className={classes.formText} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Tên môn học *</InputLabel>
                      <Select
                        required
                        margin="normal"
                        variant="outlined"
                        multiline
                        label='Tên môn học *'
                        value={select}
                        onChange={(e) => setSelect(e.target.value)}
                        inputProps={{
                          readOnly: true,
                        }}
                      >
                        {comboboxMonHoc.map((value) => (
                          <MenuItem key={value.id} value={value.id} >
                            {value.tenMH}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Tổng số giờ'
                        value={tongSoGio}
                        onChange={e => setTongSoGio(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                          { min: 0 }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type="number"
                      label='Lý thuyết'
                      value={lyThuyet}
                      onChange={e => setLyThuyet(e.target.value)}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                        { min: 0 }
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Thực hành hình'
                        value={thucHanhHinh}
                        onChange={e => setThucHanhHinh(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                          { min: 0 }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Thực hành đường'
                        value={thucHanhDuong}
                        onChange={e => setThucHanhDuong(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                          { min: 0 }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Kiểm tra'
                        value={kiemTra}
                        onChange={e => setKiemTra(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                          { min: 0 }
                        }
                      />
                    </Grid>
                </Grid>
              
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        fullWidth
                        autoComplete='family-name'
                        label='Ghi chú'
                        value={ghiChu}
                        onChange={e => setGhiChu(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} >
                    <FormControl variant="outlined" className={classes.formText} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Trạng thái *</InputLabel>
                      <Select
                        required
                        margin="normal"
                        variant="outlined"
                        label='Trạng thái *'
                        value={trangThai}
                        onChange={(e) => setTrangThai(e.target.value)}
                      >
                        <MenuItem value={true} >
                          Hiệu lực
                                                </MenuItem>
                        <MenuItem value={false} >
                          Chưa hiệu lực
                                                </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                        <Typography align='center'>
                        <Button variant='contained' color="secondary" type='submit' size='large' >
                      Lưu
                                    </Button>
                    {' '}
                    <Button variant='contained' color='primary' onClick={show} size='large'>
                      Hủy
                                    </Button>
                        </Typography>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </React.Fragment>

        </div>
      </div>
      <ToastContainer />
    </>
  );
};

EditMonHocHangDaoTao.propTypes = {};

export default EditMonHocHangDaoTao;
