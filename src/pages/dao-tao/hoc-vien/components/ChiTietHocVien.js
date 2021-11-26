import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
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
 * ChiTietHocVien
 * @param {*} props
 * @returns
 */
const ChiTietHocVien = (props) => {
  const {
    handleSubmit,
    initialize,
    hocVien,
    gioiTinhs,
    quocTichs,
    khoahocs,
  } = props;
  const classes = useStyles();

  /**
   * renderOptionKH
   */
  const renderOptionKH = () => {
    return (
      <>
        {khoahocs.map((item, index) => {
          return <option value={item.value}>{item.tenKH}</option>;
        })}
      </>
    );
  };

  /**
   * renderOptionGT
   */
  const renderOptionGT = () => {
    return (
      <>
        {gioiTinhs.map((item, index) => {
          return <option value={item.value}>{item.value}</option>;
        })}
      </>
    );
  };

  /**
   * renderOptionGT
   */
  const renderOptionQT = () => {
    return (
      <>
        {quocTichs.map((item, index) => {
          return <option value={item.id}>{item.tenVN}</option>;
        })}
      </>
    );
  };

  initialize(hocVien);

  return (
    <React.Fragment>
      <Paper>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid item sm={12} container>
            <Grid item sm={6}>
              <Field
                component={ComboBoxField}
                options={renderOptionKH()}
                variant="filled"
                margin="normal"
                required
                id="khoaHoc"
                name="khoaHoc"
                label="Khóa Học"
                fullWidth
                autoComplete="khoaHoc"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="ngayNhanHS"
                name="ngayNhanHS"
                label="Ngày nhận HS"
                fullWidth
                type="date"
                autoComplete="ngayNhanHS"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="soHS"
                name="soHS"
                label="Số HS"
                fullWidth
                type="number"
                autoComplete="soHS"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="hoTen"
                name="hoTen"
                label="Họ tên"
                fullWidth
                type="text"
                autoComplete="hoTen"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="ngaySinh"
                name="ngaySinh"
                label="Ngày Sinh"
                fullWidth
                type="date"
                autoComplete="ngaySinh"
              />
            </Grid>
            <Grid item sm={3}>
              <Field
                component={ComboBoxField}
                options={renderOptionGT()}
                variant="filled"
                margin="normal"
                required
                id="gioiTinh"
                name="gioiTinh"
                label="Giới tính"
                fullWidth
                autoComplete="gioiTinh"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="soDT"
                name="soDT"
                label="Số điện thoại"
                fullWidth
                type="number"
                autoComplete="soDT"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={ComboBoxField}
                options={renderOptionQT()}
                variant="outlined"
                required
                margin="normal"
                id="quocTich"
                name="quocTich"
                label="Quốc tịch"
                fullWidth
                type="text"
                autoComplete="quocTich"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="soCMND"
                name="soCMND"
                label="Số CMND"
                fullWidth
                type="number"
                autoComplete="soCMND"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="ngayCap"
                name="ngayCap"
                label="Ngày Cấp"
                fullWidth
                type="date"
                autoComplete="ngaySinh"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="noiCap"
                name="noiCap"
                label="Nơi cấp"
                fullWidth
                type="text"
                autoComplete="noiCap"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="diaChiHK"
                name="diaChiHK"
                label="Địa Chỉ HK"
                fullWidth
                type="text"
                autoComplete="noiCap"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="diaChiHKChiTiet"
                name="diaChiHKChiTiet"
                label="Địa Chỉ chi tiết HK"
                fullWidth
                type="text"
                autoComplete="noiCap"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="diaChiNoiO"
                name="diaChiNoiO"
                label="Địa Chỉ Nội 0"
                fullWidth
                type="text"
                autoComplete="diaChiNoiO"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="diaChiNoiOChiTiet"
                name="diaChiNoiOChiTiet"
                label="Địa chỉ nội 0 chi tiết"
                fullWidth
                type="text"
                autoComplete="diaChiNoiOChiTiet"
              />
            </Grid>
            {/* <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="hinhAnh"
                name="hinhAnh"
                label="Địa chỉ nội 0 chi tiết"
                fullWidth
                type="text"
                autoComplete="diaChiNoiOChiTiet"
              />
            </Grid> */}
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="soNamLX"
                name="soNamLX"
                label="Số năm Lái Xe"
                fullWidth
                type="text"
                autoComplete="diaChiNoiOChiTiet"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="soKmLX"
                name="soKmLX"
                label="Số KM Lái Xe"
                fullWidth
                type="text"
                autoComplete="soKmLX"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="giayToArray"
                name="giayToArray"
                label="Số giấy tờ"
                fullWidth
                type="text"
                autoComplete="giayToArray"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="gplxArray"
                name="gplxArray"
                label="GPLX "
                fullWidth
                type="text"
                autoComplete="gplxArray"
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};
export default reduxForm({
  form: "ChiTietHocVien",
})(ChiTietHocVien);
