import EditFormThueXe from "./components/EditFormThueXe";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThueXeByIdRequest, updateThueXeRequest } from "../../../../reducers/quan-tri/ThueXe/ThueXeAction";


/**                                                                                                                                   
 * Edit xe                                                                                                             
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditThueXe = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    const xe = useSelector((state) => state.xes.xe);
    const loading = useSelector((state) => state.xes.isLoading);
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
            if (values.giaThueXe == 0 || values.giaThueXe == null || values.giaThueXe < 0) {
                toast.success('Giá thành không được nhỏ hơn hoặc bằng 0!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                values.trangThai = values.trangThai1;
                await dispatch(updateThueXeRequest(values, id));
                toast.success('Chỉnh sửa thuê xe thành công!', {
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
                await dispatch(getThueXeByIdRequest(id));
            } catch (error) {
                alert(error);
            }
        };
        fetching();
    }, []);
    if (xe.trangThai != undefined) {
        xe.trangThai1 = xe.trangThai;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa xe cho thuê</b></div>
                <div className="card-body">
                    {!loading && (<EditFormThueXe xe={xe} onSubmit={submit} status={status} />)}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditThueXe.propTypes = {};

export default EditThueXe;