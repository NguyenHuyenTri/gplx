import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  GetAllKhoaHocRequest,
  deleteKhoaHocRequest,
} from "../../../../reducers/dao-tao/KhoaHoc/KhoaHocAction";
import { get as _get } from "lodash";

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
};

/**
 * List khoa hoc
 * @param {*} props
 * @returns
 */
export default function ListKhoaHoc() {
  const history = useHistory();
  const dispatch = useDispatch();

  // listen data of grid
  const rows = useSelector((state) => _get(state, "khoaHocs.khoaHocs", []));

  /**
   * confirm delete item
   * @param {*} id
   */
  const confirmDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      dispatch(deleteKhoaHocRequest(id));
      toast.success("Xóa khóa học thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
    }
  };

  /**
   * get all khoa hoc request
   */
  useEffect(() => {
    dispatch(GetAllKhoaHocRequest());
  }, []);

  /**
   * columns map with table
   */
  const columns = [
    {
      field: "tenKH",
      title: "Tên khóa học",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: "soQDKG",
      title: "Số QĐ KG",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: "ngayKG",
      title: "Ngày KG",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: "ngayBG",
      title: "Ngày BG",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: "thoigianDT",
      title: "Thời gian đào tạo",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: "tongHV",
      title: "Tổng số học viên",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      field: "hangDT",
      title: "Hạng đào tạo",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      field: "action",
      title: "Thao tác",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
  ];

  const data = rows.map((row, index) => ({
    tenKH: row.tenKH,
    soQDKG: row.soQDKG,
    ngayKG: moment(row.ngayKG).format("DD/MM/YYYY"),
    ngayBG: moment(row.ngayBG).format("DD/MM/YYYY"),
    thoigianDT: row.thoigianDT,
    tongHV: row.tongHV,
    hangDT: row.hangDT == null ? "Chưa có hạng" : row.hangDT.tenHang,
    action: (
      <div>
        <Link to={`/dao_tao/chinh_sua_khoa_hoc/${row.id}`}>
          <button
            type="button"
            className="btn btn-primary px-3"
            style={{ borderRadius: "0px" }}
          >
            <i className="fas fa-pencil-alt" aria-hidden="true"></i>
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger px-3"
          style={{ borderRadius: "0px" }}
          onClick={() => {
            confirmDelete(row.id);
          }}
        >
          <i className="fas fa-trash-alt" aria-hidden="true"></i>
        </button>
      </div>
    ),
  }));

  return (
    <div>
      <MaterialTable
        title="Danh Sách Khóa Học"
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => (
              <Link to={`/dao_tao/them_khoa_hoc`}>
                <AddIcon />
              </Link>
            ),
            tooltip: "Thêm mới khóa học",
            isFreeAction: true,
          },
        ]}
        options={{
          search: true,
          tablelayout: "fixed",
          headerStyle: {
            backgroundColor: "#01579B",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#EEE",
          },
        }}
        localization={localizationStyle}
      />
      <ToastContainer />
    </div>
  );
}
