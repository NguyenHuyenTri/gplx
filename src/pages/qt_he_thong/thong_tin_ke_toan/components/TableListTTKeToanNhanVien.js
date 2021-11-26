import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { GetTTKeToanNhanVienRequest, deleteTTKeToanRequest } from '../../../../reducers/quan-tri/TTKeToan/TTKeToanAction';
import { get as _get } from 'lodash';


/**                                                                                                                                                       
 * List TTKeToanNhanVien                                                                                                                                 
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function TableListTTKeToanNhanVien() {
  const history = useHistory();
  const dispatch = useDispatch();

  // listen data of grid                                                                                                                                  
  const rows = useSelector((state) => _get(state, "thongTinKTNVs.thongTinKTNVs", []));
  /**
   * confirm delete item
   * @param {*} id 
   */
  const confirmDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteTTKeToanRequest(id));
      toast.success('Xóa thành công!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
    }
  }

  const localizationStyle = {
    pagination: {
      labelDisplayedRows: '{from}-{to} Tổng {count}',
      firstTooltip: 'Trang đầu',
      previousTooltip: 'Trang trước',
      nextTooltip: 'Trang sau',
      lastTooltip: 'Trang cuối',
      labelRowsSelect: 'Dòng'
    },
  }

  /**                                                                                                                                                     
   * Get môn học Request                                                                                                                         
   */
  useEffect(() => {
    dispatch(GetTTKeToanNhanVienRequest());
  }, []);

  /**
 * columns on table
 */
  const columns = [
    { field: 'tenTruong', title: 'Tên trường' },
    { field: 'loai', title: 'Loại', width: "30%" },
    { field: 'ghiChu', title: 'Ghi Chú' },
    { field: 'action', title: 'Thao tác' },
  ];

  const data = rows.map((row, index) => ({
    tenTruong: row.tenTruong,
    loai: row.loai,
    ghiChu: row.ghiChu,
    action: <div>
      <Link to={`/qt_he_thong/sua_thong_tin_ke_toan/${row.id}`} >
        <button type="button" className="btn btn-primary px-3" style={{ borderRadius: "0px" }}>
          <i className="fas fa-pencil-alt" aria-hidden="true"></i></button>
      </Link>
      <button type="button" className="btn btn-danger px-3" style={{ borderRadius: "0px" }}
        onClick={() => {
          confirmDelete(row.id);
        }}
      ><i className="fas fa-trash-alt" aria-hidden="true"></i></button>

    </div>
  }));

  return (
    <div>
      <MaterialTable
        title="Thông tin kế toán cho nhân viên"
        columns={columns}
        data={data}
        localization={localizationStyle}
        actions={[
          {
            icon: () => (
              <Link to={`/qt_he_thong/them_moi_thong_tin_ke_toan`}>
                <AddIcon />
              </Link>
            ),
            tooltip: "Thêm mới thông tin kế toán",
            isFreeAction: true,
          },
        ]}
        options={{
          search:true,
          tablelayout: "fixed",
          headerStyle: {
            backgroundColor: "#01579B",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: '#EEE',
          }
        }}
      />

      <ToastContainer />
    </div>
  );
}
