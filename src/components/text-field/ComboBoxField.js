import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ComboBoxField = ({
  options,
  label,
  input,
  meta: { touched, error },
  ...custom
}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper">{label}</InputLabel>
      <NativeSelect
        {...input}
        variant="filled"
        inputProps={{
          name: "age",
          id: "age-native-helper",
        }}
      >
        {options}
      </NativeSelect>
      {!error ? null : <FormHelperText>{error.toString()}</FormHelperText>}
    </FormControl>
  );
};

ComboBoxField.propTypes = {};

export default ComboBoxField;
