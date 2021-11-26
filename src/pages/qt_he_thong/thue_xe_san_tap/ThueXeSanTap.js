import React from 'react';
import { ThueXe } from './thue_xe';
import { SanTapLai } from './san_tap_lai';
const ThueXeSanTap = (props) => {
  return (
    <>
        <ThueXe />
        <hr/>
        <SanTapLai /> 
    </>
  );
};

ThueXeSanTap.propTypes = {};

export default ThueXeSanTap;
