import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { get as _get } from "lodash";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Tooltip,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  GetComboboxHangDaoTaoRequest,
  GetAllHangDaoTaoRequest,
  getHangGPLXDaoTaoByIdRequest,
  deleteHangDaoTaoRequest,
} from "../../../reducers/quan-tri/HangDaoTao/HangDaoTaoAction";
import AddHangDaoTao from "./AddHangDaoTao";
import EditHangDaoTao from "./EditHangDaoTao";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(3),
    minWidth: 80,
  },
}));

const HangDaoTao = () => {
  let query = window.location.pathname.split("/");
  let id = query[query.length - 1];

  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [select, setSelect] = useState(id);
  const [idDelete, setIdDelete] = useState(-1);

  //page create hạng đào tạo
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [pushData, setPushData] = useState();

  const comboboxGPLX = useSelector((state) =>
    _get(state, "hangDaoTao.comboboxHDT", [])
  );
  const rows = useSelector((state) =>
    _get(state, "hangDaoTao.hangdaotaos", [])
  );

  const columns = [
    {
      field: "tenHangShow",
      title: "Tên hạng đào tạo",
      cellStyle: {
        minWidth: 180,
        maxWidth: 180,
      },
      customFilterAndSearch: (term, rowData) => (rowData.tenHang).indexOf(term) != -1
    },
    {
      field: "soVBPL",
      title: "Số VBPL",
      cellStyle: {
        minWidth: 220,
        maxWidth: 220,
      },
    },
    {
      field: "tuoiHV",
      title: "Tuổi",
      cellStyle: {
        minWidth: 80,
        maxWidth: 80,
      },
    },
    {
      field: "thamNien",
      title: "Thâm niên",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },

    {
      field: "kmLaiXe",
      title: "Km lái xe",
      cellStyle: {
        minWidth: 130,
        maxWidth: 130,
      },
    },
    {
      field: "moTa",
      title: "Mô tả",
      cellStyle: {
        minWidth: 300,
        maxWidth: 300,
      },
    },
    {
      field: "thoiGianDT",

      title: "Thời gian đào tạo (ngày)",

      cellStyle: {
        minWidth: 220,
        maxWidth: 220,
      },
    },
    {
      field: "ghiChu",
      title: "Ghi chú",
      cellStyle: {
        minWidth: 250,
        maxWidth: 250,
      },
    },
  ];

  const result = rows.map((rows, index) => ({
    i: index,
    id: rows.id,
    tenHang: rows.tenHang,
    tenHangShow: (
      <Link
        to={`/qt_he_thong/mon_hoc_hang_dao_tao/${rows.id}`}
        style={{ paddingTop: 10, paddingBottom: 10, textDecoration: "none" }}
      >
        {rows.tenHang}
      </Link>
    ),

    soVBPL: rows.soVBPL,
    tuoiHV: rows.tuoiHV,
    thamNien: rows.thamNien,
    moTa: rows.moTa,
    thoiGianDT: rows.thoiGianDT,
    ghiChu: rows.ghiChu,
    kmLaiXe: rows.kmLaiXe,
    hangGPLX: rows.hangGPLX,
  }));

  const handleChange = (value) => {
    setSelect(value);
    if (value === "all") {
      dispatch(GetAllHangDaoTaoRequest());
    } else {
      getIdDaoTao(value);
    }
  };

  const handleDetele = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        await dispatch(deleteHangDaoTaoRequest(id));
        getIdDaoTao(select);
        setOpen(false);
        alertSuccess("Xóa hạng đào tạo thành công!");
      } catch (error) {
        alert(error.toString());
      }
    }
  };

  const alertSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const alertFailed = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const fetching = async () => {
      await dispatch(getHangGPLXDaoTaoByIdRequest(id));
      await dispatch(GetComboboxHangDaoTaoRequest());
    };
    fetching();
  }, []);

  const getIdDaoTao = async (id) => {
    try {
      await dispatch(getHangGPLXDaoTaoByIdRequest(id));
    } catch (error) {
      alert(error);
    }
  };

  const getCreate = () => {
    setIsCreate(true);
  };

  const getUpdate = (values) => {
    setIsUpdate(true);
    setPushData(values);
  };

  const closeAll = () => {
    setIsCreate(false);
    setIsUpdate(false);
  };

  const goBack = () => {
    history.goBack();
  };

  if (isCreate) {
    return (
      <AddHangDaoTao
        selectId={select}
        closeCreate={closeAll}
        getIdDaoTao={handleChange}
      />
    );
  }

  if (isUpdate) {
    return (
      <EditHangDaoTao
        closeUpdate={closeAll}
        data={pushData}
        combobox={comboboxGPLX}
        getIdDaoTao={getIdDaoTao}
      />
    );
  }

  return (
    <>
      <MaterialTable
        title="Danh sách hạng đào tạo"
        columns={columns}
        data={result}
        actions={[
          {
            tooltip: "Thêm hạng đào tạo",
            isFreeAction: true,
            // link: `/qt_he_thong/them_hang_dao_tao/${id}`,
            onClick: (event, rowData) => getCreate(rowData),
          },
          {
            tooltip: "Cập nhật",
            icon: "fas fa-pencil-alt",
            color: "btn-primary",
            onClick: (event, rowData) => getUpdate(rowData),
            // onClick: (event, rowData) => history.push(`/qt_he_thong/sua_hang_dao_tao/${rowData.id}`)
          },
          {
            tooltip: "Xóa",
            color: "btn-danger",
            icon: "fas fa-trash-alt",
            onClick: (event, rowData) => handleDetele(rowData.id),
          },
        ]}
        components={{
          Toolbar: (props) => (
            <div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Chọn hạng GPLX
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={select}
                      onChange={(e) => handleChange(e.target.value)}
                      label="Chọn hạng GPLX"
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      {comboboxGPLX.map((value) => (
                        <MenuItem key={value.id} value={value.id}>
                          {value.tenHang}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Typography
                  container
                  direction="row"
                  style={{ height: 60 }}
                  align="right"
                >
                  <Tooltip
                    style={{ boxShadow: "none" }}
                    title="Đóng hạng đào tạo"
                    onClick={goBack}
                  >
                    <i
                      className="fas fa-times"
                      style={{ color: "#9fa6ad", padding: 20 }}
                      aria-hidden="true"
                    ></i>
                  </Tooltip>
                </Typography>
              </Grid>

              <MTableToolbar {...props} />
            </div>
          ),
          Action: (props) =>
            props.action.isFreeAction === true &&
            props.action.tooltip !== "Đóng hạng đào tạo" ? (
              <Tooltip
                style={{ boxShadow: "none" }}
                title={props.action.tooltip}
                onClick={(event) => props.action.onClick(event, props.data)}
              >
                <Add />
              </Tooltip>
            ) : (
              <Tooltip title={props.action.tooltip}>
                <button
                  type="button"
                  className={`btn ${props.action.color} px-3`}
                  style={{ borderRadius: "0px" }}
                  onClick={(event) => props.action.onClick(event, props.data)}
                >
                  <i
                    className={props.action.icon}
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  ></i>
                </button>
              </Tooltip>
            ),
        }}
        options={optionStyle}
        localization={localizationStyle}
      ></MaterialTable>
      <ToastContainer />
    </>
  );
};

const optionStyle = {
  search: true,
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: "#01579b",
    color: "#FFF",
  },
  actionsCellStyle: {
    hover: false,
    width: 200,
    align: "center",
  },
  // selection: true,
  rowStyle: {
    backgroundColor: "#EEE",
  },
};
const localizationStyle = {
  header: {
    actions: "Thao tác",
  },
  pagination: {
    labelDisplayedRows: "{from}-{to} Tổng {count}",
    firstTooltip: "Trang đầu",
    previousTooltip: "Trang trước",
    nextTooltip: "Trang sau",
    lastTooltip: "Trang cuối",
    labelRowsSelect: "Dòng",
  },
  body: {
    emptyDataSourceMessage: "Không có dữ liệu",
    editRow: {
      deleteText: "Xác nhận xóa đơn vị hành chính này!!!",
      cancelTooltip: "Hủy",
      saveTooltip: "Đồng ý",
    },
    deleteTooltip: "Xác nhận",
    editTooltip: "Chỉnh sửa",
  },
};

export default HangDaoTao;
