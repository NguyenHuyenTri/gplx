import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  noteTitle: {
    color: "secondary",
    fontWeight: "bold",
  },
  noteContent: {
    color: "#f0564e",
  },
}));

const Note = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={classes.noteTitle}>Ghi chú / nhắc nhở</div>
        <div className={classes.noteContent}>Xe 92A-091.84 sẽ hết hạn</div>
      </Paper>
    </Grid>
  );
};

export default Note;
