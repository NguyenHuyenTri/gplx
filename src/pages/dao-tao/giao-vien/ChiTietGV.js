import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get as _get } from "lodash";
import { Button } from "@material-ui/core";

import ChiTiet from "./components/ChiTiet";
/**
 * ChiTietGV
 * @param {*} props
 * @returns
 */
const ChiTietGVPage = (props) => {
  const history =useHistory()
  return (
    <>
      <h1>Thông tin chi tiết giáo viên</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        Quay lại
      </Button>
        <ChiTiet
        />
  
    </>
  );
};
export default ChiTietGVPage;
