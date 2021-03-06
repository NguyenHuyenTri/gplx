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
  createGiaoVienRequest,
  GetNoiCapRequest,
  createHangGPLXRequest,
  GetHangGPLXsRequest,
  updateGPLXGVRequest,
  deleteGPLXGVRequest,
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
    width: 380,
    fontSize: 20,
    marginRight: 10,
    marginBottom: 70,
  },
  button1: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginLeft: 200,
    marginBottom: 70,
  },
}));

const required = (value) => (value ? undefined : "Vui l??ng nh???p d??? li???u");
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
  editRow: {
    deleteText: "B???n c?? ch???c ch???n mu???n x??a?",
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

  const hangGPLXGV = useSelector((state) =>
    _get(state, "giaoVien.hangGPLXGV", [])
  );
  const dataKhoaHoc = useSelector((state) =>
    _get(state, "dthv.khoaHoc.khoaHocs", [])
  );
  const hocVienss = useSelector((state) =>
    _get(state, "dthv.hocViens.hocViens", [])
  );

  console.log(hocVienss);
  /**
   * set state for fields on form
   */
  const [khoaHoc, setKhoaHoc] = useState();
  const [hoTen, setHoTen] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gioiTinh, setGioiTinh] = React.useState("Nam");
  const [soCMND, setSoCMND] = useState("");
  const [soDT, setSoDT] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [ngayCap, setNgayCap] = useState("");
  const [noiCap, setNoiCap] = useState("");
  const [ghiChu, SetGhiChu] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");
  const [kyNangNghe, setKyNangNghe] = useState("");
  const [cNGVTHLX, setCNGVTHLX] = useState("");
  const [chuyenMon, setChuyenMon] = useState("");
  const [suPham, setSuPham] = useState("");
  const [ngoaiNgu, setNgoaiNgu] = useState("");
  const [tinHoc, setTinHoc] = useState("");
  const [thamNienDay, setThamNienDay] = useState("");
  const [phanCongDay, setPhanCongDay] = useState([]);
  const [soGPLX, setSoGPLX] = useState("");
  const [hangGPLX, setHangGPLX] = useState();
  const [ngayTTGPLX, setNgayTTGPLX] = useState("");
  const [ngayCapGPLX, setNgayCapGPLX] = useState("");
  const [ngayHHGPLX, setNgayHHGPLX] = useState("");
  const [noiCapGPLX, setNoiCapGPLX] = useState();
  const [gplxGiaoViens, setGplxGiaoViens] = useState([]);

  const clientOptions = {};
  hangGPLXs.map((client) => {
    const { id, tenHang } = client;
    clientOptions[client.id] = tenHang;
  });
  const clientOptions1 = {};
  noiCapGPLXs.map((client) => {
    const { id, tenDV } = client;
    clientOptions1[client.id] = tenDV;
  });

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
      lookup: clientOptions,
    },
    {
      field: "ngayTT",
      title: "Ng??y tr??ng tuy???n",
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
      title: "Ng??y c???p",
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
      title: "Ng??y h???t h???n",
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
      title: "N??i c???p",
      lookup: clientOptions1,
      // editComponent: (props) => (
      //   <TextField
      //     fullWidth
      //     value={props.value}
      //     onChange={(e) => props.onChange(e.target.value)}
      //   />
      // ),
    },
  ];
  /**
   * hander Back
   */
  const handerBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getKhoaHocRequest());
    dispatch(GetHangGPLXsRequest());
    dispatch(GetNoiCapRequest());
    dispatch(getHocVienRequest(khoaHoc));
  }, []);

  useEffect(() => {
    const { khoaHocs } = dataKhoaHoc;
    if (Array.isArray(khoaHocs) && khoaHocs.length > 0) {
      setKhoaHoc(khoaHocs[0].id);
      dispatch(getHocVienRequest(khoaHocs[0].id));
    }
  }, [dataKhoaHoc]);

  const handleChange = (e) => {
    dispatch(getHocVienRequest(e.target.value));
  };

  const elmKhoahoc = () => {
    const { khoaHocs } = dataKhoaHoc;

    if (Array.isArray(khoaHocs)) {
      return khoaHocs.map((item, index) => {
        return <option value={item.id}>{item.tenKH}</option>;
      });
    }

    return null;
  };

  const submitGPLX = async () => {
    const data = {
      soGPLX: soGPLX,
      hangGPLX: hangGPLX,
      ngayTT: ngayTTGPLX,
      ngayCap: ngayCapGPLX,
      ngayHH: ngayHHGPLX,
      noiCap: noiCapGPLX,
    };

    if (data.soGPLX !== null && data.hangGPLX !== null) {
      try {
        // create data when click button add
        await dispatch(createHangGPLXRequest(data));

        toast.success("Th??m GPLX gi??o vi??n th??nh c??ng!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // clear data input
        setSoGPLX("");
      } catch (error) {
        alert(error);
      }
    }
  };
  hangGPLXGV.map((value) => {
    gplxGiaoViens.push(value.id);
  });
  const submitForm = async () => {
    const isEmpty =
      hoTen == "" ||
      ngaySinh == "" ||
      gioiTinh == "" ||
      soDT == "" ||
      diaChi == "" ||
      soCMND == "" ||
      ngayCap == "" ||
      noiCap == "" ||
      ghiChu == "" ||
      // hinhAnh: hinhAnh,
      kyNangNghe == "" ||
      cNGVTHLX == "" ||
      chuyenMon == "" ||
      suPham == "" ||
      ngoaiNgu == "" ||
      tinHoc == "" ||
      thamNienDay == "";

    if (isEmpty) {
    } else {
      const data = {
        phanCongDay: phanCongDay,
      };
      var phanCongDayId = [];
      if (data.phanCongDay.length > 0) {
        for (var i = 0; i < data.phanCongDay.length; i++) {
          phanCongDayId[i] = data.phanCongDay[i].id;
        }
      }
      const data1 = {
        hoTen: hoTen,
        ngaySinh: ngaySinh,
        gioiTinh: gioiTinh,
        soDT: soDT,
        diaChi: diaChi,
        soCMND: soCMND,
        ngayCap: ngayCap,
        noiCap: noiCap,
        ghiChu: ghiChu,
        // hinhAnh: hinhAnh,
        kyNangNghe: kyNangNghe,
        cNGVTHLX: cNGVTHLX,
        chuyenMon: chuyenMon,
        suPham: suPham,
        ngoaiNgu: ngoaiNgu,
        tinHoc: tinHoc,
        thamNienDay: parseInt(thamNienDay),
        phanCongDay: phanCongDayId,
        gplxArray: gplxGiaoViens,
      };

      try {
        if (
          data1.hoTen !== null ||
          data1.ngaySinh !== null ||
          data1.gioiTinh !== null ||
          data1.soDT !== null ||
          data1.soCMND !== null ||
          data1.ngayCap !== null ||
          data1.diaChi !== null ||
          data1.phanCongDay !== null ||
          data1.kyNangNghe !== null ||
          data1.cNGVTHLX !== null ||
          data1.chuyenMon !== null ||
          data1.suPham !== null ||
          data1.ngoaiNgu !== null ||
          data1.tinHoc !== null ||
          data1.thamNienDay !== null
        ) {
          // create data when click button add
          await dispatch(createGiaoVienRequest(data1));
          history.goBack();
          toast.success("Th??m gi??o vi??n th??nh c??ng!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        dispatch({
          type: "CLEAR_GPLX_GV",
          hangGPLXGV: [],
        });
      } catch (error) {
        alert(error);
      }
    }
  };
  // console.log(gplxGiaoViens)
  const data = hangGPLXGV.map((value) => ({
    id: value.id,
    soGPLX: value.soGPLX,
    hangGPLX: value.hangGPLXId,
    ngayTT: value.ngayTT,
    ngayCap: value.ngayCap,
    ngayHH: value.ngayHH,
    noiCap: value.noiCapId,
  }));
  const errors = {};
  return (
    <React.Fragment>
      <Paper>
        <h1>Th??m m???i gi??o vi??n</h1>
        <form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="H??? v?? t??n"
                onChange={(e) => setHoTen(e.target.value)}
                value={hoTen}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setNgaySinh(e.target.value)}
                value={ngaySinh}
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
                  onChange={(e) => setGioiTinh(e.target.value)}
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
                onChange={(e) => setSoDT(e.target.value)}
                value={soDT}
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
                onChange={(e) => setSoCMND(e.target.value)}
                value={soCMND}
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
                onChange={(e) => setDiaChi(e.target.value)}
                value={diaChi}
                label="?????a ch???"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setNgayCap(e.target.value)}
                value={ngayCap}
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
                onChange={(e) => setNoiCap(e.target.value)}
                value={noiCap}
                label="N??i c???p"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => SetGhiChu(e.target.value)}
                value={ghiChu}
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
                onChange={(e) => setKyNangNghe(e.target.value)}
                value={kyNangNghe}
                label="K??? n??ng ngh???"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setCNGVTHLX(e.target.value)}
                value={cNGVTHLX}
                label="CNGV THLX"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setChuyenMon(e.target.value)}
                value={chuyenMon}
                label="Chuy??n m??n"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setSuPham(e.target.value)}
                value={suPham}
                label="S?? ph???m"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setNgoaiNgu(e.target.value)}
                value={ngoaiNgu}
                label="Ngo???i ng???"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setTinHoc(e.target.value)}
                value={tinHoc}
                label="Tin h???c"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setThamNienDay(e.target.value)}
                value={thamNienDay}
                label="Th??m ni??n d???y l??i"
              />
            </Grid>
            <Grid
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
                  value={phanCongDay}
                  multiple
                  id="checkboxes-tags-demo"
                  options={hocVienss}
                  onChange={(event, value) => setPhanCongDay(value)}
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
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <h3>Th??m th??ng tin GPLX</h3>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="S??? GPLX"
                  onChange={(e) => setSoGPLX(e.target.value)}
                  value={soGPLX}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{ height: "79px", paddingTop: "28px" }}
              >
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Cho??n h???ng GPLX
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    required
                    label="Cho??n h???ng gi???y ph??p l??i xe"
                    component={TextField}
                    id="tenHang"
                    name="tenHang"
                    onChange={(e) => setHangGPLX(e.target.value)}
                  >
                    {hangGPLXs.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.tenHang}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Ng??y tr??ng tuy???n"
                  type="date"
                  onChange={(e) => setNgayTTGPLX(e.target.value)}
                  value={ngayTTGPLX}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Ng??y c???p"
                  type="date"
                  onChange={(e) => setNgayCapGPLX(e.target.value)}
                  value={ngayCapGPLX}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Ng??y h???t h???n"
                  type="date"
                  onChange={(e) => setNgayHHGPLX(e.target.value)}
                  value={ngayHHGPLX}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{ height: "79px", paddingTop: "28px" }}
              >
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Cho??n n??i c???p
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    required
                    label="Cho??n h???ng gi???y ph??p l??i xe"
                    component={TextField}
                    id="tenHang"
                    name="tenHang"
                    onChange={(e) => setNoiCapGPLX(e.target.value)}
                  >
                    {noiCapGPLXs.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.tenDV}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} style={{ marginTop: "25px" }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={submitGPLX}
                >
                  Th??m GPLX
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MaterialTable
                  title="Gi???y ph??p l??i xe hi???n c??"
                  columns={columns}
                  data={data}
                  options={{
                    headerStyle: {
                      backgroundColor: "#01579B",
                      color: "#FFF",
                    },
                    rowStyle: {
                      backgroundColor: "#EEE",
                    },
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        console.log(" dataUpdate[index]", dataUpdate);
                        console.log(" dataUpdate[index]", data);
                        setTimeout(() => {
                          // update in store
                          newData.hangGPLXId = Number(newData.hangGPLXId);
                          dispatch({
                            type: "UPDATE_VIEW_GPLX_GV",
                            hangGPLXGVNew: dataUpdate[index],
                          });

                          // setGplxGVs(dataUpdate);
                          dispatch(updateGPLXGVRequest(newData, newData.id));

                          resolve();
                        }, 500);
                      }),

                    onRowDelete: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          dispatch(deleteGPLXGVRequest(newData.id));
                          resolve();
                        }, 500);
                      }),
                  }}
                  localization={localizationStyle}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                // onClick={handerBack}
                startIcon={<DeleteIcon />}
                className={classes.button1}
                style={{ backgroundColor: "red", color: "#FFFFFF" }}
              >
                H???y
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={submitForm}
                className={classes.button}
              >
                L??u th??ng tin ng?????i d??ng
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
