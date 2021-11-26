import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: '74px',
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

export default function Item(props) {
  const { open, handleClick, primary, icon, isExplain, items, className } = props;
  const classes = useStyles();

  const location = useLocation();

  const listItem = () => {
    return (items || []).map((item, index) => (
      <Link to={item.link} className={className}>
        <ListItem button className={classes.nested} selected={location.pathname === item.link}>
          <ListItemText primary={item.name} />
        </ListItem>
      </Link>
    ));
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {isExplain ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {listItem()}
        </List>
      </Collapse>
    </>
  );
}
