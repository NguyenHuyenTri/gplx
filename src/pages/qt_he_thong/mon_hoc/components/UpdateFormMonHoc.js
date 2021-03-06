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
  marginTop: {
    marginTop: 15,
    paddingTop: 15,
  },
  button: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
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
 * UpdateFromMonHoc                                                      
 * @param {*} props                                                                
 * @returns                                                                        
 */                                                                                
 const UpdateFormMonHoc = (props) => {                                    
  let history = useHistory();                                                      
  const classes = useStyles();                                                     
  const { handleSubmit, initialize, monHoc } = props;

  /**                                                                              
   * initialize                                                                    
   */                                                                              
   useEffect(() => {                                                     
    initialize(monHoc);                                                
  }, []);                                                                          
				
  const status = [
    { value: true }, { value: false }
  ];
  const renderOptionHieuLuc = () => {
    return status.map((item, index) => {
        return <option value={item.value}>{item.value === true ? "Hi????u l????c" : "Ch??a hi????u l????c"}</option>;
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
          <h2 className={classes.marginTop}>Th??ng tin c?? b???n</h2>
          <Grid item sm={12} container>
          <Grid item xs={12} sm={5}>                                             
              <Field                                                               
                variant="outlined"                                               
                margin="normal"                                                  
                required                                                           
                fullWidth                                                          
                id="tenMH"                                      
                label="T??n m??n h???c"                               
                name="tenMH"                                    
                autoComplete="T??n m??n h???c"                          
                autoFocus                                                          
                component={TextField}                                              
              />                                                                   
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={5}>                                             
              <Field                                                               
                variant="outlined"                                               
                margin="normal"                                                                                                            
                fullWidth                                                          
                id="soVBPL"                                      
                label="S??? VBPL"                               
                name="soVBPL"                                    
                autoComplete="S??? VBPL"                          
                autoFocus                                                          
                component={TextField}                                              
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
                label="Ghi Ch??"
                name="ghiChu"
                component={TextField}
              />                                                                
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={5}>
              <Field
                component={ComboBoxField}
                options={renderOptionHieuLuc()}
                variant="outlined"
                margin="normal"
                required
                id="trangThai1"
                name="trangThai1"
                label="Tr???ng th??i"
                fullWidth
                autoComplete="trangThai"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Grid item xs={12} sm={12} className={classes.marginTop} align= "center">
              <Button
                variant="contained"
                color="primary"
                onClick={handerBack}
                className={classes.button}
              >
                H???y
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className={classes.button}
              >
                L??u
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};
export default reduxForm({
  form: "UpdateFormMonHoc",
})(UpdateFormMonHoc);
