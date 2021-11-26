import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MaterialTable from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { GetAllThueXeRequest, deleteThueXeRequest } from '../../../../../reducers/quan-tri/ThueXe/ThueXeAction';
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
 * List Thue Xe                                                                                                                                   
 * @param {*} props                                                                                                                                       
 * @returns                                                                                                                                               
 */
export default function ListThueXe() {
    const history = useHistory();
    const dispatch = useDispatch();

    // listen data of grid                                                                                                                                  
    const rows = useSelector((state) => _get(state, "xes.xes", []));

    /**
     * get all thue xe request
     */
    useEffect(() => {
        dispatch(GetAllThueXeRequest());
    }, []);


    /**
     * columns map with table
     */
    const columns = [
        {
            field: 'bienSoXe', title: 'Biển Số Xe', render: rowData => {
                return (<Link to={`/ql_xe/thong_tin_xe/${rowData.id}`}>
                    {rowData.bienSoXe}
                </Link>)
            },
            type: 'html'
        },
        { field: 'loaiXe', title: 'Loại Xe' },
        { field: 'hangXe', title: 'Nhãn Hiệu - Loại' },
        { field: 'giaThueXe', title: 'Giá Tiền Thuê Xe' },
        { field: 'trangThai', title: 'Trạng Thái' },
        { field: 'action', title: 'Thao tác', width: '50%' },
    ];

    const data = rows.map((row, index) => ({
        id: row.id,
        bienSoXe: row.bienSoXe,
        loaiXe: row.loaiXe.tenLoaiXe,
        hangXe: row.hangXe + ' - ' + row.dongXe,
        giaThueXe: row.giaThueXe === null ? '0 VND' : row.giaThueXe.toLocaleString('en') + ' VND',
        soLuongXe: row.soLuongXe === 'undefined' || row.soLuongXe === null ? '' : row.soLuongXe,
        trangThai: row.trangThai ? 'Hiệu lực' : 'Chưa hiệu lực',
        action: <div>
            <Link to={`/qt_he_thong/chinh_sua_thue_xe/${row.id}`} >
                <button type="button" className="btn btn-primary px-3" style={{ borderRadius: "0px" }}>
                    <i className="fas fa-pencil-alt" aria-hidden="true"></i></button>
            </Link>
        </div>
    }));

    return (
        <div>
            <MaterialTable
                title="Danh Sách Thuê Xe"
                columns={columns}
                data={data}
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