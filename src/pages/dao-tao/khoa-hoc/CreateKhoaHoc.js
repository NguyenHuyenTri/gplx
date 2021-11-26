import CreateFormKhoaHoc from "./components/CreateFormKhoaHoc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import { createKhoaHocRequest } from "../../../reducers/dao-tao/KhoaHoc/KhoaHocAction";

/**                                                                                                                                   
 * Create Khoa Hoc                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreateKhoaHoc = (props) => {
    const dispatch = useDispatch();

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            // create data when click button add
            await dispatch(createKhoaHocRequest(values));
            toast.success('Thêm khóa học thành công!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                window.history.back();
            }, 2000);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="card">   
                <div className="card-header"><b>Thêm mới khóa học</b></div>
                <div className="card-body">
                    <CreateFormKhoaHoc onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

CreateKhoaHoc.propTypes = {};

export default CreateKhoaHoc;