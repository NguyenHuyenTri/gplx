import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { FormLogin } from './components';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../reducers/authState/authAction';

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
}));

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Đăng nhập
        </Typography>

        <FormLogin onSubmit={onSubmit} />
      </div>
    </Container>
  );
};

export default SignIn;
