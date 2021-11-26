import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import ListChucVu from './components/ListChucVu';
import DonVi from './don_vi/DonVi';
import { get as _get } from 'lodash';

const DonViChucVu = (props) => {
  return ( 
    <>
      <DonVi />
      <hr/>
      <ListChucVu />
    </>
  );
};

DonViChucVu.propTypes = {};

export default DonViChucVu;
