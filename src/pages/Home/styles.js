import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  alert: { marginBottom: "1rem" },
  formGroup: {
    width: "100%",
    marginBottom: "1rem",
    "& *": {
      width: "100%",
    },
  },

  errorText: {
    background: "#fee",
    color: "#f00",
    textAlign: "center",
  },
  downloadBtn: {
    backgroundColor: "#f84",

    "&:hover": {
      backgroundColor: "#e87838",
    },
  },
}));
