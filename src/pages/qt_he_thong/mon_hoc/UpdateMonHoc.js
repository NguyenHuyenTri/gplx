import UpdateFormMonHoc from "./components/UpdateFormMonHoc";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getMonHocByIdRequest,
  updateMonHocRequest,
} from "../../../reducers/quan-tri/MonHoc/MonHocAction";


/**                                                                                                                                   
 * Edit MonHoc                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const UpdateMonHoc = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    let history = useHistory();
    const monHoc = useSelector((state) => state.monHoc.monHoc);
    const loading = useSelector((state) => state.monHoc.isLoading);
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
            console.log(values);
            await dispatch(updateMonHocRequest(values, id));
            toast.success('Chỉnh sửa môn học thành công!', {
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
                await dispatch(getMonHocByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);
    if (monHoc.trangThai != undefined) {
      monHoc.trangThai1 = monHoc.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa môn học</b></div>
                <div className="card-body">
                    {/* Form submit */}
                    {!loading && (<UpdateFormMonHoc monHoc={monHoc} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


UpdateMonHoc.propTypes = {};

export default UpdateMonHoc;