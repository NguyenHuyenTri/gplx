import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getXeByIdRequest,
  getLoaiXeRequest,
  getGVRequest,
  getLoaiNhienLieuRequest,
} from "../../../reducers/qly-xe/Xe/XeAction";
import { get as _get } from "lodash";
import ChiTietXe from "./components/ChiTietXe";
import { Button } from "@material-ui/core";

/**
 * ChiTietXe
 * @param {*} props
 * @returns
 */
const ChiTietXePage = (props) => {
  /**
   * url id
   */
  var query = window.location.pathname.split("/");
  var id = query[query.length - 1];

  const dispatch = useDispatch();
  const car = useSelector((state) => state.xe.xe);
  const loaiXes = useSelector((state) => _get(state, "xe.loaiXes", []));
  const giaoViens = useSelector((state) => _get(state, "xe.giaoViens", []));
  const loaiNhienLieus = useSelector((state) => _get(state, "xe.loaiNLs", []));
  let history = useHistory();

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

  if (car.chuSoHuu === "Xe chính chủ") {
    if (car.giaoVien != undefined) {
      car.giaoVien1 = car.giaoVien.id;
    }
  } 

  if (car.loaiXe != undefined) {
    car.loaiXe1 = car.loaiXe.id;
    if (car.loaiNhienLieu != undefined) {
      car.loaiNhienLieu1 = car.loaiNhienLieu.id;
    }
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

  return (
    <>
      <h1>Thông tin chi tiết xe</h1>
      <Button
            variant="contained"
            color="primary"
            onClick={() => history.goBack()}
          >
            Quay lại
          </Button>
    
        <ChiTietXe
          car={car}
          loaiXes={loaiXes}
          giaoViens={giaoViens}
          loaiNhienLieus={loaiNhienLieus}
        />
     
    </>
  );
};
export default ChiTietXePage;
