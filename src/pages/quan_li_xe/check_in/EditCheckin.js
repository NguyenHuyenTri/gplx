import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { GetAllSanTapLaiRequest, GetAllXeRequest, getCheckinByIdRequest, updateCheckinRequest } from '../../../reducers/qly-xe/Checkin/CheckinAction';
import moment from 'moment';

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
const EditCheckin = () => {

  let query = window.location.pathname.split("/");
  let id = query[query.length - 1];

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rows = useSelector((state) => _get(state, 'checkin.checkin', []));
  const xeData = useSelector((state) => _get(state, 'checkin.xes', []));
  const sanData = useSelector((state) => _get(state, 'checkin.sanTLs', []));

  const [ngayThang, setNgayThang] = useState('');
  const [gioVaoSan, setGioVaoSan] = useState('');
  const [gioRaSan, setGioRaSan] = useState('');
  const [xe, setXe] = useState('');
  const [sanTapLai, setSanTapLai] = useState('');

  useEffect(() => {
    const fetching = async () => {
      await dispatch(getCheckinByIdRequest(id));
      await dispatch(GetAllXeRequest());
      await dispatch(GetAllSanTapLaiRequest());
  };
  fetching();
  }, []);

  useEffect(() => {
    if (rows!=null ) {
      setNgayThang(rows.ngayThang)
      setGioVaoSan(rows.gioVaoSan === null ? '' : moment(rows.gioVaoSan).format("HH:mm:ss"))
      setGioRaSan(rows.gioRaSan === null ? '' : moment(rows.gioRaSan).format("HH:mm:ss"))
      setXe(rows.xe?.id)
      setSanTapLai(rows.sanTapLai?.id)
    }
}, [rows]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ngayThang === '' || gioVaoSan === '' || gioRaSan === '' || xe === null || sanTapLai === null) {
    } else {
      const data = {
        "ngayThang": ngayThang,
        "gioVaoSan": gioVaoSan,
        "gioRaSan": gioRaSan,
        "xe": xe,
        "sanTapLai": sanTapLai,
      }
      submitUpdate(data);
    }
  }

  const inputPropsRa = {
    step: 1,
    min: gioVaoSan
  }

  const inputPropsVao = {
    step: 1,
  }

  const submitUpdate = async (values) => {
    try {
      await dispatch(updateCheckinRequest(values,id));
      alertSuccess('Cập nhật ngày giờ ra vào thẻ thuê xe thành công!');
      setTimeout(() => handerBack(), 1100);
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

  const handerBack = () => {
    history.goBack();
  };
  
  return (
    <>
      <div className="card">
          <div className="card-header"><b>Cập nhật ngày giờ ra vào của thẻ thuê xe</b></div>
          <div className="card-body">
            <React.Fragment>
              <Paper>
                <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                      <TextField
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={(e) => setNgayThang(e.target.value)}
                        value={ngayThang}
                        label="Ngày tháng"
                        name="ngayThang"
                        type="date"
                      />
                    </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={(e) => setGioVaoSan(e.target.value)}
                      value={gioVaoSan}
                      label="Giờ vào sân"
                      name="gioVaoSan"
                      type="time"
                      inputProps={inputPropsVao}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={(e) => setGioRaSan(e.target.value)}
                      value={gioRaSan}
                      label="Giờ ra sân"
                      name="gioRaSan"
                      type="time"
                      inputProps={inputPropsRa}
                    />
                  </Grid>
                </Grid>

                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" className={classes.formText} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Xe cho thuê *</InputLabel>
                      <Select
                        required
                        margin="normal"
                        variant="outlined"
                        multiline
                        label='Xe cho thuê *'
                        value={xe}
                        onChange={(e) => setXe(e.target.value)}
                      >
                        {xeData.map((value) => (
                          <MenuItem key={value.id} value={value.id} >
                            {value.bienSoXe}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" className={classes.formText} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Sân tập lái *</InputLabel>
                      <Select
                        required
                        margin="normal"
                        variant="outlined"
                        multiline
                        label='Sân tập lái *'
                        value={sanTapLai}
                        onChange={(e) => setSanTapLai(e.target.value)}
                      >
                        {sanData.map((value) => (
                          <MenuItem key={value.id} value={value.id} >
                            {value.tenSan}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  </Grid>
               
                  <Grid container spacing={3} style={{ textAlign: 'center' }}>
                    <Grid item xs={12} sm={12}>
                      <Button variant='contained' color="secondary" type='submit' size='large' >
                        Lưu
                      </Button>
                      {' '}
                      <Button variant='contained' color='primary' onClick={handerBack} size='large'>
                        Hủy
                      </Button>
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

EditCheckin.propTypes = {};

export default EditCheckin;
