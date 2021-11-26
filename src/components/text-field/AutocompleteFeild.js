

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const renderAuto = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <Autocomplete
    label={label}
    {...options}
    placeholder={label}
    getOptionLabel={option => option.title}
    onChange={(event, value) => value}
    {...input}
    {...custom}
    renderInput={params => (
      <TextField {...params} label={label} variant="outlined" fullWidth />
    )}
  />
);

renderAuto.propTypes = {};

export default renderAuto;
