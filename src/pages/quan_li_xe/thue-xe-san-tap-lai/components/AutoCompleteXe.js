/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get as _get } from 'lodash';

export default function ComboBox(props) {
  const { loaiXes, setValue, value, ...rest } = props;

  if (Array.isArray(loaiXes) && loaiXes.length === 0) {
    return null;
  }

  return (
    <Autocomplete
      {...rest}
      onInputChange={(event, newValue) => {
        setValue(newValue);
      }}
      id='combo-box-demo'
      options={loaiXes}
      getOptionLabel={(option) => option.tenLoaiXe}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label='Chọn loại xe' variant='outlined' />}
    />
  );
}
