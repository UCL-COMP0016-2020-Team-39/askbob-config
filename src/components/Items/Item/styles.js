import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  title: {
    textTransform: "capitalize",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1rem",
  },
}));
