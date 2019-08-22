import React from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ChartWrapper from "./ChartWrapper";

import { theme } from "../theme";
import withStyles from "@material-ui/styles/withStyles";

const styles = {
  paperHorizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: "900px",
    padding: theme.spacing(4)
  },
  grid: {
    padding: theme.spacing(4)
  }
};
const Analysis = props => {
  const { classes, ...rest } = props;
  console.log(props);
  return (
    <div>
      <Grid container component="div">
        <Grid item xs={12} component="div" className={classes.grid}>
          <ChartWrapper {...rest} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Analysis);
