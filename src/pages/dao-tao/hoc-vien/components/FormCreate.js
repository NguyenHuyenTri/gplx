import { Button, makeStyles, Paper, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { get as _get } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { InputLabel, TextField } from "@material-ui/core";
import { GetAllGiayToRequest } from "../../../../reducers/quan-tri/GiayTo/GiayToAction";
import { GetAllHangGPLXRequest } from "../../../../reducers/quan-tri/HangGPLX/HangGPLXAction";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { getHocVienRequest, getKhoaHocRequest } from "../../../../reducers/DTHVState/DTHVAction";

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
}));

/**
 * CreateForm phan quyen
 * @param {*} props
 * @returns
 */
const FormCreate = (props) => {
  const { handleSubmit, initialize } = props;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const giayTos = useSelector((state) => _get(state, "giayTos.giayTos", []));
  const hangGPLXs = useSelector((state) =>
    _get(state, "hangGplx.hanggplxs", [])
  );
  const dataKhoaHoc = useSelector((state) => state.dthv.khoaHoc);
  const hocVienss = useSelector((state) =>
    _get(state, "dthv.hocViens.hocViens", [])
  );

  /**
   * set state for fields on form
   */
   const [khoaHoc, setKhoaHoc] = useState('-1');

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
  const [phanCongDay, setPhanCongDay] = useState([giayTos]);
  const [hocViens, setHocVienss] = useState([]);
  // chon chuc vu

  /**
   * hander Back
   */
  const handerBack = () => {
    history.goBack();
  };

  const getHV = async (id) => {
    try {
      await dispatch(getHocVienRequest(id));
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    dispatch(getKhoaHocRequest());
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
        return (
          <option value={item.id}>
            {item.tenKH}
          </option>
        );
      });
    }

    return null;
  };


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
      phanCongDay == "" 
     

    if (isEmpty) {
      toast.success("Vui lòng nhập đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const data = {
      hoTen: hoTen,
      ngaySinh: ngaySinh,
      gioiTinh: gioiTinh,
      soDT: soDT,
      diaChi: diaChi,
      soCMND: soCMND,
      ngayCap: ngayCap,
      noiCap: noiCap,
      ghiChu: ghiChu,
      hinhAnh: hinhAnh,
      kyNangNghe: kyNangNghe,
      cNGVTHLX: cNGVTHLX,
      chuyenMon: chuyenMon,
      suPham: suPham,
      ngoaiNgu: ngoaiNgu,
      tinHoc: tinHoc,
      thamNienDay: thamNienDay,
      phanCongDay: phanCongDay,
      hocViens: hocViens,
    };
    console.log(data)
  };
 
  return (
    <React.Fragment>
      <Paper>
        <h1>Thêm mới giáo viên</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Họ và Tên"
                onChange={(e) => setHoTen(e.target.value)}
                value={hoTen}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setNgaySinh(e.target.value)}
                value={ngaySinh}
                type="date"
                label="Ngày Sinh"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setGioiTinh(e.target.value)}
                value={gioiTinh}
                label="Giới tính"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setNgayCap(e.target.value)}
                value={ngayCap}
                label="Ngày cấp"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setKyNangNghe(e.target.value)}
                value={kyNangNghe}
                label="Kỹ năng nghe"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setCNGVTHLX(e.target.value)}
                value={cNGVTHLX}
                label="cNGVTHLX"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => setChuyenMon(e.target.value)}
                value={chuyenMon}
                label="Chuyển môn"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={(e) => thamNienDay(e.target.value)}
                value={thamNienDay}
                label="Thâm niên dạy"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Select
              autoWidth
              native
              value={khoaHoc}
              onChange={handleChange}
              label='Khoá học'
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              {elmKhoahoc()}
        </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value = {hocViens}
                multiple
                id="checkboxes-tags-demo"
                options={hocVienss}
                onChange={(event, value) => setHocVienss(value)}
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
                    label="Hangh GPLX giáo viên"
                    placeholder="Favorites"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                // onClick={handerBack}
                startIcon={<DeleteIcon />}
                className={classes.button}
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
                type="submit"
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
