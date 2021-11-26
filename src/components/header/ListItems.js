import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dao_tao, ke_toan, ql_xe, sat_hach, qt_he_thong } from './DataItem';
import Item from './Item';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#556cd6',
      color: 'white',
    },
    '&$selected:hover': {
      backgroundColor: '#556cd6',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#7d92ef',
      color: 'white',
    },
  },
  selected: {},
})(MuiListItem);

export default function MainListItems() {
  const classes = useStyles();

  const [state, setState] = useState({});
  const location = useLocation();

  const handleClick = (key) => {
    setState({
      ...state,
      sat_hach: false,
      dao_tao: false,
      pl_xe: false,
      ke_toan: false,
      qt_he_thong: false,
      [key]: !state[key],
    });
  };

  return (
    <div>
      <Link to={'/'} className={classes.link}>
        <ListItem button selected={location.pathname === '/'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Trang chủ' />
        </ListItem>
      </Link>

      <Item
        open={state.dao_tao}
        items={dao_tao}
        handleClick={() => handleClick('dao_tao')}
        primary='Đào tạo'
        icon={<AllInboxIcon />}
        isExplain
        className={classes.link}
      />

      <Item
        open={state.sat_hach}
        items={sat_hach}
        handleClick={() => handleClick('sat_hach')}
        primary='Sát hạch'
        icon={<BusinessIcon />}
        isExplain
        className={classes.link}
      />

      <Item
        open={state.ql_xe}
        items={ql_xe}
        handleClick={() => handleClick('ql_xe')}
        primary='Quản lý xe'
        icon={<LocalTaxiIcon />}
        isExplain
        className={classes.link}
      />

      <Item
        open={state.ke_toan}
        items={ke_toan}
        handleClick={() => handleClick('ke_toan')}
        primary='Kế toán'
        icon={<AssignmentIcon />}
        isExplain
        className={classes.link}
      />

      <Item
        open={state.qt_he_thong}
        items={qt_he_thong}
        handleClick={() => handleClick('qt_he_thong')}
        primary='Quản trị'
        icon={<SupervisorAccountIcon />}
        isExplain
        className={classes.link}
      />
    </div>
  );
}
