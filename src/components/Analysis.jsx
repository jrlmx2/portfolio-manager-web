import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  paperHorizaontal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    background: "#d8e481",
    padding: "8px 16px",
    width: "100%"
  }
}));

const Analysis = props => {
  const classes = useStyles();

  return <div className={classes.paper}></div>;
};
