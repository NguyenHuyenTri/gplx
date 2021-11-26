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
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditGiaoVien = (props) => {

    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];
    console.log('iddđ', id)
    
    const dispatch = useDispatch();
    let history = useHistory();
    const giaoVienkt = useSelector((state) => state.giaoVienkt.giaoVienkt);
    const loading = useSelector((state) => state.giaoVienkt.isLoading);
    const status = [
        { value: true }, { value: false }
    ];

    const rows = useSelector((state) => _get(state, 'giaoVienkt.giaoVienkts', []));
    var giaoVien = null;
    rows.forEach(item => {
        if(item.id == id){
            giaoVien = item;
            console.log('phuong', giaoVien);
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


    if (giaoVienkt.trangThai != undefined) {
        giaoVienkt.trangThai1 = giaoVienkt.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa kế toán giáo viên</b></div>
                <div className="card-body">
                    {/* Form submit */}
                    {(<FormEdit giaoVienkt={giaoVien} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditGiaoVien.propTypes = {};

export default EditGiaoVien;