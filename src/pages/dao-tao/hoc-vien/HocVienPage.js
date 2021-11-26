import React from "react";
import { BoxSearch, ListHV, Info } from "./components";

const HocVienPage = (props) => {
  return (
    <>
      <BoxSearch />

      <ListHV />
    </>
  );
};

HocVienPage.propTypes = {};

export default HocVienPage;
