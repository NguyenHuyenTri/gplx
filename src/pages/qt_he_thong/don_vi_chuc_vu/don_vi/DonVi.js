import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import { get as _get } from 'lodash';
import ListDonVi from './components/ListDonVi';

const DonVi = (props) => {
  return ( 
    <>
      <ListDonVi />
    </>
  );
};

DonVi.propTypes = {};

export default DonVi;
