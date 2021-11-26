import { Grid, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';



const useStyles = makeStyles((theme) => ({
  container:{
        marginBottom:10,
        marginTop:5,
  } ,
  label : {
      color: '#544e4e',
      marginBottom: 10,
      fontSize:21,
      marginLeft:5,
      marginRight:5

  },
  formSelect:{
    width:240,
    fontSize:18,
    marginLeft:5,
    marginRight:5
   
  },
 
  button:{
      marginTop:32,
      marginRight:5,
  },
  option:{
    
      paddingLeft:5,
  }
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  
  return (
    <div >
      <Paper>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={6} sm={3} >
            <InputLabel htmlFor="select" className={classes.label}>Tên môn học </InputLabel>
            <Select className={classes.formSelect}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                >
                <MenuItem value={10}>-Tất cả-</MenuItem>
                <MenuItem value={20}>B1</MenuItem>
                <MenuItem value={30}>B12</MenuItem>
                <MenuItem value={40}>B13</MenuItem>
                <MenuItem value={50}>B14</MenuItem>
                <MenuItem value={60}>B15</MenuItem>
            </Select>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Button variant="contained" color="primary" className={classes.button}>Lọc dữ liệu</Button>
            <Button variant="contained" color="secondary" className={classes.button}>In ấn</Button>
        </Grid>
      </Grid>
      </Paper>
    </div>
  );
}
