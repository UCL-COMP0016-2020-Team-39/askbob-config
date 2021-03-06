import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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
  },
  description: {
    flex: 1,
    marginLeft: "0rem",
  },
  errorText: {
    background: "#fee",
    color: "#f00",
    textAlign: "center",
  },
  selectGroup: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    "& *": {
      flex: "1",
      maxHeight: "30px",
    },
  },
  storyType: {
    flex: 0.5,
    marginLeft: "1rem",
  },
  storyName: {
    flex: 1,
    marginLeft: "1rem",
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
  addVarBtn: {
    margin: "1rem 0rem 1rem 0rem",
    backgroundColor: "#ffa000",
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#ffd149",
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
  handle: {
    color: "#448",
    "& :hover": {
      cursor: "grab",
    },
  },
}));
