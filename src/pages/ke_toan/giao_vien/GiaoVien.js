import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableListGiaoVien } from './components';
import { Header } from './components';

export default function MaterialTableDemo() {

  return (
    <>
      <div className="card">
        <div className="card-header">
          <Header />
        </div>
        <div className="card-body">
          <TableListGiaoVien />
        </div>
      </div>


    </>
  );
}
