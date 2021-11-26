import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {createMonHocRequest } from "../../../reducers/quan-tri/MonHoc/MonHocAction";
import CreateFormMonHoc from "./components/CreateFormMonHoc";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * CreateMonHoc
 * @param {*} props
 * @returns
 */
 const CreateMonHoc = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  /**
   * submit
   * @param {*} values
   */
   const submit = async (values) => {
    try {
      // create data when click button add
      await dispatch(createMonHocRequest(values));
      history.goBack();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
            <div className="card">
                <div className="card-header"><b>Thêm mới môn học</b></div>
                <div className="card-body">
                    {/* Form submit */}
                    <CreateFormMonHoc onSubmit={submit} />
                </div>
            </div>
            <ToastContainer />
      
    </>
  );
};

CreateMonHoc.propTypes = {};

export default CreateMonHoc;
