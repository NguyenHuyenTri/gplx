import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  
  button:{
      marginRight:5,
  },
  link:{
    textDecoration:'none'
  }
}));
export default function AddressForm() {
  const classes = useStyles();
  return (
    <React.Fragment>
       <h1>Thêm học viên</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='tenhocvien'
            name='tenhocvien'
            label='Tên học viên'
            fullWidth
            autoComplete='tenhocvien'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='ngaysinh'
            name='ngaysinh'
            label='Ngày sinh'
            fullWidth
            autoComplete='ngaysinh'
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id='socmnd'
            name='socmnd'
            label='Số CMND'
            fullWidth
            autoComplete='shipping address-line1'
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id='diachi'
            name='diachi'
            label='Địa chỉ thường trú'
            fullWidth
            autoComplete='shipping address-line2'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='sdt'
            name='sdt'
            label='SĐT'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Link to={"/dao_tao/hoc_vien"} className={classes.link}>
                  <Button variant='contained' color='primary' className={classes.button}>
                    Hủy
                  </Button>
              </Link>
              <Link to={'/dao_tao/hoc_vien'} className={classes.link}>
                  <Button variant='contained' color="secondary" >
                    Lưu
                  </Button>
              </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
