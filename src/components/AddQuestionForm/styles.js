import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  formGroup: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    "& button": {
      marginBottom: "1em",
    },

    "& .MuiTextField-root": {
      flex: 1,
    },
  },
}));
