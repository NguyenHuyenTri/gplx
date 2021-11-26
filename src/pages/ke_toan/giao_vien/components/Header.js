import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Link } from "react-router-dom";
import { exportGVRequest } from "../../../../reducers/ke-toan/GiaoVien/GiaoVienAction";
import { useDispatch } from "react-redux";

/**
 * make Styles
 */
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "none",
    alignItems: "center",
    padding: "7px 15px",
    borderRadius: "3px",
    marginBottom: theme.spacing(2),
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
    marginBottom: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paddingButton: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
  },
  button: {
    marginRight: 10,
  },
}));

/**
 * Header
 * @returns 
 */
export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const export1 = () => (
    dispatch(exportGVRequest())
  )
  return (

    <div className={classes.container}>
      <Typography component="h1" variant="h5" float="left">
        Danh sách kế toán giáo viên
      </Typography>
      <div>
        <Button variant="contained" color="primary" onClick={export1} className={classes.button}>
          export
        </Button>
      </div>
    </div>

  );
}
