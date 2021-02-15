import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1rem",
  },
  form: {
    "& h4": {
      marginBottom: "1rem",
    },
  },
}));
