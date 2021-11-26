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
import { GetAllSanTapLaiRequest, deleteSanTapLaiRequest } from '../../../../../reducers/quan-tri/SanTapLai/SanTapLaiAction';
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
 * List San Tap Lai                                                                                                                                   
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function ListSanTapLai() {
    const dispatch = useDispatch();

    // listen data of grid                                                                                                                                  
    const rows = useSelector((state) => _get(state, "sanTLs.sanTLs", []));

    /**
     * confirm delete item
     * @param {*} id 
     */
    const confirmDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            dispatch(deleteSanTapLaiRequest(id));
            toast.success('Xóa sân tập thành công!', {
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
     * get all san tap lai request
     */
    useEffect(() => {
        dispatch(GetAllSanTapLaiRequest());
    }, []);

    /**
     * columns map with table
     */
    const columns = [
        { field: 'tenSan', title: 'Tên Sân Tập', width: "30%" },
        { field: 'gia', title: 'Giá tiền thuê sân' },
        { field: 'soLuongXe', title: 'Số Lượng Xe', width: "15%" },
        { field: 'action', title: 'Thao tác' },
    ];

    const data = rows.map((row, index) => ({
        tenSan: row.tenSan.length > 50 ? row.tenSan.substr(0, 50) + '...' : row.tenSan,
        gia: row.gia.toLocaleString('en') + ' VND',
        soLuongXe: row.soLuongXe,
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
                title="Danh Sách Sân Tập Lái"
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: () => (
                            <Link to={`/qt_he_thong/them_san_tap_lai`}>
                                <AddIcon />
                            </Link>
                        ),
                        tooltip: "Thêm mới sân tập lái",
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