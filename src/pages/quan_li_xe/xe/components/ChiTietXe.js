import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { reduxForm, Field } from "redux-form";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { get as _get } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteXeRequest } from "../../../../reducers/qly-xe/Xe/XeAction";
import { toast } from 'react-toastify';

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
    color: "white",
  },
  form: {
    marginLeft: 20,
  },
  icon: {
    paddingTop: 10,
    fontSize: 30,
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
const ChiTietXe = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const kieuXe = [{ value: "Xe tập lái" }, { value: "Xe sát hạch" }];
  const dispatch = useDispatch();
  const { handleSubmit, initialize, car, loaiXes, giaoViens, loaiNhienLieus } =
    props;
  let select = car.chuSoHuu;
  let loaiXe1;
  loaiXes.map((value) => {
    if (car?.loaiXe?.id === value.id) {
      loaiXe1 = value.loaiXe;
    }
  });

  /**
   * renderOptionlx
   * @returns
   */

  const renderOptionLX = () => {
    return (
      <>
        <option value="" />
        {kieuXe.map((item, index) => {
          return <option value={item.value}>{item.value}</option>;
        })}
      </>
    );
  };

  const renderOptionTenLX = () => {
    return (
      <>
        <option value="" />
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
  initialize(car);

  /**
   * handerBack
   */
  const handerPush = () => {
    history.replace(`/ql_xe/sua_thong_tin_xe/${car.id}`);
  };

  /**
   * handleClickOpen
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * handleClose
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * handleDelete
   */
  const handleDetele = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
    try {
      await dispatch(deleteXeRequest(id));
      alertSuccess('Xóa xe thành công!');
      history.goBack();
    } catch (error) {
      alert(error.toString());
    }
    }
  };

  const alertSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  /**
   * showGiaoVien
   */
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
                label="Biển số"
                name="bienSoXe"
                autoFocus
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Field
                component={ComboBoxField}
                options={renderOptionTenLX()}
                variant="outlined"
                margin="normal"
                required
                id="loaiXe"
                name="loaiXe1"
                label="Loại xe"
                fullWidth
                autoComplete="loaiXe"
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
                label="Nhãn hiệu (Hãng)"
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
                label="Chủng loại"
                fullWidth
                autoComplete="dongXe"
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
                label="Năm ĐK"
                fullWidth
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
                name="loaiNhienLieu1"
                label="Loại nhiên liệu"
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
                fullWidth
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
                fullWidth
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
                name="lopSau"
                label="Lốp sau"
                fullWidth
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
                label="Ngày cấp "
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
                name="ngayGioHHBH"
                label="Ngày giờ hết hạn"
                fullWidth
                type="datetime-local"
                autoComplete="ngayGioHHBH"
              />
            </Grid>
          </Grid>

          {loaiXe1 === "Xe tập lái" && (
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
                    label="Ngày cấp"
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
            <Grid item xs={12} sm={12} className={classes.marginTop} style={{ textAlign: 'center'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={handerPush}
                style={{ marginRight: '10px' }}
              >
                Sửa
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                onClick={()=>handleDetele(car.id)}
              >
                Xóa
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};
export default reduxForm({
  form: "ChiTietXe",
})(ChiTietXe);
