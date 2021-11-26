import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '7px 15px',
    borderRadius: '3px',
    marginBottom: theme.spacing(2),
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
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <Paper className={classes.container}>
      <Typography component='h1' variant='h5'>
        Hồ Sơ Sát hạch
      </Typography>

      {/* <div>
        <Link to={'/ql_xe/them_xe'} className={classes.link}>
          <Button variant='contained' color='primary'>
            Thêm mới
          </Button>
        </Link>
      </div> */}
    </Paper>
  );
}
