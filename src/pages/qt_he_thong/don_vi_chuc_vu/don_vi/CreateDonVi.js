import CreateFormDonVi from "./components/CreateFormDonVi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import { createDonViRequest } from "../../../../reducers/quan-tri/DonVi/DonViAction";

/**                                                                                                                                   
 * Create Don Vi                                                                                                          
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreateDonVi = (props) => {
    const dispatch = useDispatch();

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            // create data when click button add
            await dispatch(createDonViRequest(values));
            toast.success('Thêm đơn vị thành công!', {
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
                <div className="card-header"><b>Thêm mới đơn vị</b></div>
                <div className="card-body">
                    <CreateFormDonVi onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

CreateDonVi.propTypes = {};

export default CreateDonVi;
