import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
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
* EditFormChucVu                                                                                                         
* @param {*} props                                                                                                      
* @returns                                                                                                              
*/
const EditFormChucVu = (props) => {
    const { handleSubmit, chucVu, initialize, status } = props;
    const classes = useStyles();
    const history = useHistory();

    /**                                                                                                                    
     * hander Back                                                                                                          
     */
    const handerBack = () => {
        history.goBack();
    };

    useEffect(() => {
        initialize(chucVu);
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
                                id="tenChucVu"
                                label="T??n ch???c v???"
                                name="tenChucVu"
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
                                label="m?? t???"
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
                            >H???y</Button>
                            <Button variant="contained" type="submit" color="secondary">
                                L??u</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "EditFormChucVu"
})(EditFormChucVu);