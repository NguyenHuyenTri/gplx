import CreateFormGiayTo from "./components/CreateFormGiayTo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import { createGiayToRequest } from "../../../reducers/quan-tri/GiayTo/GiayToAction";

/**                                                                                                                                   
 * Create giay to                                                                                                             
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreateGiayTo = (props) => {
    const dispatch = useDispatch();

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            // create data when click button add
            await dispatch(createGiayToRequest(values));

            toast.success('Thêm giấy tờ thành công!', {
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
                <div className="card-header"><b>Thêm mới giấy tờ</b></div>
                <div className="card-body">
                    <CreateFormGiayTo onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

CreateGiayTo.propTypes = {};

export default CreateGiayTo;
