import CreateFormThongBao from "./components/CreateFormThongBao";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import { useDispatch } from "react-redux";
import { createThongBaoRequest } from "../../../reducers/quan-tri/ThongBao/ThongBaoAction";

/**                                                                                                                                   
 * Create thong bao                                                                                                            
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const CreateThongBao = (props) => {
    const dispatch = useDispatch();

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        try {
            if (values.soNgayTB < 0) {
                toast.success('Số ngày thông báo không được nhỏ hơn 0!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                const data = {
                    "tenTB": values.tenTB,
                    "noiDung": values.noiDung,
                    "cachTB": values.cachTB ?? "Nhắn tin SMS",
                    "thongBaoCho": values.thongBaoCho ?? "Nhân viên",
                    "satHach": values.thongBaoCho === "Thí sinh" ? values.satHach : null,
                    "khoaHoc": values.thongBaoCho === "Học viên" ? values.khoaHoc : null,
                };
                await dispatch(createThongBaoRequest(data));
                toast.success('Thêm thông báo thành công!', {
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
                <div className="card-header"><b>Thêm mới thông báo</b></div>
                <div className="card-body">
                    <CreateFormThongBao onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}


CreateThongBao.propTypes = {};

export default CreateThongBao;