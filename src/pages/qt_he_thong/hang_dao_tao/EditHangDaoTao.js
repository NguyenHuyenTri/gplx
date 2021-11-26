import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { Button, makeStyles, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import {updateHangDaoTaoRequest } from '../../../reducers/quan-tri/HangDaoTao/HangDaoTaoAction'
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import 'mdbreact/dist/css/mdb.css';

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
    marginTop: theme.spacing(2),
    marginRight: 20,
    fullWidth: true,
  }
}));



const EditHangDaoTao = (props) => {

  const {closeUpdate,data,combobox,getIdDaoTao} =props;

  console.log(data)

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tenHang, setTenHang] = useState('');
  const [soVBPL, setSoVBPL] = useState('')
  const [tuoiHV, setTuoiHV] = useState(0)
  const [thamNien, setThamNien] = useState(0)
  const [kmLaiXe, setKmLaiXe] = useState(0)
  const [moTa, setMota] = useState('')
  const [thoiGianDT, setThoiGianDT] = useState(0)
  const [ghiChu, setGhiChu] = useState('')
  const [select, setSelect] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    if (tenHang === '' || tuoiHV === 0 || thamNien === 0, kmLaiXe === 0, thoiGianDT === 0, select === '') {

    } else if (tuoiHV === 0) {

    } else {
      const data = {
        "tenHang": tenHang,
        "soVBPL": soVBPL,
        "tuoiHV": tuoiHV,
        "thamNien": thamNien,
        "kmLaiXe": kmLaiXe,
        "moTa": moTa,
        "thoiGianDT": thoiGianDT,
        "ghiChu": ghiChu,
        "hangGPLX": select
      }
      updateSubmit(data);
    }
  }


  const updateSubmit = async (values) => {
    try {
      await dispatch(updateHangDaoTaoRequest(values,data.id));
      getIdDaoTao(select)
      alertSuccess('Cập nhật hạng đạo tạo thành công!');
      setTimeout(() => closeUpdate(), 1100);
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
    if(typeof data.hangGPLX !== 'undefined') {
      setTenHang(data.tenHang)
      setSoVBPL(data.soVBPL)
      setTuoiHV(data.tuoiHV)
      setThamNien(data.thamNien)
      setKmLaiXe(data.kmLaiXe)
      setMota(data.moTa)
      setThoiGianDT(data.thoiGianDT)
      setGhiChu(data.ghiChu)
      setSelect(data.hangGPLX.id)
    }
  }, [data]);

 

  return (
    <>
      <div className="card">
        <div className="card-header"><b>Cập nhật hạng đào tạo</b></div>
        <div className="card-body">
          <React.Fragment>
            <Paper>
              <form onSubmit={handleSubmit} className={classes.form}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        multiline
                        fullWidth
                        autoComplete='family-name'
                        label='Tên Hạng'
                        value={tenHang}
                        onChange={e => setTenHang(e.target.value)}
                      />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        fullWidth
                        autoComplete='family-name'
                        label='Số VBPL'
                        value={soVBPL}
                        onChange={e => setSoVBPL(e.target.value)}
                      />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Tuổi học viên'
                        value={tuoiHV}
                        onChange={e => setTuoiHV(e.target.value)}
                        min="1" max="5"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                          { min: 12, max: 100 }
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
                        label='Thâm niên'
                        value={thamNien}
                        onChange={e => setThamNien(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Km lái xe'
                        value={kmLaiXe}
                        onChange={e => setKmLaiXe(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        fullWidth
                        autoComplete='family-name'
                        label='Mô tả'
                        value={moTa}
                        onChange={e => setMota(e.target.value)}
                      />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        label='Thời gian đào tạo'
                        value={thoiGianDT}
                        onChange={e => setThoiGianDT(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                          { min: 0}
                        }
                      />
                    </Grid>
                    <Grid item xs={6} >
                    <FormControl variant="outlined" className={classes.formText} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Hạng giấy phép lái xe *</InputLabel>
                      <Select
                        required
                        margin="normal"
                        variant="outlined"
                        multiline
                        label='Hạng giấy phép lái xe *'
                        value={select}
                        onChange={(e) => setSelect(e.target.value)}
                      >
                        {combobox.map((value) => (
                          <MenuItem key={value.id} value={value.id} >
                            {value.tenHang}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
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
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Typography align='center'>
                    <Button variant='contained' color="secondary" type='submit' size='large' >
                      Lưu
                                    </Button>
                    {' '}
                    <Button variant='contained' color='primary' onClick={closeUpdate} size='large'>
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

EditHangDaoTao.propTypes = {};

export default EditHangDaoTao;
