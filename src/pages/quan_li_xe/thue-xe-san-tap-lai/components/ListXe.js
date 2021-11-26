import { makeStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoaiXeRequest } from '../../../../reducers/qly-xe/Xe/XeAction';
import { GetAllThueXeRequest } from '../../../../reducers/quan-tri/ThueXe/ThueXeAction';
import { filterXe } from './appointments';
import AutoCompleteXe from './AutoCompleteXe';
import TableXes from './TableXes';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  combobox: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 3,
  },
}));

const ListXe = (props) => {
  const { getThueXeRequest } = props;
  const dispatch = useDispatch();
  const styles = useStyles();

  const listXes = useSelector(({ xes }) => xes.xes);
  const loaiXes = useSelector(({ xe }) => xe.loaiXes);

  const [value, setValue] = useState(_get(loaiXes, '[0].id'));
  const [xes, setXes] = useState(listXes);

  useEffect(() => {
    dispatch(GetAllThueXeRequest());
    dispatch(getLoaiXeRequest());
  }, []);

  useEffect(() => {
    setXes(filterXe(listXes, value));
  }, [listXes, value]);

  const onClick = (event) => {
    dispatch(getThueXeRequest(event.row.id));
  };

  return (
    <div>
      <AutoCompleteXe
        className={styles.combobox}
        loaiXes={loaiXes}
        setValue={setValue}
        value={value}
      />

      <div className={styles.table}>
        <TableXes listXes={xes} loaiXes={loaiXes} onClick={onClick} />
      </div>
    </div>
  );
};

ListXe.propTypes = {};

export default ListXe;
