import { Grid, InputLabel, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    marginTop: 5,
    padding: '7px 15px',
  },
  label: {
    color: '#544e4e',
    marginBottom: 10,
    fontSize: 21,
    marginLeft: 5,
    marginRight: 5,
  },
  formSelect: {
    width: 240,
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
  },

  button: {
    marginRight: 10,
  },
  option: {
    paddingLeft: 5,
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

  return (
    <div>
      <Paper>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={6} sm={3}>
            <FormControl variant='outlined' className={clsx(classes.formControl, classes.root)}>
              <InputLabel htmlFor='outlined-age-native-simple'> Loại Xe:</InputLabel>
              <Select
                className={classes.formSelect}
                autoWidth
                native
                label=' Loại Xe:'
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={10}>-Tất cả-</option>
                <option value={20}>loại xe 1</option>
                <option value={30}>loại xe 2</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl variant='outlined' className={clsx(classes.formControl, classes.root)}>
              <InputLabel htmlFor='outlined-age-native-simple'>Nhãn hiệu/Hãng:</InputLabel>
              <Select
                className={classes.formSelect}
                autoWidth
                native
                label='Nhãn hiệu/Hãng:'
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={10}>-Tất cả-</option>
                <option value={20}>Honda</option>
                <option value={30}>Yamaha</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl variant='outlined' className={clsx(classes.formControl, classes.root)}>
              <InputLabel htmlFor='outlined-age-native-simple'>Chủ sở hữu:</InputLabel>
              <Select
                className={classes.formSelect}
                autoWidth
                native
                label='Chủ sở hữu:'
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={10}>-Tất cả-</option>
                <option value={20}>Chính chủ</option>
                <option value={30}>Không chính chủ</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl variant='outlined' className={clsx(classes.formControl, classes.root)}>
              <InputLabel htmlFor='outlined-age-native-simple'>TT kiểm định:</InputLabel>
              <Select
                className={classes.formSelect}
                autoWidth
                native
                label='TT kiểm định:'
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={10}>-Tất cả-</option>
                <option value={20}>2021</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl variant='outlined' className={clsx(classes.formControl, classes.root)}>
              <InputLabel htmlFor='outlined-age-native-simple'>TT bảo hiểm:</InputLabel>
              <Select
                className={classes.formSelect}
                autoWidth
                native
                label='TT bảo hiểm:'
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={10}>-Tất cả-</option>
                <option value={20}>2021</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} className={classes.root}>
            <Button variant='contained' color='primary' className={classes.button}>
              Lọc dữ liệu
            </Button>
            <Button variant='contained' color='secondary' className={classes.button}>
              In ấn
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
