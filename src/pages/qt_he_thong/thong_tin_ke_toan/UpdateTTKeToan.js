import UpdateFormTTKeToan from "./components/UpdateFormTTKeToan";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTTKeToanByIdRequest, updateTTKeToanRequest } from "../../../reducers/quan-tri/TTKeToan/TTKeToanAction";


/**                                                                                                                                   
 * Edit TTKeToan                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const UpdateTTKeToan = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    let history = useHistory();
    const thongTinKT = useSelector((state) => state.thongTinKTNVs.thongTinKT);
    const loading = useSelector((state) => state.thongTinKTNVs.isLoading);
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
            await dispatch(updateTTKeToanRequest(values, id));
            toast.success('Chỉnh sửa thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.history.back();
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const fetching = async () => {
            try {
                await dispatch(getTTKeToanByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);
    if (thongTinKT.trangThai != undefined) {
        thongTinKT.trangThai1 = thongTinKT.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa thông tin kế toán</b></div>
                <div className="card-body">
                    {/* Form submit */}
                    {!loading && (<UpdateFormTTKeToan thongTinKT={thongTinKT} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


UpdateTTKeToan.propTypes = {};

export default UpdateTTKeToan;