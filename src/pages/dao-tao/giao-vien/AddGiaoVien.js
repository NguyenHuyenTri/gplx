import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { createGiaoVienRequest } from '../../../reducers/dao-tao/GiaoVien/GiaoVienAction';
import FormCreate from './components/FormCreate'
const AddGiaoVien = (props) => {
 
  const dispatch = useDispatch();
  const history = useHistory()

  /**                                                                                                                                 
   * submit                                                                                                                           
   * @param {*} values                                                                                                                
   */
  
  return (
    <>
      <FormCreate />
    </>
  );
};

AddGiaoVien.propTypes = {};

export default AddGiaoVien;
