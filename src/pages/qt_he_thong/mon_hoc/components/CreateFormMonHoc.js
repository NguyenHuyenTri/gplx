import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { ComboBoxField, TextField } from "../../../../components";
import { reduxForm, Field } from "redux-form";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get as _get } from "lodash";

/**
 * useStyles
 */
const useStyles = makeStyles((theme) => ({
  button: {
    width: 150,
    fontSize: 20,
    marginRight: 10,
    marginBottom: 70,
  },
  link: {
    textDecoration: "none",
  },
  form: {
    marginLeft: 20,
  },
  marginTop: {
    marginTop: 15,
    paddingTop: 15,
  },
}));

/**
 * CreateFormMonHoc
 * @param {*} props
 * @returns
 */
const CreateFormMonHoc = (props) => {
  const { handleSubmit, initialize } = props;
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();

  // listen data loai mon hoc of grid
  const monHocs = useSelector((state) => _get(state, "monHoc.monHocs", []));

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
          <h2 className={classes.marginTop}>Thông tin cơ bản</h2>
          <Grid item sm={12} container>
          <Grid item xs={12} sm={12}>
              <Field
                variant="outlined"
                margin="normal"
                autoFocus
                component={TextField}
                required
                id='tenMH'
                name='tenMH'
                label='Tên môn học'
                fullWidth
                autoComplete='tenMH'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                variant="outlined"
                margin="normal"
                autoFocus
                component={TextField}
                id='soVBPL'
                name='soVBPL'
                label='Số VBPL'
                fullWidth
                autoComplete='soVBPL'
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12} sm={12} className={classes.marginTop} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handerBack}
                className={classes.button }
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
  form: "CreateFormMonHoc",
})(CreateFormMonHoc);
