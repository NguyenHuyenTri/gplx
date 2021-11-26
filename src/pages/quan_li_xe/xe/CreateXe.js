import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createXeRequest } from "../../../reducers/qly-xe/Xe/XeAction";
import CreateFormXe from "./components/CreateFormXe";

/**
 * CreateXe
 * @param {*} props
 * @returns
 */
const CreateXe = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  /**
   * submit
   * @param {*} values
   */
  const submit = async (values) => {
    try {
      // create data when click button add
      await dispatch(createXeRequest(values));
      history.goBack();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <h1>Thêm mới xe</h1>

      <CreateFormXe onSubmit={submit} />
    </>
  );
};

CreateXe.propTypes = {};

export default CreateXe;
