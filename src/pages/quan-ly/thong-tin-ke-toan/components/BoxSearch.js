import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import ModalCreate from './ModalCreate';

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
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.container}>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Tên trường'
          inputProps={{ 'aria-label': 'Tên trường' }}
        />

        <IconButton type='submit' className={classes.iconButton} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>

      <div>
        <Button variant='contained' color='primary' onClick={() => setOpen(!open)}>
          Thêm mới
        </Button>

        <ModalCreate open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
