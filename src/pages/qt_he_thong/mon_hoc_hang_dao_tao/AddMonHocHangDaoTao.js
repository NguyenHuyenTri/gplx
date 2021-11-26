import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import { Button, makeStyles, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { GetComboboxMonHocRequest, createHangDaoTaoMonHocRequest } from '../../../reducers/quan-tri/HangDaoTaoMonHoc/HangDaoTaoMonHocAction';

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

const AddMonHocHangDaoTao = () => {


  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  let query = window.location.pathname.split("/");
  let id = query[query.length - 1];

  const comboboxMonHoc = useSelector((state) => _get(state, 'hangDaoTaoMonHoc.monHocs', []));

  const [lyThuyet, setLyThuyet] = useState(0)
  const [thucHanhHinh, setThucHanhHinh] = useState(0)
  const [thucHanhDuong, setThucHanhDuong] = useState(0)
  const [kiemTra, setKiemTra] = useState(0)
  const [ghiChu, setGhiChu] = useState('')
  const [tongSoGio, setTongSoGio] = useState(0)
  const [select, setSelect] = useState('')


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
        "ghiChu": ghiChu
      }
      submitCreate(data)
    }
  }

  const submitCreate = async (values) => {
    console.log(values)

    try {
      await dispatch(createHangDaoTaoMonHocRequest(values, id));
      alertSuccess('Thêm môn học thành công!');
      setTimeout(() => handerBack(), 1100);
    } catch (error) {
      alert(error.response.data?.message);
    }
  };

  const handerBack = () => {
    history.goBack();
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
        <div className="card-header"><b>Thêm môn học cho hạng đào tạo</b></div>
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
                  <Grid item xs={12} sm={12}>
                    <Typography align='center'>
                      <Button variant='contained' color="secondary" type='submit' size='large' >
                        Lưu
                                    </Button>
                      {' '}
                      <Button variant='contained' color='primary' onClick={handerBack} size='large'>
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

AddMonHocHangDaoTao.propTypes = {};

export default AddMonHocHangDaoTao;
