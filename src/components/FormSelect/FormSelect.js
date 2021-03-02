import { Select, MenuItem } from "@material-ui/core";
import { useField } from "formik";
import useStyles from "./styles";

const FormSelect = ({ menuItems, menuValue, menuText, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div className={classes.selectGroup} {...props}>
      <Select {...field} error={!!errorText}>
        {menuItems.map(item => {
          return (
            <MenuItem key={item.id} value={item[menuValue]}>
              {item[menuText]}
            </MenuItem>
          );
        })}
      </Select>
      <p className={classes.errorText}>{errorText}</p>
    </div>
  );
};

export default FormSelect;
