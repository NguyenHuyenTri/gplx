import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createHangGPLXRequest } from '../../../reducers/quan-tri/HangGPLX/HangGPLXAction';
import { Button, makeStyles, Paper, TextField, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
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
    marginRight: 20,
    fullWidth: true,
  }
}));
const AddHangGPLX = () => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [tenHang, setTenHang] = useState('');
  const [tenHangEN, setTenHangEN] = useState('');
  const [hanSuDung, setHanSuDung] = useState('');
  const [diemDatSH, setDiemDatSH] = useState('');
  const [moTa, setMoTa] = useState('');
  const [ghiChu, setGhiChu] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (tenHang === '' || tenHangEN === '' || hanSuDung === 0 ||hanSuDung==='') {
    } else {
      const data = {
        "tenHang": tenHang,
        "tenHangEN": tenHangEN,
        "hanSuDung": hanSuDung,
        "moTa": moTa,
        "ghiChu": ghiChu,
        "diemDatSH": diemDatSH===''?0:diemDatSH
      }
      submitCreate(data);
    }
  }

  const submitCreate = async (values) => {
    try {
      await dispatch(createHangGPLXRequest(values));
      alertSuccess('Thêm hạng giấy phép lái xe thành công!');
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

  return (
    <>
      <>
        <div className="card">
          <div className="card-header"><b>Thêm hạng giấy phép lái xe</b></div>
          <div className="card-body">
            <React.Fragment>
              <Paper>
                <form onSubmit={handleSubmit} className={classes.form}>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
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
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          variant="outlined"
                          margin="normal"
                          multiline
                          fullWidth
                          label='Tên hạng EN'
                          autoComplete='family-name'
                          value={tenHangEN}
                          onChange={e => setTenHangEN(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label='Hạn sử dụng (năm)'
                        value={hanSuDung}
                        onChange={e => setHanSuDung(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        autoComplete='family-name'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                        { min: 1}
                      }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label='Điểm đạt sát hạch lý thuyết'
                        value={diemDatSH}
                        onChange={e => setDiemDatSH(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        autoComplete='family-name'
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
                          label='Mô tả'
                          value={moTa}
                          onChange={e => setMoTa(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          multiline
                          autoComplete='family-name'
                          label='Ghi Chú '
                          fullWidth
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
    </>
  );
};

AddHangGPLX.propTypes = {};

export default AddHangGPLX;
