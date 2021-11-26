import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { reduxForm, Field } from "redux-form";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { get as _get } from "lodash";

/**
 * makeStyles
 */
const useStyles = makeStyles((theme) => ({
  button1: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginLeft: 300,
    marginBottom: 70,
  },
  marginTop: {
    marginTop: 15,
    paddingTop: 15,
  },
  button: {
    width: 150,
    fontSize: 20,
    marginBottom: 70,
  },
  link: {
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
  },
}));

/**                                                                                
 * UpdateFromthongTinKT                                                    
 * @param {*} props                                                                
 * @returns                                                                        
 */                                                                                
 const UpdateFormTTKeToan = (props) => {                                    
  let history = useHistory();                                                      
  const classes = useStyles();                                                     
  const { handleSubmit, initialize, thongTinKT } = props;

  /**                                                                              
   * initialize                                                                    
   */                                                                              
   useEffect(() => {                                                     
    initialize(thongTinKT);                                                
  }, []);
  
  const ThuNhap = [
    {value: "Khoản trừ"},
    {value: "Khoản thu nhập"},
  ];
  const renderOptionThuNhap = () => {
    return ThuNhap.map((item, index) => {
        return <option value={item.value}>{item.value}</option>;
    });
  };
																				   
  /**                                                                              
   * handerBack                                                                    
   */                                                                              
  const handerBack = () => {                                                       
    history.goBack();                                                              
  }; 

  return (
    <React.Fragment>
      <Paper>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2 className={classes.marginTop}>THÔNG TIN CƠ BẢN</h2>
          <Grid item sm={12} container>
            <Grid item xs={12} sm={5}>                                             
              <Field                                                               
                variant="outlined"                                               
                margin="normal"                                                  
                required                                                           
                fullWidth                                                          
                id="tenTruong"                                      
                label="Tên trường"                               
                name="tenTruong"                                    
                autoComplete="tenTruong"                          
                autoFocus                                                          
                component={TextField}                                              
              />                                                                   
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={5}>
              <Field
                 component={ComboBoxField}
                 options={renderOptionThuNhap()}
                 variant="outlined"
                 margin="normal"
                 autoFocus
                 required
                 id="loai"
                 name="loai"
                 label="Loại"
                 fullWidth
                 autoComplete="loai"
              />
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={5}>                                             
              <Field
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                id="ghiChu"
                label="Ghi Chú"
                name="ghiChu"
                component={TextField}
              />                                                                   
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={12} className={classes.marginTop}>
              <Button
                variant="contained"
                color="primary"
                onClick={handerBack}
                className={classes.button1}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className={classes.button}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};
export default reduxForm({
  form: "UpdateFormTTKeToan",
})(UpdateFormTTKeToan);
