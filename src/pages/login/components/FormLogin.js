import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from '../../../components';
import { Validation } from '../../../utils';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormLogin = (props) => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Field
        component={TextField}
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='tenDN'
        label='Tên đăng nhập'
        name='tenDN'
        autoComplete='tenDN'
        validate={[Validation.required]}
      />

      <Field
        component={TextField}
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='matKhau'
        label='Mật khẩu'
        type='password'
        id='matKhau'
        autoComplete='matKhau'
        validate={[Validation.required]}
      />

      <Button
        type={'submit'}
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Đăng nhập
      </Button>

      <Grid container>
        <Grid item xs></Grid>
        <Grid item>
          <Link to='/login/identify'>{'Quên mật khẩu'}</Link>
        </Grid>
      </Grid>
    </form>
  );
};

FormLogin.propTypes = {};

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
})(FormLogin);
