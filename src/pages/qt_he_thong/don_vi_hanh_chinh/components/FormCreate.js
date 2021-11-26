import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginRight: 5,
  },
  link: {
    textDecoration: 'none'
  }
}));



export default function FormCreate(props) {
  const classes = useStyles();
 
  const [alert, setAlert] = useState(false);
  const [ten ,setTen] =useState('');
  const [select, setSelect] = useState();
  const [tenDayDu,setTenDayDu] =useState('');

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (ten == '' || tenDayDu == '' ) {
      setAlert(true);
      setTimeout(() => setAlert(false), 2000)
        ;
    } else {
      const data = {
        "loaiDVHC": select,
        "ten": ten,
        "tenDayDu": tenDayDu,
      }
      // submitCreate(data);
      props.handleCreate(data);
    }
  }

  return (
    <React.Fragment>
          <h1>Thêm đơn vị hành chính</h1>
          <form onSubmit={handleSubmit}> 
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={12}>
          <TextField
            required
            label='Tên ngắn gọn'
            fullWidth
            autoComplete='family-name'
            value={ten}
            onChange={e => setTen(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id='tenDayDu'
            name='tenDayDu'
            label='Tên đầy đủ'
            fullWidth
            autoComplete='family-name'
            value={tenDayDu}
            onChange={e => setTenDayDu(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Loại đơn vị hành chính</InputLabel>
            <Select
              required
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={select}
              onChange={handleChange}
            >
              {props.comboboxList.map((value) => (
                <MenuItem key={value.id} value={value.id} >
                  {value.loai}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button variant='contained' color='primary' onClick={props.handleClose} className={classes.button} size='large'>
            Hủy
                </Button>
         
          <Button variant='contained' color="secondary"  type='submit' size='large' >
            Lưu
                </Button>
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}
