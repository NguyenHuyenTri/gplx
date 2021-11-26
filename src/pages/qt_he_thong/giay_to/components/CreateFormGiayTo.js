import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { Link, useHistory } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import React from "react";


/**                                                                                                                      
 * useStyles                                                                                                             
 */
const useStyles = makeStyles((theme) => ({

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
 * CreateForm Giay to                                                                                                          
 * @param {*} props                                                                                                      
 * @returns                                                                                                              
 */
const CreateFormGiayTo = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        giayTo,
    } = props;

    /**
     * set list status
     */
    const status = [
        { value: true }, { value: false }
    ];

    /**
    * render status 
    * @returns 
    */
    const renderOptionStatus = () => {
        return status.map((item, index) => {
            return <option value={item.value}>{item.value === true ? "Hiệu lực" : "Chưa hiệu lực"}</option>;
        });
    };

    /**                                                                                                                    
     * hander Back                                                                                                          
     */
    const handerBack = () => {
        history.goBack();
    };

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
                                id="tenGT"
                                label="Tên giấy tờ"
                                name="tenGT"
                                component={TextField}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="soVBPL"
                                label="Số văn bản pháp luật"
                                name="soVBPL"
                                component={TextField}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Field
                                component={ComboBoxField}
                                options={renderOptionStatus()}
                                variant="outlined"
                                margin="normal"
                                required
                                id="trangThai"
                                name="trangThai"
                                label="Trạng thái giấy tờ"
                                fullWidth
                                autoComplete="trangThai"
                                style={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Field
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="ghiChu"
                                label="Ghi chú"
                                name="ghiChu"
                                multiline
                                rows={4}
                                rowsMax={6}
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
                            <Button variant="contained" style={{marginLeft: "10px"}}  type="submit" color="secondary">
                                Lưu</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "CreateFormGiayTo"
})(CreateFormGiayTo);
