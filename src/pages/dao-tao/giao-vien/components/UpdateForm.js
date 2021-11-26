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

const required = (value) => (value ? undefined : "Vui lòng nhập dữ liệu");
const localizationStyle = {
  pagination: {
    labelDisplayedRows: "{from}-{to} Tổng {count}",
    firstTooltip: "Trang đầu",
    previousTooltip: "Trang trước",
    nextTooltip: "Trang sau",
    lastTooltip: "Trang cuối",
    labelRowsSelect: "Dòng",
  },
  body: {
    emptyDataSourceMessage: "Không có dữ liệu",
  },
  editRow: {
    deleteText: "Bạn có chắc chắn muốn xóa?",
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
      title: "Số GPLX",
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
      title: "Hạng GPLX",
      lookup: clientOptions,
    },
    {
      field: "ngayTT",
      title: "Ngày trúng tuyển",
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
      title: "Ngày cấp",
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
      title: "Ngày hết hạn",
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
      title: "Nơi cấp",
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

        toast.success("Thêm GPLX giáo viên thành công!", {
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
          toast.success("Thêm giáo viên thành công!", {
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
        <h1>Thêm mới giáo viên</h1>
        <form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Họ và tên"
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
                label="Ngày sinh"
              />
            </Grid>
            <Grid item xs={12} sm={2} style={{ paddingTop: "28px" }}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Chọn giới tính
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  required
                  label="Chọn hạng giấy phép lái xe"
                  component={TextField}
                  id="gioiTinh"
                  name="gioiTinh"
                  onChange={(e) => setGioiTinh(e.target.value)}
                >
                  <MenuItem value="Nam">Nam</MenuItem>

                  <MenuItem value="Nữ">Nữ</MenuItem>
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
                label="Số điện thoại"
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
                label="Số CMND"
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
                label="Địa chỉ"
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
                label="Ngày cấp"
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
                label="Nơi cấp"
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
                label="Ghi chú"
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
                label="Hình ảnh"
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
                label="Kỹ năng nghề"
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
                label="Chuyên môn"
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
                label="Sư phạm"
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
                label="Ngoại ngữ"
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
                label="Tin học"
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
                label="Thâm niên dạy lái"
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
                    Chọn khóa học
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    required
                    label="Chọn hạng giấy phép lái xe"
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
                      label="Danh sách học viên"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <h3>Thêm thông tin GPLX</h3>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Số GPLX"
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
                    Chọn hạng GPLX
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    required
                    label="Chọn hạng giấy phép lái xe"
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
                  label="Ngày trúng tuyển"
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
                  label="Ngày cấp"
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
                  label="Ngày hết hạn"
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
                    Chọn nơi cấp
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    required
                    label="Chọn hạng giấy phép lái xe"
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
                  Thêm GPLX
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MaterialTable
                  title="Giấy phép lái xe hiện có"
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
                Hủy
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={submitForm}
                className={classes.button}
              >
                Lưu thông tin người dùng
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
