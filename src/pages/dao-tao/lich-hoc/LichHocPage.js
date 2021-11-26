import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ComboBox, Scheducer } from "./components";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LichHocPage() {
  return (
    <div>
      <ComboBox />
      <Scheducer />
    </div>
  );
}
