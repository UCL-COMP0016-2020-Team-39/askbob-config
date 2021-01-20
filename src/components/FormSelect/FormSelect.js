import { Select, MenuItem } from "@material-ui/core";
import { useField } from "formik";
import useStyles from "./styles";

const FormSelect = ({ menuItems, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <>
      <div className={classes.errorText}>{errorText}</div>
      <Select {...field} helperText={errorText} error={!!errorText}>
        {menuItems.map(item => {
          return (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default FormSelect;
