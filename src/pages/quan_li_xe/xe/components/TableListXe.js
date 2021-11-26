import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  exportXeRequest,
  GetXeRequest,
} from "../../../../reducers/qly-xe/Xe/XeAction";
import { get as _get } from "lodash";
import moment from "moment";

export default function MaterialTableDemo(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // listen data of grid
  const rows = useSelector((state) => _get(state, "xe.xes", []));

  /**
   * GetXeRequest
   */
  useEffect(() => {
    dispatch(GetXeRequest());
  }, []);

  const columns = [
    { field: "bienSoXe", title: "Biển số", align: "center",cellStyle: {
      minWidth: 100,
      maxWidth: 100,
    },
  },
    
    {
      field: "loaiXe",
      title: "Loại xe",
      align: "center",
      cellStyle: {
        minWidth: 100,
        maxWidth: 100,
      },
    },

    {
      field: "NHXe",
      title: "Nhãn hiệu - Loại",
      cellStyle: {
        width: 270,
        maxWidth: 270
      },
      align: "center",
    },

    {
      field: "ttkd",
      title: "TT Kiểm định",
      cellStyle: {
        width: 450,
        maxWidth: 450,
      },
      align: "center",
    },

    {
      field: "ttbh",
      title: "TT Bảo hiểm",
      cellStyle: {
        width: 700,
        maxWidth: 700,
      },
      align: "center",
    },

    {
      field: "chuSoHuu",
      title: "Chủ sở hữu",
      align: "center",
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
  ];

  const data = rows.map((row, index) => ({
    id: row.id,
    bienSoXe: <Link to={`/ql_xe/thong_tin_xe/${row.id}`} style={{textDecoration:'none'}} >{row.bienSoXe}</Link>,
    loaiXe: row.loaiXe.tenLoaiXe,
    NHXe: row.hangXe + " - " + row.dongXe,
    ttkd:
      moment(row.ngayCapKD).format("DD/MM/YYYY") +
      " - " +
      moment(row.ngayHHKD).format("DD/MM/YYYY"),
    ttbh:
      moment(row.ngayGioCapBH).format("DD/MM/YYYY HH:mm:ss") +
      " - " +
      moment(row.ngayGioHHBH).format("DD/MM/YYYY HH:mm:ss"),
    chuSoHuu:
      row.chuSoHuu === "Xe chính chủ" && row.giaoVien != null
        ?  row.giaoVien.hoTen
        : row.chuSoHuu,
  }));
  return (
    <MaterialTable
      title="Danh Sách Xe"
      columns={columns}
      data={data}
      actions={[
        {
          icon: () => (
            <Link to={`/ql_xe/them_xe`}>
              <AddIcon />
            </Link>
          ),
          tooltip: "Thêm mới xe",
          isFreeAction: true,
        },
        {
          tooltip: "Tải xuống",
          icon: "save_alt",
          isFreeAction: true,
          onClick: function (evt, data) {
            if (data.length > 0) {
              var listId = []; 
              for (var i = 0; i < data.length; i++) {
                listId[i] = data[i].id;
              }
            }

            dispatch(exportXeRequest(listId));
          },
        },
        {
          tooltip: "Tải xuống",
          icon: "save_alt",
          onClick: function (evt, data) {
            if (data.length > 0) {
              var listId = []; 
              for (var i = 0; i < data.length; i++) {
                listId[i] = data[i].id;
              }
            }

            dispatch(exportXeRequest(listId));
          },
        },
      ]}
      options={{
        search: true,
        tablelayout: "fixed",
        rowStyle: {
          backgroundColor: "#EEE",
        },
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
        },
        selection: true,
      }}
      localization={{
        header: {
          actions: 'Thao tác',
        },
        toolbar: {
          nRowsSelected: '{0} hàng đã được chọn',
          searchTooltip: 'Tìm kiếm',
          searchPlaceholder: 'Tìm kiếm',
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} Tổng {count}',
          firstTooltip: 'Trang đầu',
          previousTooltip: 'Trang trước',
          nextTooltip: 'Trang sau',
          lastTooltip: 'Trang cuối',
          labelRowsSelect: 'Dòng'
        },
       
      }}
    />
  );
}