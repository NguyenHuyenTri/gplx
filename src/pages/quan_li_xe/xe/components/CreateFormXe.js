import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { reduxForm, Field } from "redux-form";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getLoaiXeRequest,
  getGVRequest,
  getLoaiNhienLieuRequest,
} from "../../../../reducers/qly-xe/Xe/XeAction";
import { useDispatch, useSelector } from "react-redux";
import { get as _get } from "lodash";
import { Validation } from "../../../../utils";

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
  grid: {
    marginRight: 50,
  },
}));

/**
 * CreateFormXe
 * @param {*} props
 * @returns
 */
const CreateFormXe = (props) => {
  const { handleSubmit, initialize } = props;
  const classes = useStyles();
  let history = useHistory();
  const [select, setSelect] = useState("Xe chính chủ");
  const [loaiXe1, setLoaiXe1] = useState("");
  const dispatch = useDispatch();

  // listen data loai xe of grid
  const loaiXes = useSelector((state) => _get(state, "xe.loaiXes", []));
  const giaoViens = useSelector((state) => _get(state, "xe.giaoViens", []));
  const loaiNhienLieus = useSelector((state) => _get(state, "xe.loaiNLs", []));
  const chuSoHuus = [{ value: "Xe chính chủ" }, { value: "Xe công ty" }];
  const required = (value) => (value ? undefined : "Vui lòng nhập dữ liệu");
  /**
   * renderOptionlx
   * @returns
   */

  const renderOptionTenLX = () => {
    return (
      <>
        {loaiXes.map((item, index) => {
          return <option value={item.id}>{item.tenLoaiXe}</option>;
        })}
      </>
    );
  };
  /**
   * renderOptionlx
   * @returns
   */
  const renderOptionLNL = () => {
    return (
      <>
        {loaiNhienLieus.map((item, index) => {
          return <option value={item.id}>{item.loaiNhienLieu}</option>;
        })}
      </>
    );
  };

  /**
   * renderOptionCSH
   * @returns
   */

  const renderOptionCSH = () => {
    return (
      <>
        {chuSoHuus.map((item, index) => {
          return <option value={item.value}>{item.value}</option>;
        })}
      </>
    );
  };

  /**
   * renderOptionGV
   * @returns
   */
  const renderOptionGV = () => {
    return (
      <>
        {giaoViens.map((item, index) => {
          return <option value={item.id}>{item.hoTen}</option>;
        })}
      </>
    );
  };

  /**
   * handerBack
   */
  const handerBack = () => {
    history.goBack();
  };

  /**
   * Get Xe Request
   */

  useEffect(() => {
    dispatch(getLoaiXeRequest());
    dispatch(getLoaiNhienLieuRequest());
    dispatch(getGVRequest());
    var date = new Date();
    var default_day =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      "T" +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2);
    var default_day1 =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    initialize({
      ngayCapKD: default_day1,
      ngayHHKD: default_day1,
      ngayGioCapBH: default_day,
      ngayGioHHBH: default_day,
      ngayCapGPXTL: default_day1,
      ngayHHGPXTL: default_day1,
    });
  }, []);
  let loaiXe;
  loaiXes.map((value) => {
    if (loaiXe1 == value.id) {
      loaiXe = value.loaiXe;
    }
  });
  return (
    <React.Fragment>
      <Paper>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <h4 className={classes.marginTop}>THÔNG TIN CƠ BẢN</h4>
          <Grid item sm={12} container>
            <Grid item sm={2} className={classes.grid}>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="bienSoXe"
                label="Biển số xe"
                name="bienSoXe"
                autoFocus
                validate={[Validation.required]}
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                id="hangXe"
                name="hangXe"
                label="Hãng xe"
                fullWidth
                validate={[Validation.required]}
                autoComplete="hangXe"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                id="dongXe"
                name="dongXe"
                label="Dòng xe"
                fullWidth
                autoComplete="dongXe"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Field
                component={ComboBoxField}
                options={renderOptionTenLX()}
                variant="filled"
                margin="normal"
                required
                id="loaiXe"
                name="loaiXe"
                label="Tên loại xe"
                fullWidth
                autoComplete="loaiXe"
                validate={[Validation.required]}
                onChange={(e) => setLoaiXe1(e.target.value)}
              />
            </Grid>
          </Grid>
          <h4>THÔNG SỐ XE</h4>
          <Grid item sm={12} container>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                id="mauXe"
                required
                name="mauXe"
                label="Màu Xe"
                fullWidth
                validate={[Validation.required]}
                autoComplete="mauXe"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                id="soMay"
                name="soMay"
                required
                label="Số máy"
                validate={[Validation.required]}
                fullWidth
                autoComplete="soMay"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="soKhung"
                name="soKhung"
                label="Số khung"
                fullWidth
                validate={[Validation.required]}
                autoComplete="soKhung"
              />
            </Grid>

            <Grid item xs={12} sm={1}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="namSX"
                name="namSX"
                label="Năm SX"
                fullWidth
                type="number"
                validate={[Validation.required]}
                autoComplete="namSX"
              />
            </Grid>

            <Grid item xs={12} sm={1} className={classes.grid}>
              <Field
                component={TextField}
                required
                variant="outlined"
                margin="normal"
                id="namDK"
                name="namDK"
                type="number"
                label="Năm ĐK"
                fullWidth
                validate={[Validation.required]}
                autoComplete="namDK"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                component={ComboBoxField}
                options={renderOptionLNL()}
                variant="outlined"
                margin="normal"
                required
                id="loaiNhienLieu"
                name="loaiNhienLieu"
                label="Loại nhiên liệu"
                validate={[Validation.required]}
                fullWidth
                autoComplete="loaiNhienLieu"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                id="soLop"
                name="soLop"
                label="Số lốp"
                fullWidth
                type="number"
                validate={[Validation.required]}
                autoComplete="soLop"
              />
            </Grid>
            <Grid item xs={12} sm={1} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                id="soLopDP"
                name="soLopDP"
                label="Số lốp dự phòng"
                type="number"
                fullWidth
                validate={[Validation.required]}
                autoComplete="soLopDP"
              />
            </Grid>

            <Grid item xs={12} sm={1}>
              <Field
                component={TextField}
                required
                variant="outlined"
                margin="normal"
                id="lopTruoc"
                name="lopTruoc"
                label="Lốp trước"
                type="number"
                fullWidth
                validate={[Validation.required]}
                autoComplete="lopTruoc"
              />
            </Grid>

            <Grid item xs={12} sm={1} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                id="lopSau"
                type="number"
                name="lopSau"
                label="Lốp sau"
                fullWidth
                validate={[Validation.required]}
                autoComplete="lopSau"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Field
                component={TextField}
                required
                variant="outlined"
                margin="normal"
                id="chieuDai"
                name="chieuDai"
                type="number"
                label="Chiều dài"
                fullWidth
                autoComplete="chieuDai"
              />
            </Grid>

            <Grid item xs={12} sm={1}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                type="number"
                id="chieuRong"
                name="chieuRong"
                label="Chiều rộng"
                fullWidth
                autoComplete="chieuRong"
              />
            </Grid>

            <Grid item xs={12} sm={1} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                type="number"
                id="chieuCao"
                name="chieuCao"
                label="Chiều cao"
                fullWidth
                autoComplete="chieuCao"
              />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="ngayBaoDuong"
                name="ngayBaoDuong"
                label="Ngày bảo dưỡng"
                fullWidth
                type="date"
                autoComplete="ngayBaoDuong"
              />
            </Grid>
          </Grid>
          <h4>THÔNG TIN KIỂM ĐỊNH</h4>
          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={3} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                id="soPhieuKD"
                required
                name="soPhieuKD"
                label="Số phiếu"
                fullWidth
                validate={[Validation.required]}
                autoComplete="soPhieuKD"
              />
            </Grid>

            <Grid item xs={12} sm={3} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                required
                margin="normal"
                id="ngayCapKD"
                name="ngayCapKD"
                label="Ngày cấp"
                fullWidth
                type="date"
                validate={[Validation.required]}
                autoComplete="ngayCapKDs"
              />
            </Grid>

            <Grid item xs={12} sm={3} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                id="ngayHHKD"
                required
                name="ngayHHKD"
                label="Ngày hết hạn"
                fullWidth
                type="date"
                validate={[Validation.required]}
                autoComplete="ngayHHKD"
              />
            </Grid>
          </Grid>
          <h4>THÔNG TIN BẢO HIỂM</h4>
          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={5} className={classes.grid}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                id="ngayGioCapBH"
                name="ngayGioCapBH"
                label="Ngày giờ cấp "
                required
                fullWidth
                type="datetime-local"
                validate={[Validation.required]}
                autoComplete="ngayGioCapBH"
              />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.grid}>
              <Field
                component={TextField}
                required
                variant="outlined"
                margin="normal"
                id="ngayGioHHBH"
                name="ngayGioHHBH"
                label="Ngày giờ hết hạn"
                fullWidth
                type="datetime-local"
                validate={[Validation.required]}
                autoComplete="ngayGioHHBH"
              />
            </Grid>
          </Grid>

          {loaiXe === "Xe tập lái" && (
            <>
              <h4>GIẤY PHÉP XE TẬP LÁI</h4>
              <Grid item xs={12} sm={12} container>
              <Grid item xs={12} sm={5} className={classes.grid}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    id="ngayCapGPXTL"
                    name="ngayCapGPXTL"
                    label="Ngày cấp "
                    validate={[Validation.required]}
                    fullWidth
                    type="date"
                    autoComplete="ngayCapGPXTL"
                  />
                </Grid>
                <Grid item xs={12} sm={5} className={classes.grid}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    id="ngayHHGPXTL"
                    name="ngayHHGPXTL"
                    validate={[Validation.required]}
                    label="Ngày hết hạn"
                    required
                    fullWidth
                    type="date"
                    autoComplete="ngayHHGPXTL"
                  />
                </Grid>
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={5} className={classes.grid}>
              <Field
                component={ComboBoxField}
                options={renderOptionCSH()}
                variant="outlined"
                required
                margin="normal"
                id="chuSoHuu"
                name="chuSoHuu"
                label="Chủ sở hữu"
                fullWidth
                autoComplete="chuSoHuu"
                validate={[Validation.required]}
                onChange={(e) => setSelect(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.grid}>
              {select === "Xe chính chủ" && (
                <Grid item xs={12} sm={12}>
                  <Field
                    component={ComboBoxField}
                    options={renderOptionGV()}
                    variant="outlined"
                    margin="normal"
                    required
                    id="giaoVien"
                    name="giaoVien"
                    label="Giáo Viên"
                    fullWidth
                    validate={[Validation.required]}
                    autoComplete="giaoVien"
                  />
                </Grid>
              )}
            </Grid>
            {/* <Grid item xs={12} sm={5} className={classes.grid}>
              <Field type="file" name="poster" component={FileInput} />
            </Grid> */}
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={12} className={classes.marginTop} style={{ textAlign: 'center'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={handerBack}
                style={{ marginRight: '10px' }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
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
  form: "CreateFormXe",
})(CreateFormXe);
