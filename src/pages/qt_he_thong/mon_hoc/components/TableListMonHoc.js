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
import { GetMonHocRequest, deleteMonHocRequest } from '../../../../reducers/quan-tri/MonHoc/MonHocAction';
import { get as _get } from 'lodash';


/**                                                                                                                                                       
 * List chuc vu                                                                                                                                   
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function TableListMonHoc() {
  const history = useHistory();
  const dispatch = useDispatch();

  // listen data of grid                                                                                                                                  
  const rows = useSelector((state) => _get(state, "monHoc.monHocs", []));

  /**
   * confirm delete item
   * @param {*} id 
   */
  const confirmDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteMonHocRequest(id));
      toast.success('Xóa môn học thành công!', {
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
   * Get môn học Request                                                                                                                         
   */
  useEffect(() => {
    dispatch(GetMonHocRequest());
  }, []);

  /**
 * columns on table
 */
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
  const columns = [
    { field: 'tenMH', title: 'Tên Môn Học' },
    { field: 'soVBPL', title: 'Số VBPL', width: "30%" },
    { field: 'ghiChu', title: 'Ghi Chú' },
    { field: 'trangThai', title: 'Trạng Thái' },
    { field: 'action', title: 'Thao tác' },
  ];

  const data = rows.map((row, index) => ({
    tenMH: row.tenMH,
    soVBPL: row.soVBPL,
    ghiChu: row.ghiChu,
    trangThai: row.trangThai == true ? 'Hiệu lực' : 'Chưa hiệu lực',
    action: <div>
      <Link to={`/qt_he_thong/sua_mon_hoc/${row.id}`} >
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
        title="Danh Sách Môn Học"
        columns={columns}
        data={data}
        localization={localizationStyle}
        actions={[
          {
            icon: () => (
              <Link to={`/qt_he_thong/them_moi_mon_hoc`}>
                <AddIcon />
              </Link>
            ),
            tooltip: "Thêm mới môn học",
            isFreeAction: true,
          },
        ]}
        options={{
          labelRowsSelect: 'Dòng',
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
      />

      <ToastContainer />
    </div>
  );
}
