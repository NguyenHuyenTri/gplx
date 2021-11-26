import EditFormDonVi from "./components/EditFormDonVi";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  getDonViByIdRequest, updateDonViRequest } from "../../../../reducers/quan-tri/DonVi/DonViAction";


/**                                                                                                                                   
 * Edit DonVi                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditDonVi = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    let history = useHistory();
    const donVi = useSelector((state) => state.donVis.donVi);
    const loading = useSelector((state) => state.donVis.isLoading);
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
            await dispatch(updateDonViRequest(values, id));
            toast.success('Chỉnh sửa đơn vị thành công!', {
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
                await dispatch(getDonViByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);
    if (donVi.trangThai != undefined) {
        donVi.trangThai1 = donVi.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa đơn vị</b></div>
                <div className="card-body">
                    {!loading && (<EditFormDonVi donVi={donVi} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditDonVi.propTypes = {};

export default EditDonVi;