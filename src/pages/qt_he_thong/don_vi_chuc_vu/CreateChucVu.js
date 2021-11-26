import CreateFormChucVu from "./components/CreateFormChucVu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import { createChucVuRequest } from "../../../reducers/quan-tri/ChucVu/ChucVuAction";

/**                                                                                                                                   
 * Create Chuc Vu                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreateChucVu = (props) => {
    const dispatch = useDispatch();

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            // create data when click button add
            await dispatch(createChucVuRequest(values));
            toast.success('Thêm chức vụ thành công!', {
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

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Thêm mới chức vụ</b></div>
                <div className="card-body">
                    <CreateFormChucVu onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

CreateChucVu.propTypes = {};

export default CreateChucVu;
