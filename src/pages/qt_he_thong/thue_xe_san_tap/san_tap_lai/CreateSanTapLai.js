import CreateFormSanTapLai from "./components/CreateFormSanTapLai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import { createSanTapLaiRequest } from "../../../../reducers/quan-tri/SanTapLai/SanTapLaiAction";

/**                                                                                                                                   
 * Create san tap lai                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreateSanTapLai = (props) => {
    const dispatch = useDispatch();

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            if (values.soLuongXe < 0) {
                toast.success('Số lượng xe phải lớn hơn 0!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (values.gia < 0) {
                toast.success('Giá thành phải lớn hơn 0!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                await dispatch(createSanTapLaiRequest(values));
                toast.success('Thêm sân tập thành công!', {
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
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Thêm mới sân tập</b></div>
                <div className="card-body">
                    <CreateFormSanTapLai onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


CreateSanTapLai.propTypes = {};

export default CreateSanTapLai;