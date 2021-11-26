import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { reduxForm, Field } from "redux-form";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get as _get } from "lodash";

/**
 * useStyles
 */
const useStyles = makeStyles((theme) => ({
  button1: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginLeft: 350,
    marginBottom: 70,
  },
  button: {
    width: 150,
    fontSize: 20,
    marginBottom: 70,
  },
  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
  },
  marginTop: {
    marginTop: 15,
    paddingTop: 15,
  },
}));

/**
 * CreateFormTTKeToan
 * @param {*} props
 * @returns
 */
const CreateFormTTKeToan = (props) => {
  const { handleSubmit, initialize } = props;
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();

  const NguoiDung = [
    {value: "Giáo viên"},
    {value: "Nhân viên"},
  ];
  const renderOptionNguoiDung = () => {
    return NguoiDung.map((item, index) => {
        return <option value={item.value}>{item.value}</option>;
    });
  };
  const ThuNhap = [
    {value: "Khoản trừ"},
    {value: "Khoản thu nhập"},
  ];
  const renderOptionThuNhap = () => {
    return ThuNhap.map((item, index) => {
        return <option value={item.value}>{item.value}</option>;
    });
  };
  // listen data loai mon hoc of grid

  /**
   * handerBack
   */
  const handerBack = () => {
    history.goBack();
  };

  useEffect(() => {
    initialize({
      nguoiDung: 'Giáo viên',
      loai: 'Khoản trừ',
    });
}, [])


  return (
    <React.Fragment>
      <Paper>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid item sm={12} container>
            <Grid item xs={5} sm={5}>
              <Field
                 component={ComboBoxField}
                 options={renderOptionNguoiDung()}
                 variant="outlined"
                 margin="normal"
                 required
                 id="nguoiDung"
                 name="nguoiDung"
                 label="Người dùng"
                 fullWidth
                 autoComplete="nguoiDung"
              />
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={5} sm={5}>
              <Field
                variant="outlined"
                margin="normal"
                autoFocus
                component={TextField}
                required
                id='tenTruong'
                name='tenTruong'
                label='Tên trường'
                fullWidth
                autoComplete='tenTruong'
              />
            </Grid>
            <Grid item xs={5} sm={5}>
              <Field
                 component={ComboBoxField}
                 options={renderOptionThuNhap()}
                 variant="outlined"
                 margin="normal"
                 autoFocus
                 required
                 id="loai"
                 name="loai"
                 label="Loại"
                 fullWidth
                 autoComplete="loai"
              />
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={5}>
              <Field
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                id="ghiChu"
                label="Ghi Chú"
                name="ghiChu"
                component={TextField}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={12} className={classes.marginTop}>
              <Button
                variant="contained"
                color="primary"
                onClick={handerBack}
                className={classes.button1}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className={classes.button}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};
export default reduxForm({
  form: "CreateFormTTKeToan",
})(CreateFormTTKeToan);
