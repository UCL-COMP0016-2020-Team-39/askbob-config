import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  errorText: {
    color: "#CD483E",
    fontSize: "0.7rem",
  },
  selectGroup: {
    width: "100%",
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
}));
