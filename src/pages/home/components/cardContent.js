import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, Paper } from "@material-ui/core";
import { Description, DriveEta } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "150px",
    textAlign: "center",
    cursor: "pointer",
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    padding: "10px 0",
  },
  cardTitleColorInput: {
    backgroundColor: "#f0564e",
  },
  cardTitleColorStatic: {
    backgroundColor: "#556cd6",
  },
  icons: {
    fontSize: "70px",
    color: "white",
  },
  cardContent: {
    height: "74%",
    paddingTop: "15px",
  },
  cardContentColorInput: {
    backgroundColor: "#556cd6",
  },
  cardContentColorStatic: {
    backgroundColor: "antiquewhite",
  },
}));

const CardContent = () => {
  const classes = useStyles();

  return (
    <Grid justify="center" spacing={7} container>
      <Grid item xs={3}>
        <Paper className={classes.card}>
          <div
            className={`${classes.cardTitle} ${classes.cardTitleColorInput}`}
          >
            NHẬP THÔNG TIN XE
          </div>
          <div
            className={`${classes.cardContent} ${classes.cardContentColorInput}`}
          >
            <DriveEta className={classes.icons} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.card}>
          <div
            className={`${classes.cardTitle} ${classes.cardTitleColorStatic}`}
          >
            THỐNG KÊ XE TẬP LÁI
          </div>
          <div
            className={`${classes.cardContent} ${classes.cardContentColorStatic}`}
          >
            <Description className={classes.icons} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CardContent;
