import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    // padding: '2px 4px',
    display: "flex",
    alignItems: "center",
    // width: 300,
    marginBottom: theme.spacing(2),
    backgroundColor: "white",
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
}));

export default function NativeSelects(props) {
  const { labelComboBox } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.container}>
      <FormControl
        variant="outlined"
        className={clsx(classes.formControl, classes.root)}
      >
        <InputLabel htmlFor="outlined-age-native-simple">
          {labelComboBox}
        </InputLabel>
        <Select
          autoWidth
          native
          value={state.age}
          onChange={handleChange}
          label="Khoá học"
          inputProps={{
            name: "age",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Khoá học A</option>
          <option value={20}>Khoá học B</option>
          <option value={30}>Khoá học C</option>
        </Select>
      </FormControl>
    </div>
  );
}
