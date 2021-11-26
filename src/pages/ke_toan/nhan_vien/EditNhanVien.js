import FormEdit from "./components/FormEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get as _get, round } from 'lodash';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";



/**                                                                                                                                   
 * Edit giáo viên                                                                                                           
 * Edit nhân viên                                                                                                           
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditNhanVien = (props) => {

    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];
    console.log('iddđ', id)
    
    const dispatch = useDispatch();
    let history = useHistory();
    const nhanVienkt = useSelector((state) => state.nhanVienkt.nhanVienkt);
    const loading = useSelector((state) => state.nhanVienkt.isLoading);
    const status = [
        { value: true }, { value: false }
    ];

    const rows = useSelector((state) => _get(state, 'nhanVienkt.nhanVienkts', []));
    var nhanVien = null;
    rows.forEach(item => {
        if(item.id == id){
            nhanVien = item;
            console.log('phuong', nhanVien);
        }
    });
    console.log(rows)

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            console.log('update là ', values);
        } catch (error) {
            alert(error);
        }
    };


    if (nhanVienkt.trangThai != undefined) {
        nhanVienkt.trangThai1 = nhanVienkt.trangThai;
    }

    return (
        <>
            <div className="card">

                <div className="card-header"><b>Chỉnh sửa kế toán nhân viên</b></div>
                <div className="card-body">
                    {/* Form submit */}
                    {(<FormEdit nhanVienkt={nhanVien} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditNhanVien.propTypes = {};

export default EditNhanVien;