import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { reduxForm, Field } from "redux-form";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { get as _get } from "lodash";
import { Validation } from "../../../../utils";

/**
 * makeStyles
 */
const useStyles = makeStyles((theme) => ({
  button1: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginLeft: 300,
    marginBottom: 70,
  },
  marginTop: {
    marginTop: 15,
    paddingTop: 15,
  },
  button: {
    width: 150,
    fontSize: 20,
    marginBottom: 70,
  },
  link: {
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
  },
  grid: {
    marginRight: 50,
  },
}));

/**
 * UpdateFromXe
 * @param {*} props
 * @returns
 */
const UpdateFormXe = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const { handleSubmit, initialize, car, loaiXes, giaoViens, loaiNhienLieus } =
    props;
  const [select, setSelect] = useState(car.chuSoHuu);
  const [loaiXe1, setLoaiXe1] = useState("");
  /**
   * renderOptionlx
   * @returns
   */

  const renderOptionTenLX = () => {
    return (
      <>
        {loaiXes.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.tenLoaiXe}
            </option>
          );
        })}
      </>
    );
  };

  /**
   * renderOptionCSH
   * @returns
   */
  const chuSoHuus = [{ value: "Xe chính chủ" }, { value: "Xe công ty" }];
  const renderOptionCSH = () => {
    return chuSoHuus.map((item, index) => {
      return <option value={item.value}>{item.value}</option>;
    });
  };

  /**
   * renderOptionGV
   * @returns
   */
  const renderOptionGV = () => {
    return giaoViens.map((item, index) => {
      return <option value={item.id}>{item.hoTen}</option>;
    });
  };

  /**
   * renderOptionLNL
   * @returns
   */
  const renderOptionLNL = () => {
    return loaiNhienLieus.map((item, index) => {
      return <option value={item.id}>{item.loaiNhienLieu}</option>;
    });
  };

  /**
   * initialize
   */
  useEffect(() => {
    initialize(car);
  }, []);

  /**
   * handerBack
   */
  const handerBack = () => {
    history.goBack();
  };

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
                validate={[Validation.required]}
                label="Hãng xe"
                fullWidth
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
                validate={[Validation.required]}
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
                name="loaiXe1"
                label="Tên loại xe"
                fullWidth
                validate={[Validation.required]}
                autoComplete="loaiXe"
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
                validate={[Validation.required]}
                name="mauXe"
                label="Màu Xe"
                fullWidth
                autoComplete="mauXe"
              />
            </Grid>
            <Grid item xs={12} sm={2} className={classes.grid}>
              <Field
                validate={[Validation.required]}
                component={TextField}
                variant="outlined"
                margin="normal"
                id="soMay"
                name="soMay"
                required
                label="Số máy"
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
                validate={[Validation.required]}
                name="soKhung"
                label="Số khung"
                fullWidth
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
                validate={[Validation.required]}
                label="Số phiếu"
                fullWidth
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
                validate={[Validation.required]}
                fullWidth
                type="date"
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
                validate={[Validation.required]}
                name="ngayHHKD"
                label="Ngày hết hạn"
                fullWidth
                type="date"
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
                validate={[Validation.required]}
                label="Ngày giờ cấp"
                required
                fullWidth
                type="datetime-local"
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
                validate={[Validation.required]}
                name="ngayGioHHBH"
                label="Ngày giờ hết hạn"
                fullWidth
                type="datetime-local"
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
                validate={[Validation.required]}
                label="Chủ sở hữu"
                fullWidth
                autoComplete="chuSoHuu"
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
                    validate={[Validation.required]}
                    id="giaoVien"
                    name="giaoVien1"
                    label="Giáo Viên"
                    fullWidth
                    autoComplete="giaoVien"
                  />
                </Grid>
              )}
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
  form: "UpdateFormXe",
})(UpdateFormXe);
