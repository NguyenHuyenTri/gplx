import EditFormChucVu from "./components/EditFormChucVu";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  getChucVuByIdRequest, updateChucVuRequest } from "../../../reducers/quan-tri/ChucVu/ChucVuAction";


/**                                                                                                                                   
 * Edit ChucVu                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditChucVu = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    let history = useHistory();
    const chucVu = useSelector((state) => state.chucVus.chucVu);
    const loading = useSelector((state) => state.chucVus.isLoading);
    const status = [
        { value: true }, { value: false }
    ];

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            // create data when click button add
            values.trangThai = values.trangThai1;
            await dispatch(updateChucVuRequest(values, id));
            toast.success('Chỉnh sửa chức vụ thành công!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                window.history.back();
            }, 1000);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const fetching = async () => {
            try {
                await dispatch(getChucVuByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);
    if (chucVu.trangThai != undefined) {
        chucVu.trangThai1 = chucVu.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa chức vụ</b></div>
                <div className="card-body">
                    {!loading && (<EditFormChucVu chucVu={chucVu} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditChucVu.propTypes = {};

export default EditChucVu;