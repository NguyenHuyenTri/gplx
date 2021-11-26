import EditFormThongBao from "./components/EditFormThongBao";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get as _get } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSatHachComboboxRequest,
    getKhoaHocComboboxRequest,
    getThongBaoByIdRequest,
    updateThongBaoRequest
} from "../../../reducers/quan-tri/ThongBao/ThongBaoAction";

/**                                                                                                                                   
 * Edit Giay to                                                                                                             
 * @param {*} props                                                                                                                   
 * @returns                                                                                                                           
 */
const EditThongBao = (props) => {
    /**
     * url id
     */
    var query = window.location.pathname.split("/");
    var id = query[query.length - 1];

    const dispatch = useDispatch();
    const thongBao = useSelector((state) => state.thongBaos.thongBao);
    const loading = useSelector((state) => state.thongBaos.isLoading);

    // select for picker
    const cachTBs = [{ value: "Nhắn tin SMS" }, { value: "Thông báo trên web" }];
    const loaiTBs = [{ value: "Thông báo người dùng" }, { value: "Thông báo hệ thống" }];
    const thongBaoCho = [{ value: "Nhân viên" }, { value: "Học viên" }, { value: "Thí sinh" }, { value: "Giáo viên" }];

    const satHachs = useSelector((state) => _get(state, "thongBaos.satHachs", []));
    const khoaHocs = useSelector((state) => _get(state, "thongBaos.khoaHocs", []));

    const showToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleBackWhenComplete = () => {
        setTimeout(() => {
            window.history.back();
        }, 1000);
    }

    const submitFormData = async (data) => {
        await dispatch(updateThongBaoRequest(data, id));
        showToast('Chỉnh sửa thông báo thành công!');
        handleBackWhenComplete();
    }

    /**                                                                                                                                 
     * submit                                                                                                                           
     * @param {*} values                                                                                                                
     */
    const submit = async (values) => {
        let checkDataKhoaHoc = values.khoaHoc === "" || values.khoaHoc === null || values.khoaHoc === 'undefined';
        let checkDataSatHach = values.satHach === "" || values.satHach === null || values.satHach === 'undefined';
        let checkEmpty = values.tenTB === "" || values.cachTB === "" || values.thongBaoCho === "";
        let checkUndefined = values.khoaHoc === 'undefined' || values.satHach === 'undefined';
        if (checkEmpty || checkUndefined) {
        } else {
            try {
                // create data when click button add
                values.satHach = values.satHach1;
                values.khoaHoc = values.khoaHoc1;
                values.cachTB = values.cachTB1;
                values.loaiTB = values.loaiTB1;
                values.thongBaoCho = values.thongBaoCho1;
                const data = {
                    "tenTB": values.tenTB,
                    "noiDung": values.noiDung,
                    "cachTB": values.cachTB,
                    "thongBaoCho": values.thongBaoCho,
                    "satHach": checkDataSatHach ? null : values.satHach,
                    "khoaHoc": checkDataKhoaHoc ? null : values.khoaHoc,
                    "soNgayTB": values.soNgayTB === null ? null : values.soNgayTB,
                }
                submitFormData(data);
            } catch (error) {
                alert(error);
            }
        }
    };

    useEffect(() => {
        const fetching = async () => {
            try {
                await dispatch(getThongBaoByIdRequest(id));
            } catch (error) {
                alert(error);
            }
            dispatch(getSatHachComboboxRequest());
            dispatch(getKhoaHocComboboxRequest());
        };
        fetching();
    }, []);

    if (thongBao.satHach != undefined) {
        thongBao.satHach1 = thongBao.satHach.id;
    }

    if (thongBao.khoaHoc != undefined && thongBao.khoaHoc != null) {
        thongBao.khoaHoc1 = thongBao.khoaHoc.id;
    }

    if (thongBao.loaiTB != undefined) {
        thongBao.loaiTB1 = thongBao.loaiTB;
    }

    if (thongBao.cachTB != undefined) {
        thongBao.cachTB1 = thongBao.cachTB;
    }

    if (thongBao.thongBaoCho != undefined) {
        thongBao.thongBaoCho1 = thongBao.thongBaoCho;
    }

    return (
        <>
            <div className="card">
                <div className="card-header"><b>Chỉnh sửa thông báo</b></div>
                <div className="card-body">
                    {!loading && (<EditFormThongBao
                        thongBao={thongBao}
                        onSubmit={submit}
                        satHachs={satHachs}
                        khoaHocs={khoaHocs}
                        loaiTBs={loaiTBs}
                        cachTBs={cachTBs}
                        thongBaoCho={thongBaoCho}
                    />)}

                </div>
            </div>
            <ToastContainer />
        </>
    );
}


EditThongBao.propTypes = {};

export default EditThongBao;