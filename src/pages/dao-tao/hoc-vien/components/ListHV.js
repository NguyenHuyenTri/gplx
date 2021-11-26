import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { get as _get } from "lodash";
import moment from "moment";

export default function ListHV(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // listen data of grid
  const rows = useSelector((state) =>
    _get(state, "dthv.hocViens.hocViens", [])
  );

  const submit = async (id) => {};
  const columns = [
    { field: "hoTen", title: "Họ và tên", align: "center" },
    {
      field: "ngaySinh",
      title: "Ngày Sinh",
      align: "center",
    },

    {
      field: "soCMND",
      title: "Số CMND/HC",
      align: "center",
    },

    {
      field: "diaChi",
      title: "Địa chỉ",
      cellStyle: {
        width: 250,
        maxWidth: 250,
      },
      align: "center",
    },

    {
      field: "SDT",
      title: "Số điện thoại",
      cellStyle: {
        width: 250,
        maxWidth: 250,
      },
      align: "center",
    },
  ];

  const data = rows.map((row, index) => ({
    id: row.id,
    hoTen: row.hoTen,
    ngaySinh: moment(row.ngaySinh).format("DD/MM/YYYY"),
    soCMND: row.soCMND,
    diaChi: row.diaChi !==null ? row.diaChi.tenDayDu : row.diaChi,
    SDT: row.soDT,
  }));
  return (
    <MaterialTable
      title="Danh Sách Học Vien"
      columns={columns}
      data={data}
      onRowClick={(event, rowData) => {
        history.push(`/hoc_vien/chi_tiet_hv/${rowData.id}`);
      }}
      actions={[
        {
          icon: () => (
            <Link to={`/hoc_vien/them_hoc_vien`}>
              <AddIcon />
            </Link>
          ),
          tooltip: "Thêm mới HV",
          isFreeAction: true,
        },
        {
          tooltip: "Tải xuống",
          icon: "save_alt",
          onClick: function (evt, data) {
            data.map((value) => {
              console.log(value.id);
            });
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
