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
      <h1>Thêm mới xe</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='bienso'
            name='bienso'
            label='Biển Số'
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='loaixe'
            name='Loại Xe'
            label='Loại xe'
            fullWidth
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id='nhanhieu'
            name='nhanhieu'
            label='Nhãn hiệu - Hãng'
            fullWidth
            
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id='ttkiemdinh'
            name='ttkiemdinh'
            label='TT Kiểm định'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='ttbaohiem'
            name='ttbaohiem'
            label='TT bảo hiểm'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id='chusohuu'
            name='chusohuu'
            label='Chủ sở hữu'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={10}>
              <Link to={"/ql_xe/xe"} className={classes.link}>
                <Button variant='contained' color='primary' className={classes.button}>
                  Hủy
                </Button>
            </Link>
            <Link to={'/ql_xe/xe'} className={classes.link}>
                <Button variant='contained' color="secondary" >
                  Lưu
                </Button>
            </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
