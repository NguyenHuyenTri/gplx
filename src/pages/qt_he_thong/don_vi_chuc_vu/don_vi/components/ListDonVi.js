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
import { GetAllDonViRequest, deleteDonViRequest } from '../../../../../reducers/quan-tri/DonVi/DonViAction';
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
export default function ListDonVi() {
    const history = useHistory();
    const dispatch = useDispatch();

    // listen data of grid                                                                                                                                  
    const rows = useSelector((state) => _get(state, "donVis.donVis", []));

    /**
     * confirm delete item
     * @param {*} id 
     */
    const confirmDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
              dispatch(deleteDonViRequest(id));
            toast.success('Xóa đơn vị thành công!', {
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
     * Get chucvu Request                                                                                                                         
     */
    useEffect(() => {
        dispatch(GetAllDonViRequest());
    }, []);

    /**
   * columns on table
   */
    const columns = [
        { field: 'tenDonVi', title: 'Tên đơn vị' },
        { field: 'moTa', title: 'Mô tả' },
        { field: 'action', title: 'Thao tác' },
    ];

    const data = rows.map((row, index) => ({
        tenDonVi: row.tenDonVi,
        moTa: row.moTa == null || row.moTa == '' ?
            '' : row.moTa.length > 40 ?
                row.moTa.substr(0, 40) + '...' : row.moTa,
        action: <div>
            <Link to={`/qt_he_thong/chinh_sua_don_vi/${row.id}`} >
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
                title="Danh Sách Đơn Vị"
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: () => (
                            <Link to={`/qt_he_thong/them_don_vi`}>
                                <AddIcon />
                            </Link>
                        ),
                        tooltip: "Thêm mới đơn vị",
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
