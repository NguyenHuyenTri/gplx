import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: theme.spacing(2),
  },
  strong: {
    textTransform: 'capitalize',
  },
}));

export default function NativeSelects(props) {
  const { showInfo, info } = props;
  const classes = useStyles();

  const elmInfo = () => {
    return Object.keys(info).map((item, index) => {
      return (
        <p key={index}>
          <strong className={classes.strong}>{item}</strong>: <span>{info[item]}</span>
        </p>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.button}>
        <Button
          variant='contained'
          color='primary'
          onClick={showInfo}
          startIcon={<ArrowBackIcon />}
        >
          Quay lại
        </Button>
      </div>

      <div className={classes.content}>{elmInfo()}</div>
    </div>
  );
}
