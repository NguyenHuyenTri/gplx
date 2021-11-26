import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getKhoaHocRequest,getHocVienRequest } from '../../../../reducers/DTHVState/DTHVAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    marginBottom: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paddingButton: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: 'white',
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  const [khoaHoc, setKhoaHoc] = useState('-1');
  const dispatch = useDispatch();
  const dataKhoaHoc = useSelector((state) => state.dthv.khoaHoc);

  useEffect(() => {
    dispatch(getKhoaHocRequest());
  }, []);

  useEffect(() => {
    const { khoaHocs } = dataKhoaHoc;
    if (Array.isArray(khoaHocs) && khoaHocs.length > 0) {
      setKhoaHoc(khoaHocs[0].id);
      dispatch(getHocVienRequest(khoaHocs[0].id));
    }
  }, [dataKhoaHoc]);

  const handleChange = (e) => {
    dispatch(getHocVienRequest(e.target.value));
  };

  const elmKhoahoc = () => {
    const { khoaHocs } = dataKhoaHoc;

    if (Array.isArray(khoaHocs)) {
      return khoaHocs.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.tenKH}
          </option>
        );
      });
    }

    return null;
  };

  return (
    <div className={classes.container}>
      <FormControl variant='outlined' className={clsx(classes.formControl, classes.root)}>
        <InputLabel htmlFor='outlined-age-native-simple'>Khoá học</InputLabel>
        <Select
          autoWidth
          native
          onChange={handleChange}
          label='Khoá học'
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          {elmKhoahoc()}
        </Select>
      </FormControl>

     
    </div>
  );
}
