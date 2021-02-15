import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",

    "& .MuiInput-root": {
      margin: theme.spacing(1),
      flex: "1",
    },
  },
  formGroup: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "baseline",
    "& .MuiButtonBase-root": {
      marginBottom: "1em",
      alignSelf: "center",
    },

    "& .MuiTextField-root": {
      flex: 1,
      width: "100%",
    },
  },
  addVarBtn: {
    margin: "1rem 0rem 1rem 0rem",
    backgroundColor: "#ffa000",
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#ffd149",
    },
  },
  addBtn: {
    margin: "1rem 0rem 1rem 0rem",

    backgroundColor: "#388e3c",
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#6abf69",
    },
  },
  editBtn: {
    margin: "1rem 0rem 1rem 0rem",
    backgroundColor: "#3f50b5",
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#757ce8",
    },
  },
}));
