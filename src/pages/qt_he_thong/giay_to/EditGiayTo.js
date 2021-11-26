import EditFormGiayTo from "./components/EditFormGiayTo";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getGiayToByIdRequest, updateGiaytoRequest } from "../../../reducers/quan-tri/GiayTo/GiayToAction";


/**                                                                                                                                   
 * Edit Giay to                                                                                                             
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditGiayTo = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    const giayTo = useSelector((state) => state.giayTos.giayTo);
    const loading = useSelector((state) => state.giayTos.isLoading);
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
            await dispatch(updateGiaytoRequest(values, id));
            toast.success('Chỉnh sửa giấy tờ thành công!', {
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
                await dispatch(getGiayToByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);
    if (giayTo.trangThai != undefined) {
        giayTo.trangThai1 = giayTo.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa giấy tờ</b></div>
                <div className="card-body">
                    {!loading && (<EditFormGiayTo giayTo={giayTo} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditGiayTo.propTypes = {};

export default EditGiayTo;