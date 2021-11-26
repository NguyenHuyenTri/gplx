import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import { get as _get } from "lodash";
import moment from "moment";
import {
  exportGiaoVienRequest,
  GetGiaoVienRequest,
} from "../../../../reducers/dao-tao/GiaoVien/GiaoVienAction";

export default function MaterialTableDemo(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // listen data of grid
  const rows = useSelector((state) => _get(state, "giaoVien.giaoViens", []));
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
   * GetXeRequest
   */
  useEffect(() => {
    dispatch(GetGiaoVienRequest());
  }, []);

  const columns = [
    { field: "hoTen", title: "Họ tên" },
    {
      field: "ngaySinh",
      title: "Ngày Sinh",
    },

    {
      field: "diaChi",
      title: "Địa chỉ",
    },

    {
      field: "soDT",
      title: "Số điện thoại",
    },

    {
      field: "ghiChu",
      title: "Ghi chú",
    },
  ];

  const data = rows.map((row, index) => ({
    id: row.id,
    hoTen: <Link to={`/giao_vien/chi_tiet_gv/${row.id}`} style={{paddingTop:10,paddingBottom:10,textDecoration:'none'}} >{row.hoTen}</Link>,
    ngaySinh: moment(row.ngaySinh).format("DD/MM/YYYY"),
    diaChi: row.diaChi,
    soDT: row.soDT,
    ghiChu: row.ghiChu,
  }));
  return (
    <MaterialTable
      title="Danh Sách Giáo Viên"
      columns={columns}
      data={data}
      actions={[
        {
          icon: () => (
            <Link to={`/giao_vien/them_giao_vien`}>
              <AddIcon />
            </Link>
          ),
          tooltip: "Thêm mới giáo vien",
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
                console.log(listId);
              }
            }
            dispatch(exportGiaoVienRequest(listId));
          }
        },
        {
          tooltip: "Tải xuống",
          icon: "save_alt",
          onClick: function (evt, data) {
            if (data.length > 0) {
              var listId = [];
              for (var i = 0; i < data.length; i++) {
                listId[i] = data[i].id;
                console.log(listId);
              }
            }
            dispatch(exportGiaoVienRequest(listId));
          },
        },
      ]}
      options={{
        search: true,
        rowStyle: {
          backgroundColor: "#EEE",
        },
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
        },
        selection: true,
      }}
    />
  );
}
