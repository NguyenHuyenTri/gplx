import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../../components";
import { reduxForm, Field } from "redux-form";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { get as _get } from "lodash";

/**                                                                                                                      
 * useStyles                                                                                                             
 */
const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: 10,
    },
    link: {
        textDecoration: "none",
    },
    form: {
        marginLeft: 20,
        marginRight: 20,
    },
    formControl: {
        marginTop: theme.spacing(3),
        marginLeft: 10,
        marginBottom: theme.spacing(3),
        fullWidth: true,
    },
    selectEmpty: {
        marginTop: theme.spacing(10),
    },
}));

/**                                                                                                                      
* EditFormDonVi                                                                                                         
* @param {*} props                                                                                                      
* @returns                                                                                                              
*/
const EditFormDonVi = (props) => {
    const { handleSubmit, donVi, initialize, status } = props;
    const classes = useStyles();
    const history = useHistory();

    /**                                                                                                                    
     * hander Back                                                                                                          
     */
    const handerBack = () => {
        history.goBack();
    };

    useEffect(() => {
        initialize(donVi);
    }, []);

    return (
        <React.Fragment>
            <Paper>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="tenDonVi"
                                label="Tên đơn vị"
                                name="tenDonVi"
                                component={TextField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                variant="outlined"
                                margin="normal"
                                // required
                                fullWidth
                                id="moTa"
                                label="mô tả"
                                name="moTa"
                                component={TextField}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handerBack}
                                className={classes.button}
                            >Hủy</Button>
                            <Button variant="contained" type="submit" color="secondary">
                                Lưu</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "EditFormDonVi"
})(EditFormDonVi);