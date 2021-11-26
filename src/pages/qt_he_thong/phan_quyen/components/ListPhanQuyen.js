import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { GetAllPhanQuyenRequest } from '../../../../reducers/quan-tri/PhanQuyen/PhanQuyenAction';
import { get as _get } from 'lodash';

const localizationStyle = {
    header: {
        actions: 'Thao tác  ',
        width: '50%'
    },
    pagination: {
        labelDisplayedRows: '{from}-{to} Tổng {count}',
        firstTooltip: 'Trang đầu',
        previousTooltip: 'Trang trước',
        nextTooltip: 'Trang sau',
        lastTooltip: 'Trang cuối',
        labelRowsSelect: 'Dòng'
    },
    toolbar: {
        nRowsSelected: '{0} hàng đã được chọn'
    },
    body: {
        emptyDataSourceMessage: 'Không có dữ liệu',
        editRow: {
            deleteText: 'Xác nhận thu!!!',
            cancelTooltip: 'Hủy',
            saveTooltip: 'Đồng ý',
        },
        deleteTooltip: 'Xác nhận',
        editTooltip: 'Chỉnh sửa'
    }
};

/**                                                                                                                                                       
 * List nhom chuc nang, nguoi dung, phan quyen                                                                                                                                   
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function ListPhanQuyen() {
    const dispatch = useDispatch();

    // listen data of grid                                                                                                                                  
    const rows = useSelector((state) => _get(state, "phanQuyens.phanQuyens", []));

    /**
     * confirm delete item
     * @param {*} id 
     */
    const confirmDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            // dispatch(deleteSanTapLaiRequest(id));
            toast.success('Xóa người dùng thành công!', {
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
     * get all nhom quyen request
     */
    useEffect(() => {
        dispatch(GetAllPhanQuyenRequest());
    }, []);

    /**
     * columns map with table
     */
    const columns = [
        { field: 'hoTen', title: 'Họ tên' },
        { field: 'soDT', title: 'Số điện thoại' },
        { field: 'donVi', title: 'Đơn vị' },
        { field: 'tenChucVu', title: 'Chức vụ' },
        { field: 'action', title: 'Thao Tác' },
    ];

    const data = rows.map((row, index) => ({
        hoTen: row.hoTen,
        soDT: row.soDT,
        donVi: row.donVi == null || row.donVi == ''
            ? 'Chưa xác định đơn vị'
            : row.donVi.tenDonVi,
        tenChucVu: row.taiKhoan == null || row.donVi == ''
            ? 'Chưa có chức vụ'
            : row.taiKhoan.chucVu.tenChucVu,
        action: <div>
            <Link to={`/qt_he_thong/chinh_sua_san_tap_lai/${row.id}`} >
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
                title="Danh Sách Nhóm Quyền & Người dùng"
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: () => (
                            <Link to={`/qt_he_thong/them_phan_quyen`}>
                                <AddIcon />
                            </Link>
                        ),
                        tooltip: "Thêm mới người dùng",
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