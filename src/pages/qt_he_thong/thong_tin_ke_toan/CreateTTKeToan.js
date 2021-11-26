import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {createTTKeToanRequest } from "../../../reducers/quan-tri/TTKeToan/TTKeToanAction";
import CreateFormTTKeToan from "./components/CreateFormTTKeToan";

/**
 * CreateTTKeToan
 * @param {*} props
 * @returns
 */
 const CreateTTKeToan = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  /**
   * submit
   * @param {*} values
   */
   const submit = async (values) => {
    try {
      console.log(values);
      // create data when click button add
      await dispatch(createTTKeToanRequest(values));
      history.goBack();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
       <div className="card">
                <div className="card-header"><b>Thêm mới thông tin kế toán</b></div>
                <div className="card-body">
                    {/* Form submit */}
                    <CreateFormTTKeToan onSubmit={submit} />
                </div>
        </div>
        <ToastContainer />
    </>
  );
};

CreateTTKeToan.propTypes = {};

export default CreateTTKeToan;
