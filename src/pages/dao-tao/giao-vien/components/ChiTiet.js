import { Button, makeStyles, MenuItem, Paper, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { get as _get } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { InputLabel, TextField } from "@material-ui/core";

import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import {
  getHocVienRequest,
  getKhoaHocRequest,
} from "../../../../reducers/DTHVState/DTHVAction";
import {
  GetNoiCapRequest,
  GetHangGPLXsRequest,
  getGiaoVienByIdRequest,
  deleteGVRequest,
} from "../../../../reducers/dao-tao/GiaoVien/GiaoVienAction";
import MaterialTable from "material-table";

/**
 * useStyles
 */
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
  },
  formControl: {
    marginTop: theme.spacing(3),
    marginLeft: 10,
    marginBottom: theme.spacing(3),
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(10),
  },
  checkBoxStyle: {
    display: "flex",
  },
  actionSubmit: {
    display: "flex",
    justifyContent: "space-between",
  },
  attention: {
    color: "red",
    paddingTop: "10px",
  },
  multiCheckbox: {
    border: "2px solid #ccc",
    width: "100%",
    height: "150px",
    overflowY: "scroll",
    padding: "5px 10px 5px 10px",
  },
  button: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginBottom: 70,
  },
  button1: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginLeft: 350,
    marginBottom: 70,
  },
}));

const localizationStyle = {
  pagination: {
    labelDisplayedRows: "{from}-{to} T????ng {count}",
    firstTooltip: "Trang ??????u",
    previousTooltip: "Trang tr??????c",
    nextTooltip: "Trang sau",
    lastTooltip: "Trang cu????i",
    labelRowsSelect: "D??ng",
  },
  body: {
    emptyDataSourceMessage: "Kh??ng co?? d???? li????u",
  },
};
/**
 * CreateForm phan quyen
 * @param {*} props
 * @returns
 */
const FormCreate = (props) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const hangGPLXs = useSelector((state) =>
    _get(state, "giaoVien.hangGPLXs", [])
  );
  const noiCapGPLXs = useSelector((state) =>
    _get(state, "giaoVien.noiCaps", [])
  );
  const dataKhoaHoc = useSelector((state) => state.dthv.khoaHoc.khoaHocs);
  const hocVienss = useSelector((state) =>
    _get(state, "dthv.hocViens.hocViens", [])
  );
  const giaoVien = useSelector((state) => _get(state, "giaoVien.giaoVien", []));

  var query = window.location.pathname.split("/");
  var id = query[query.length - 1];
  const [khoaHoc, setKhoaHoc] = useState("-1");

  const handelPush = () => {
    history.push(`/giao_vien/sua_thong_tin/${id}`);
  };
  /**
   * set state for fields on form
   */

  useEffect(() => {
    dispatch(getKhoaHocRequest());
    dispatch(GetHangGPLXsRequest());
    dispatch(GetNoiCapRequest());
    const fetching = async () => {
      try {
        await dispatch(getGiaoVienByIdRequest(id));
      } catch (error) {
        alert(error);
      }
    };

    fetching();
  }, []);

  useEffect(() => {
    dispatch(getHocVienRequest(khoaHoc));
  }, []);

  const confirmDelete = () => {
    if (window.confirm("B???n c?? ch???c ch???n mu???n x??a?")) {
      dispatch(deleteGVRequest(id));
      toast.success("X??a kh??a h???c th??nh c??ng!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.goBack();
    } else {
    }
  };

  const columns = [
    {
      field: "soGPLX",
      title: "S??? GPLX",
      width: "30%",
      editComponent: (props) => (
        <TextField
          multiline
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      field: "hangGPLX",
      title: "H???ng GPLX",
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      field: "ngayTT",
      title: "Ng??y TT",
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value}
          type="date"
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
    {
      field: "ngayCap",
      title: "Ng??y C???p",
      editComponent: (props) => (
        <TextField
          type="date"
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),

      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
    {
      field: "ngayHH",
      title: "Ng??y HH",
      editComponent: (props) => (
        <TextField
          type="date"
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
    {
      field: "noiCap",
      title: "N??i C???p",
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  const data1 = [];

  const data =
    giaoVien.gplxGiaoViens &&
    giaoVien.gplxGiaoViens.map((value) => ({
      id: value.id,
      soGPLX: value.soGPLX,
      hangGPLX: value.hangGPLX.tenHang,
      ngayTT: value.ngayTT,
      ngayCap: value.ngayCap,
      ngayHH: value.ngayHH,
      noiCap: value.donViGTVT.tenDV,
    }));

  return (
    <React.Fragment>
      <Paper>
        <form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="H??? v?? t??n"
                value={giaoVien.hoTen}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.ngaySinh}
                type="date"
                label="Ng??y sinh"
              />
            </Grid>
            <Grid item xs={12} sm={2} style={{ paddingTop: "28px" }}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Cho??n gi???i t??nh
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  required
                  label="Cho??n h???ng gi???y ph??p l??i xe"
                  component={TextField}
                  id="gioiTinh"
                  name="gioiTinh"
                  value={giaoVien.gioiTinh}
                >
                  <MenuItem value="Nam">Nam</MenuItem>

                  <MenuItem value="N???">N???</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.soDT}
                type="number"
                label="S??? ??i???n tho???i"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.soCMND}
                type="number"
                label="S??? CMND"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.diaChi}
                label="?????a ch???"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.ngayCap}
                type="date"
                label="Ng??y c???p"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.noiCap}
                label="N??i c???p"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.ghiChu}
                label="Ghi ch??"
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setHinhAnh(e.target.value)}
                value={hinhAnh}
                label="H??nh ???nh"
              />
            </Grid> */}
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.kyNangNghe}
                label="K??? n??ng ngh???"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.cNGVTHLX}
                label="CNGV THLX"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.FragmentchuyenMon}
                label="Chuy??n m??n"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.suPham}
                label="S?? ph???m"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.ngoaiNgu}
                label="Ngo???i ng???"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.tinHoc}
                label="Tin h???c"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={giaoVien.thamNienDay}
                label="Th??m ni??n d???y l??i"
              />
            </Grid>
            {/* <Grid
              item
              xs={12}
              sm={6}
              container
              style={{ height: "79px", paddingTop: "28px" }}
            >
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Cho??n kh??a h???c
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    required
                    label="Cho??n h???ng gi???y ph??p l??i xe"
                    component={TextField}
                    id="gioiTinh"
                    name="gioiTinh"
                    onChange={(e) => setKhoaHoc(e.target.value)}
                  >
                    {dataKhoaHoc.map((value, index) => (
                      <MenuItem value={value.id}>
                        <MenuItem value={value.id}>{value.tenKH}</MenuItem>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={giaoVien.phanCongDay}
                  multiple
                  id="checkboxes-tags-demo"
                  options={hocVienss}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.hoTen}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.hoTen}
                    </React.Fragment>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Danh s??ch h???c vi??n"
                    />
                  )}
                />
              </Grid>
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <MaterialTable
                localization={localizationStyle}
                title="Danh S??ch GPLX Gi??o vi??n"
                columns={columns}
                data={data ? data : data1}
                options={{
                  headerStyle: {
                    backgroundColor: "#01579B",
                    color: "#FFF",
                  },
                  rowStyle: {
                    backgroundColor: "#EEE",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                onClick={handelPush}
                startIcon={<DeleteIcon />}
                className={classes.button1}
                style={{ backgroundColor: "red", color: "#FFFFFF" }}
              >
                S???a
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                onClick={confirmDelete}
                className={classes.button}
              >
                X??a
              </Button>
            </Grid>
          </Grid>
          <ToastContainer />
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default reduxForm({
  form: "FormCreate",
})(FormCreate);
