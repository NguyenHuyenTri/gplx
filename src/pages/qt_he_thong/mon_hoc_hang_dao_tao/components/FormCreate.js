import { Button, InputLabel, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      <h1>Thêm mới hạng đào tạo</h1>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={10}>
        <TextField
          required
          id='TenMonHocHangDaoTao'
          name='TenMonHocHangDaoTao'
          label='Tên môn học'
          fullWidth
          
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          required
          id='TongSoGio'
          name='TongSoGio'
          label='Tổng số giờ'
          fullWidth
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          required
          id='LyThuyet'
          name='LyThuyet'
          label='Lý thuyết'
          fullWidth
          
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          id='ThucHanhHinh'
          name='ThucHanhHinh'
          label='Thực hành hình'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          required
          id='ThucHanhDuong'
          name='ThucHanhDuong'
          label='Thực hành đường'
          fullWidth
          autoComplete='shipping address-level2'
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          required
          id='KiemTra'
          name='KiemTra'
          label='Kiểm tra'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          required
          id='GhiChu'
          name='GhiChu'
          label='Ghi chú'
          fullWidth
          autoComplete='shipping address-level2'
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          required
          id='TrangThai'
          name='TrangThai'
          label='Trạng thái'
          fullWidth
        />
      </Grid>
        <Grid item xs={12} sm={10}>
              <Link to={"/qt_he_thong/mon_hoc_hang_dao_tao"} className={classes.link}>
                <Button variant='contained' color='primary' className={classes.button}>
                  Hủy
                </Button>
            </Link>
            <Link to={'/qt_he_thong/mon_hoc_hang_dao_tao'} className={classes.link}>
                <Button variant='contained' color="secondary" >
                  Lưu
                </Button>
            </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
