import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  errorText: {
    color: "#FF483E",
    fontSize: "0.8rem",
  },
  selectGroup: {
    width: "100%",
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
}));
