import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  colors: {
    color:"red"
  }
}));

const MyTextField = ({ input, label, meta: { touched, error,warning }, ...custom }) => {
  const classes=useStyles()
  return (
    <>
    <TextField
      label={label}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
    {touched && ((error && <span className={classes.colors} >{error}</span>) || (warning && <span className={classes.color}>{warning}</span>))}
    </>
  );
};

MyTextField.propTypes = {};

export default MyTextField;
