import React from "react";
import PropTypes from "prop-types";

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
            <MenuItem key={item[menuValue]} value={item[menuValue]}>
              {item[menuText]}
            </MenuItem>
          );
        })}
      </Select>
      <p className={classes.errorText}>{errorText}</p>
    </div>
  );
};

FormSelect.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object.isRequired),
  menuValue: PropTypes.string.isRequired,
  menuText: PropTypes.string.isRequired,
};
export default FormSelect;
