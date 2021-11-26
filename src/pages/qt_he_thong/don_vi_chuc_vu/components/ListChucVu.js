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
import { GetAllChucVuRequest, deleteChucVuRequest } from '../../../../reducers/quan-tri/ChucVu/ChucVuAction';
import { get as _get } from 'lodash';

const localizationStyle = {
  pagination: {
      labelDisplayedRows: '{from}-{to} Tổng {count}',
      firstTooltip: 'Trang đầu',
      previousTooltip: 'Trang trước',
      nextTooltip: 'Trang sau',
      lastTooltip: 'Trang cuối',
      labelRowsSelect: 'Dòng'
  },
  body: {
      emptyDataSourceMessage: 'Không có dữ liệu',
  }
};

/**                                                                                                                                                       
 * List chuc vu                                                                                                                                   
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function ListChucVu() {
  const history = useHistory();
  const dispatch = useDispatch();

  // listen data of grid                                                                                                                                  
  const rows = useSelector((state) => _get(state, "chucVus.chucVus", []));

  /**
   * confirm delete item
   * @param {*} id 
   */
  const confirmDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteChucVuRequest(id));
      toast.success('Xóa chức vụ thành công!', {
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

  /**                                                                                                                                                     
   * Get chucvu Request                                                                                                                         
   */
  useEffect(() => {
    dispatch(GetAllChucVuRequest());
  }, []);

  /**
 * columns on table
 */
  const columns = [
    { field: 'tenChucVu', title: 'Tên chức vụ' },
    { field: 'moTa', title: 'Mô tả' },
    { field: 'action', title: 'Thao tác' },
  ];
  
  const data = rows.map((row, index) => ({
    tenChucVu: row.tenChucVu,
    moTa: row.moTa == null || row.moTa == '' ? 
            '' : row.moTa.length > 40 ? 
            row.moTa.substr(0, 40) + '...' : row.moTa,
    action: <div>
      <Link to={`/qt_he_thong/chinh_sua_chuc_vu/${row.id}`} >
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
        title="Danh Sách Chức Vụ"
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => (
              <Link to={`/qt_he_thong/them_chuc_vu`}>
                <AddIcon />
              </Link>
            ),
            tooltip: "Thêm mới chức vụ",
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
            backgroundColor: '#EEE',
          }
        }}
        localization={localizationStyle}
      />

      <ToastContainer />
    </div>
  );
}
