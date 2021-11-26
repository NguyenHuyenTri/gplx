import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get as _get } from "lodash";
import { Button } from "@material-ui/core";
import {
  getHVByIdRequest,
  getKhoaHocRequest,
  GetQuocTichRequest,
} from "../../../reducers/DTHVState/DTHVAction";
import ChiTietHocVien from "./components/ChiTietHocVien";

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

  let history = useHistory();

  const dispatch = useDispatch();

  const khoahocs = useSelector((state) =>
    _get(state, "dthv.khoaHoc.khoaHocs", [])
  );
  const hocVien = useSelector((state) => state.dthv.hocVien);
  const quocTichs = useSelector((state) => _get(state, "dthv.quocTichs", []));
  const gioiTinhs = [{ value: "Nam" }, { value: "Nữ" }];
  /**
   * Get Xe Request
   */

  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(getHVByIdRequest(id));
      } catch (error) {
        alert(error);
      }
      dispatch(getKhoaHocRequest());
      dispatch(GetQuocTichRequest());
    };

    fetching();
  }, []);

  return (
    <>
      <h1>Thông tin chi tiết học viên</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        Quay lại
      </Button>
      
        <ChiTietHocVien
          hocVien={hocVien}
          quocTichs={quocTichs}
          gioiTinhs={gioiTinhs}
          khoahocs={khoahocs}
        />
  
    </>
  );
};
export default ChiTietXePage;
