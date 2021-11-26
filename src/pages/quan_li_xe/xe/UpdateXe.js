import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getXeByIdRequest,
  updateXeRequest,
  getLoaiXeRequest,
  getGVRequest,
  getLoaiNhienLieuRequest,
} from "../../../reducers/qly-xe/Xe/XeAction";
import UpdateFormXe from "./components/UpdateFormXe";
import { get as _get } from "lodash";

/**
 * UpdateXe
 * @param {*} props
 * @returns
 */
const UpdateXe = (props) => {
  /**
   * url id
   */
  var query = window.location.pathname.split("/");
  var id = query[query.length - 1];

  const dispatch = useDispatch();
  const car = useSelector((state) => state.xe.xe);
  const loading = useSelector((state) => state.xe.isLoading);
  const loaiXes = useSelector((state) => _get(state, "xe.loaiXes", []));
  const giaoViens = useSelector((state) => _get(state, "xe.giaoViens", []));
  const loaiNhienLieus = useSelector((state) => _get(state, "xe.loaiNLs", []));
  let history = useHistory();
  // const dispatch = useDispatch();

  /**
   * get by id
   */
  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(getXeByIdRequest(id));
      } catch (error) {
        alert(error);
      }
      dispatch(getLoaiXeRequest());
      dispatch(getGVRequest());
      dispatch(getLoaiNhienLieuRequest());
    };

    fetching();
  }, []);

  if (car.loaiNhienLieu != undefined) {
    car.loaiNhienLieu1 = car.loaiNhienLieu.id;
  }

  if (car.giaoVien != undefined && car.giaoVien != null) {
    car.giaoVien1 = car.giaoVien.id;
  } 

  if (car.loaiXe != undefined) {
    car.loaiXe1 = car.loaiXe.id;

    /**
     * settime ngay gio BH
     */
    var date = new Date(car.ngayGioCapBH);
    var ngayGioCapBH =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      "T" +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2);
    car.ngayGioCapBH = ngayGioCapBH;
    /**
     * settime ngay gio HHBH
     */
    var date1 = new Date(car.ngayGioHHBH);
    var ngayGioHHBH =
      date1.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      "T" +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2);
    car.ngayGioHHBH = ngayGioHHBH;
  }

  /**
   * submit
   * @param {*} values
   */
  const submit = async (values) => {
    try {
      // update car when click button submit
      values.giaoVien = values.giaoVien1;
      values.loaiXe = values.loaiXe1;
      values.loaiNhienLieu = values.loaiNhienLieu1;
      await dispatch(updateXeRequest(values, id));
      history.goBack();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1>Cập nhập thông tin xe</h1>
      {!loading && (
        <UpdateFormXe
          onSubmit={submit}
          car={car}
          loaiXes={loaiXes}
          giaoViens={giaoViens}
          loaiNhienLieus={loaiNhienLieus}
        />
      )}
    </>
  );
};
export default UpdateXe;
