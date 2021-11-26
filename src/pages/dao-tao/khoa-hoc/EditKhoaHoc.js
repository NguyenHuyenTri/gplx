import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHangGPLXRequest, getKhoaHocByIdRequest } from '../../../reducers/dao-tao/KhoaHoc/KhoaHocAction';
import EditFormKhoaHoc from './components/EditFormKhoaHoc';
import { get as _get } from "lodash";
/**                                                                                                                                   
 * Edit khoa hoc                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditKhoaHoc = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();

    const khoaHoc = useSelector((state) => state.khoaHocs.khoaHoc);
    const loading = useSelector((state) => state.khoaHocs.isLoading);
    const hangGPLXs = useSelector((state) => _get(state, "khoaHocs.hangGPLXs", []));
    
    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            // await dispatch(updateThongBaoRequest(values, id));
            toast.success('Chỉnh sửa khóa học thành công!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // setTimeout(() => {
            //     window.history.back();
            // }, 1000);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const fetching = async () => {
            try {
                await dispatch(getKhoaHocByIdRequest(id));
            } catch (error) {
                alert(error);
            }
            dispatch(getHangGPLXRequest());
        };
        fetching();
    }, []);


    if (khoaHoc.hangGPLX != undefined) {
        khoaHoc.hangGPLX1 = khoaHoc.hangGPLX.id;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa khóa học</b></div>
                <div className="card-body">
                    {!loading && (<EditFormKhoaHoc khoaHoc={khoaHoc} onSubmit={submit} hangGPLXs={hangGPLXs} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditKhoaHoc.propTypes = {};

export default EditKhoaHoc;