import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { get as _get } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getThongBaoTCRequest } from '../../reducers/quan-tri/ThongBao/ThongBaoAction';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Dashboard(props) {
  const { open, handleDrawerOpen } = props;

  const classes = useStyles();

  const dispatch = useDispatch();
  const dataUser = useSelector(({ auth }) => auth.dataUser);
  const thongBaoTC = useSelector(({ thongbao }) => thongbao.thongBaoTC || []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorInfo, setAnchorInfo] = React.useState(null);

  const handleClick = (event) => {
    setAnchorInfo(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorInfo(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getThongBaoTCRequest());
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderInfo = () => {
    return thongBaoTC.map((item, index) => (
      <Alert severity='success' icon={false} onClick={handleClose}>
        {item}
      </Alert>
      // <MenuItem key={index} onClick={handleClose}>
      //   {item}
      // </MenuItem>
    ));
  };

  return (
    <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        ></Typography>

        <Box>
          <IconButton
            color='inherit'
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <Badge badgeContent={thongBaoTC.length} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <IconButton color='inherit'>
            <Badge badgeContent={5} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <FilterNoneIcon />
            </Badge>
          </IconButton> */}
          <IconButton color='inherit'>
            <Badge>
              <AccountCircle />
              <Typography component='p' pl={4}>
                {_get(dataUser, 'user.nhanVien[0].hoTen', '')}
              </Typography>
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        id='simple-menu'
        anchorEl={anchorInfo}
        keepMounted
        open={Boolean(anchorInfo)}
        onClose={handleClose}
      >
        {renderInfo()}
      </Menu>

      {renderMenu}
    </AppBar>
  );
}
