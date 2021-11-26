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
import { GetAllGiayToRequest, deleteGiayToRequest } from '../../../../reducers/quan-tri/GiayTo/GiayToAction';
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
 * ListGiayto                                                                                                                                   
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function ListGiayTo() {
  const history = useHistory();
  const dispatch = useDispatch();

  // listen data of grid                                                                                                                                  
  const rows = useSelector((state) => _get(state, "giayTos.giayTos", []));

  /**
   * confirm delete item
   * @param {*} id 
   */
  const confirmDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteGiayToRequest(id));
      toast.success('Xóa giấy tờ thành công!', {
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
  }

  /**                                                                                                                                                     
   * Get Giayto Request                                                                                                                         
   */
  useEffect(() => {
    dispatch(GetAllGiayToRequest());
  }, []);

  /**
 * columns on table
 */
  const columns = [
    { field: 'tenGT', title: 'Tên giấy tờ', width: "30%" },
    { field: 'soVBPL', title: 'Số VBPL' },
    { field: 'trangThai', title: 'Trạng thái' },
    { field: 'action', title: 'Thao tác' },
  ];

  const data = rows.map((row, index) => ({
    tenGT: row.tenGT == null || row.tenGT == '' ? 
              'Tên để trống' : 
              row.tenGT.length > 50 ? 
                row.tenGT.substr(0, 50) + '...' : 
                row.tenGT,
    soVBPL: row.soVBPL == null || row.soVBPL == '' ? 
              'Chưa thêm số' : 
              row.soVBPL.length > 17 ? 
                row.soVBPL.substr(0, 17) + '...' : 
                row.soVBPL,
    trangThai: row.trangThai ? 'Hiệu lực' : 'Chưa hiệu lực',
    action: <div>
      <Link to={`/qt_he_thong/chinh_sua_giay_to/${row.id}`} >
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
        title="Danh Sách Giấy Tờ"
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => (
              <Link to={`/qt_he_thong/them_giay_to`}>
                <AddIcon />
              </Link>
            ),
            tooltip: "Thêm mới giấy tờ",
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
