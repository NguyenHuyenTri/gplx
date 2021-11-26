import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import { Button, makeStyles, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { GetComboboxHangDaoTaoRequest, createHangDaoTaoRequest } from '../../../reducers/quan-tri/HangDaoTao/HangDaoTaoAction'

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
    marginTop: theme.spacing(20),
  },
  formText: {
    marginTop: theme.spacing(2),
    marginRight: 20,
    fullWidth: true,
  }
}));



const AddHangDaoTao = (props) => {

  const { closeCreate, getIdDaoTao, selectId } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [tenHang, setTenHang] = useState('');
  const [soVBPL, setSoVBPL] = useState('')
  const [tuoiHV, setTuoiHV] = useState('')
  const [thamNien, setThamNien] = useState('')
  const [kmLaiXe, setKmLaiXe] = useState('')
  const [moTa, setMota] = useState('')
  const [thoiGianDT, setThoiGianDT] = useState('')
  const [ghiChu, setGhiChu] = useState('')
  const [select, setSelect] = useState(selectId)

  const comboboxGPLX = useSelector((state) => _get(state, 'hangDaoTao.comboboxHDT', []));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tenHang === '' || tuoiHV === 0 || thamNien === '' || thoiGianDT === 0 || select === ''
      || tuoiHV === '' || kmLaiXe === '' || thoiGianDT === ''
    ) {

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

      submitCreate(data);
    }
  }


  const submitCreate = async (values) => {
    try {
      await dispatch(createHangDaoTaoRequest(values));
      alertSuccess('Thêm hạng đạo tạo thành công!');
      if (select !== '') {
        getIdDaoTao(select)
        setTimeout(() => closeCreate(), 1100);

      }

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
    dispatch(GetComboboxHangDaoTaoRequest());
  }, []);

  const close = () => {
    closeCreate();
  }

  return (
    <>
      <div className="card">
        <div className="card-header"><b>Thêm hạng đào tạo</b></div>
        <div className="card-body">
          <React.Fragment>
            <Paper>
              <form onSubmit={handleSubmit} className={classes.form}>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        multiline
                        fullWidth
                        autoComplete='family-name'
                        label='Tên hạng đào tạo'
                        value={tenHang}
                        onChange={e => setTenHang(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
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
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 12 }}
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


                <Grid container spacing={1}>
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
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                  </Grid>
                  <Grid item xs={12} item xs={6} >
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
                        {comboboxGPLX.map((value) => (
                          <MenuItem key={value.id} value={value.id} >
                            {value.tenHang}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>

                </Grid>

                <Grid container spacing={2}>
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

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Typography align='center'>
                      <Button variant='contained' color="secondary" type='submit' size='large' >
                        Lưu
                                    </Button>
                      {' '}
                      <Button variant='contained' color='primary' onClick={close} size='large'>
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

AddHangDaoTao.propTypes = {};

export default AddHangDaoTao;
