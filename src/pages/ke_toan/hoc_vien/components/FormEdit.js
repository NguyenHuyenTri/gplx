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
       <h1>Sửa thông tin học viên</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='name'
            name='name'
            label='Tên học viên'
            fullWidth
            autoComplete='tenhocvien'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='code'
            name='code'
            label='Ngày sinh'
            fullWidth
            autoComplete='ngaysinh'
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id='population'
            name='population'
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
            id='size'
            name='size'
            label='SĐT'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='density'
            name='density'
            label='Hạng GPLX'
            fullWidth
            autoComplete='ngaysinh'
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id='kh'
            name='kh'
            label='Khoá học'
            fullWidth
            autoComplete='shipping address-line1'
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id='totalMoney'
            name='totalMoney'
            label='Tổng tiền đã thu'
            fullWidth
            autoComplete='shipping address-line2'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='note'
            name='note'
            label='Ghi chú'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
              <Link to={"/ke_toan/hoc_vien"} className={classes.link}>
                <Button variant='contained' color='primary' className={classes.button}>
                  Hủy
                </Button>
            </Link>
            <Link to={'/ke_toan/hoc_vien'} className={classes.link}>
                <Button variant='contained' color="secondary" >
                  Lưu
                </Button>
            </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
