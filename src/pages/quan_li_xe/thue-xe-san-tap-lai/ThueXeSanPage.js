import React, { useEffect } from 'react';
import { Scheducer, ListXe } from './components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getThueXeRequest } from '../../../reducers/qly-xe/Thue-xe/ThueXeAction';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  h1: {
    paddingLeft: 15,
  },
}));

function LichSatHachPage() {
  const Styles = useStyles();
  const dispatch = useDispatch();
  const lichThueXes = useSelector(({ thuexe }) => thuexe.lichThueXes);

  useEffect(() => {
    dispatch(getThueXeRequest());
  }, []);

  return (
    <div className={Styles.container}>
      <ListXe getThueXeRequest={getThueXeRequest} />
      {lichThueXes.length > 0 ? (
        <Scheducer lichThueXes={lichThueXes} />
      ) : (
        <Paper>
          <h3 className={Styles.h1}>Không có dữ liệu</h3>
        </Paper>
      )}
    </div>
  );
}

export default LichSatHachPage;
