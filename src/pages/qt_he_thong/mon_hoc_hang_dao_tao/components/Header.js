import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { MicNone } from '@material-ui/icons';


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
  link:{
    textDecoration:'none',
  }
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.container}>
          <h1>Danh sách môn học hạng đào tạo </h1>
          <div>
            
            <Link to={"/qt_he_thong/them_mon_hoc_hang_dao_tao"} className={classes.link}>
              <Button variant='contained' color='primary'  >
                Thêm mới
              </Button>
            </Link>
            
          </div> 
    </div>
  );
}
