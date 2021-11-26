import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../../components";
import { reduxForm, Field } from "redux-form";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { get as _get } from "lodash";
const lessThan = otherField =>
  (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue

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
* Edit Form san tap lai                                                                                                          
* @param {*} props                                                                                                      
* @returns                                                                                                              
*/
const EditFormSanTapLai = (props) => {
    const { handleSubmit, sanTL, initialize } = props;
    const classes = useStyles();
    const history = useHistory();

    /**
     * handle back
     */
    const handerBack = () => {
        history.goBack();
    };

    useEffect(() => {
        initialize(sanTL);
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
                                id="tenSan"
                                label="Tên sân tập"
                                name="tenSan"
                                component={TextField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="gia"
                                label="Giá sân tập"
                                name="gia"
                                type="number"
                                min="0"
                                component={TextField}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="soLuongXe"
                                label="Số lượng xe"
                                name="soLuongXe"
                                type="number"
                                min="0"
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
                            <Button variant="contained"  type="submit" color="secondary">
                                Lưu</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
}


export default reduxForm({
    form: "EditFormSanTapLai",
    initialValues: { min: 0 }
})(EditFormSanTapLai);