import EditFormSanTapLai from "./components/EditFormSanTapLai";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSanTapLaiByIdRequest, updateSanTapLaiRequest } from "../../../../reducers/quan-tri/SanTapLai/SanTapLaiAction";

/**                                                                                                                                   
 * Edit san tap lai                                                                                                             
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditSanTapLai = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    let history = useHistory();
    const sanTL = useSelector((state) => state.sanTLs.sanTL);
    const loading = useSelector((state) => state.sanTLs.isLoading);

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
                // create data when click button add
                await dispatch(updateSanTapLaiRequest(values, id));
                toast.success('Chỉnh sửa sân tập thành công!', {
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

    useEffect(() => {
        const fetching = async () => {
            try {
                await dispatch(getSanTapLaiByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa sân tập</b></div>
                <div className="card-body">
                    {!loading && (<EditFormSanTapLai sanTL={sanTL} onSubmit={submit} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditSanTapLai.propTypes = {};

export default EditSanTapLai;