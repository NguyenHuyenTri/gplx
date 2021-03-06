import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { resetPasswordRequest } from '../../reducers/authState/authAction';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tenDN, setTenDN] = useState('');

  const onChange = (e) => {
    setTenDN(e.target.value);
  };

  const onSubmit = () => {
    dispatch(resetPasswordRequest({ tenDN }));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Quên mật khẩu
        </Typography>

        <Typography component='h5' variant='subtitle1' color='primary'>
          Điền tên đăng nhập để lấy lại mật khẩu
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'  
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='tenDN'
                label='Tên đăng nhập'
                type='tenDN'
                autoComplete='current-tenDN'
                value={tenDN}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            onClick={onSubmit}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Làm mới mật khẩu
          </Button>
          {/* <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login'>Bạn đã có Account? Đăng nhập</Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
