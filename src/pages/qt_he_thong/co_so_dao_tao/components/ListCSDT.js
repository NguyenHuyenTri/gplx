import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { get as _get } from 'lodash';
import { Grid, Button, Typography, Fab, TextField } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { GetAllCoSoDaoTaoRequest, updateCoSoDaoTaoRequest } from "../../../../reducers/quan-tri/CoSoDaoTao/CoSoDaoTaoAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF'
  },
  text: {
    marginLeft: 20
  }
}));


export default function ListCoSoDaoTao(props) {
  const classes = styles();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(true);
  const [data, setData] = useState([]);
  const rows = useSelector((state) => _get(state, "csdt.cosodaotaos", []));

 
  const [tenDV, setTenDV] = useState('');
  const [tenCQQL, setTenCQQL] = useState('');
  const [luuLuongDT, setLuuLuongDT] = useState('');
  const [lanhDao, setLanhDao] = useState('');
  const [soGP, setSoGP] = useState('');
  const [ngayGP, setNgayGP] = useState('');
  const [ngayHHGP, setNgayHHGP] = useState('');
  const [hangGPLX, setHangGPLX] = useState('');
  const [diadiemDT, setDiadiemDT] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [soDT, setSoDT] = useState('');
  const [maSoThue, setMaSoThue] = useState('')


  useEffect(() => {
    dispatch(GetAllCoSoDaoTaoRequest());
  }, []);

  useEffect(async () => {
    setData(rows);
    resetData();
  }, [rows]);

  const resetData = () => {
    if(rows!=null){
      setGhiChu(rows.ghiChu)
      setTenDV(rows.tenDV)
      setTenCQQL(rows.tenCQQL)
      setLuuLuongDT(rows.luuLuongDT)
      setLanhDao(rows.lanhDao)
      setSoDT(rows.soDT)
      setSoGP(rows.soGP)
      setNgayGP(rows.ngayGP)
      setNgayHHGP(rows.ngayHHGP)
      setHangGPLX(rows.hangGPLX)
      setDiadiemDT(rows.diadiemDT)
      setDiaChi(rows.diaChi)
      setMaSoThue(rows.maSoThue)
    }
  }

  const toggle = () => {
    setIsShow(!isShow)
    resetData();
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


  const submitUpdate = async (e) => {
    e.preventDefault();
    if (tenDV == '' || tenCQQL == '' || diaChi == ''
      || luuLuongDT == '' || lanhDao == '' || soGP == 'soGP' || ngayGP == '' || ngayHHGP == '' || diadiemDT == ''
    ) {
    } else {
      const data = {
        "tenDV": tenDV,
        "tenCQQL": tenCQQL,
        "diaChi": diaChi,
        "soDT": soDT,
        "maSoThue": maSoThue,
        "luuLuongDT": luuLuongDT,
        "lanhDao": lanhDao,
        "soGP": soGP,
        "ngayGP": ngayGP,
        "ngayHHGP": ngayHHGP,
        "hangGPLX": hangGPLX,
        "diadiemDT": diadiemDT,
        "ghiChu": ghiChu,
      }
      try {
        await dispatch(updateCoSoDaoTaoRequest(data));
        await dispatch(GetAllCoSoDaoTaoRequest());
        setIsShow(true);
        alertSuccess('C????p nh????t c?? s???? ??a??o ta??o tha??nh c??ng!');
      } catch (error) {
        alert(error.response.data?.message);
      };
    }
   
  }
  
  return (
    <>
    {
      rows!==null ?
    <>
      <div className={classes.root} autoComplete="off">
        <form onSubmit={submitUpdate}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography align='center'  >
                <h2>Th??ng tin chi ti???t c?? s??? ????o t???o</h2>
              </Typography >
            </Grid>


            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p >M?? c?? s??? ????o t???o : </p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                value={rows.maDV}
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className={classes.text}  >Ma?? s???? thu????:</p>
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                value={maSoThue}
                onChange={(e) => setMaSoThue(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2} >
              <p className={classes.paper}>{isShow ? 'T??n CQ QL tr???c ti???p :':'T??n CQ QL tr???c ti???p *'} </p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                required
                value={tenCQQL}
                onChange={(e) => setTenCQQL(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className={classes.text}  >{isShow ? 'L??u l??????ng ??a??o ta??o ':'L??u l??????ng ??a??o ta??o *'} </p>
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                required
                value={luuLuongDT}
                onChange={(e) => setLuuLuongDT(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p className={classes.paper}>{isShow ? 'T??n c?? s???? ??a??o ta??o :':'T??n c?? s???? ??a??o ta??o *'}</p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                required
                multiline
                value={tenDV}
                onChange={(e) => setTenDV(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className={classes.text}  >{isShow ? 'T??n la??nh ??a??o :':'T??n la??nh ??a??o *'}</p>
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                required
                value={lanhDao}
                onChange={(e) => setLanhDao(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p className={classes.paper}>{isShow ? 'S???? gi????y phe??p :':'S???? gi????y phe??p *'} </p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                required
                value={soGP}
                onChange={(e) => setSoGP(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className={classes.text}  >{isShow ? 'Nga??y gi????y phe??p :':'Nga??y gi????y phe??p *'} </p>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="date"
                variant="outlined"
                type="date"
                fullWidth
                required
                value={ngayGP}
                onChange={(e) => setNgayGP(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }} />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p   >{isShow ? 'Nga??y h????t ha??n GP :':'Nga??y h????t ha??n GP *'}</p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="date"
                variant="outlined"
                type="date"
                fullWidth
                required
                value={ngayHHGP}
                onChange={(e) => setNgayHHGP(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}/>
            </Grid>
            <Grid item xs={5}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p className={classes.paper}>{isShow ? '??i??a chi?? :':'??i??a chi?? *'} </p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows='2'
                required
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className={classes.text}  >Ha??ng GPLX ????????c ??a??o ta??o :</p>
            </Grid>
            <Grid item xs={2}>
              <TextField
                multiline
                rows='2'
                variant="outlined"
                fullWidth
                value={hangGPLX}
                onChange={(e) => setHangGPLX(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }} />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p className={classes.paper}>{isShow ? '??i??a ??i????m ??a??o ta??o :':'??i??a ??i????m ??a??o ta??o *'} </p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                required
                value={diadiemDT}
                onChange={(e) => setDiadiemDT(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className={classes.text}  >??i????n thoa??i :</p>
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={soDT}
                onChange={(e) => setSoDT(e.target.value)}
                inputProps={{
                  readOnly: isShow,
                }} />
            </Grid>
            <Grid item xs={1}></Grid>


            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <p className={classes.paper}>Ghi chu??: </p>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows='2'
                onChange={(e) => setGhiChu(e.target.value)}
                value={ghiChu}
                inputProps={{
                  readOnly: isShow,
                }}
              />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={12} style={{ height: 80, marginTop: 20 }} align='center'>
              {isShow ?

                null :
                <>
                  <Button variant='contained' color='secondary' size='large' type='submit' >
                    L??u
                </Button>
                  {' '}
                  <Button variant='contained' color='primary' size='large' onClick={toggle} >
                    H???y
            </Button>
                </>}
            </Grid>
          </Grid>
        </form>
      </div>

      {
        isShow ? <Fab onClick={toggle} aria-label='Edit' className={classes.fab} color='primary'>
          <Edit />
        </Fab> : null
      }


      <Grid item xs={12} style={{ height: 80 }}>
      </Grid>
      <ToastContainer />
    </>
   : null   
  }
  </>
  );
}
