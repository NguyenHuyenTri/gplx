import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import CreateFormPhanQuyen from "../../../pages/qt_he_thong/phan_quyen/components/CreateFormPhanQuyen";
import { useHistory } from 'react-router';

/**                                                                                                                                   
 * Create Khoa Hoc                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreatePhanQuyen = (props) => {
    const dispatch = useDispatch();
    const history = useHistory()

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            console.log(values);
            // create data when click button add
            // await dispatch(createKhoaHocRequest(values));
            toast.success('Thêm người dùng thành công!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // setTimeout(() => {
            //     history.goBack();
            // }, 2000);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="card">   
                <div className="card-header"><b>Thêm mới người dùng</b></div>
                <div className="card-body">
                    <CreateFormPhanQuyen onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

CreatePhanQuyen.propTypes = {};

export default CreatePhanQuyen;