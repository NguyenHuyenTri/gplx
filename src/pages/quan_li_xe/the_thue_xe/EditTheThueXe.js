import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles, Paper, TextField, Grid} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { get as _get } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { getTheThueXeByIdRequest, updateTheThueXeRequest } from '../../../reducers/qly-xe/TheThueXe/TheThueXeAction';


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
const EditTheThueXe = () => {

  let query = window.location.pathname.split("/");
  let id = query[query.length - 1];

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rows = useSelector((state) => _get(state, 'theThueXe.thethuexe', []));

  const [maThe, setMaThe] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [soDT, setSoDT] = useState('');
  const [soTien, setSoTien] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  useEffect(() => {
    const fetching = async () => {
      await dispatch(getTheThueXeByIdRequest(id));
  };
  fetching();
  }, []);

  useEffect(() => {
    if (rows!=null ) {
      setMaThe(rows.maThe)
      setHoTen(rows.hoTen)
      setSoDT(rows.soDT)
      setSoTien(rows.soTien)
      setGhiChu(rows.ghiChu)
    }
}, [rows]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (maThe !== '' || hoTen !== '' || soDT !== '' || soTien !== '') {
      if(maThe === rows.maThe) {
        const data = {
          "hoTen": hoTen,
          "soDT": soDT,
          "soTien": soTien,
          "ghiChu": ghiChu,
        }
        submitUpdate(data);
      } else {
        const data = {
          "maThe": maThe,
          "hoTen": hoTen,
          "soDT": soDT,
          "soTien": soTien,
          "ghiChu": ghiChu,
        }
        submitUpdate(data);
      }
    }
  }

  const submitUpdate = async (values) => {
    try {
      await dispatch(updateTheThueXeRequest(values,id));
      alertSuccess('C????p nh????t th??? thu?? xe tha??nh c??ng!');
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
        <div className="card">
          <div className="card-header"><b>C????p nh????t th??? thu?? xe </b></div>
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
                          label='M?? th???'
                          value={maThe}
                          onChange={e => setMaThe(e.target.value)}
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
                          label='T??n ch??? th???'
                          autoComplete='family-name'
                          value={hoTen}
                          onChange={e => setHoTen(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label='S??? ??i???n tho???i'
                        value={soDT}
                        onChange={e => setSoDT(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        autoComplete='family-name'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' },
                        { min: 1 }
                      }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label='S??? ti???n'
                        value={soTien}
                        onChange={e => setSoTien(e.target.value)}
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
                          autoComplete='family-name'
                          label='Ghi Chu?? '
                          fullWidth
                          value={ghiChu}
                          onChange={e => setGhiChu(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} style={{ textAlign: 'center' }}>
                    <Grid item xs={12} sm={12}>
                      <Button variant='contained' color="secondary" type='submit' size='large' >
                        L??u
                      </Button>
                      {' '}
                      <Button variant='contained' color='primary' onClick={handerBack} size='large'>
                        H???y
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

EditTheThueXe.propTypes = {};

export default EditTheThueXe;
