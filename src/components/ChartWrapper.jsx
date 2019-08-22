import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import { getChartKey } from "../data/actions/dataActions";
import { Chart } from "./charts/Chart";
import { map, trim, toUpper } from "lodash";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  textField: {
    padding: "8px 16px",
    width: "100%"
  },
  textFieldInput: {
    color: "#E9F1F7",
    backgroundColor: "#042a2b"
  },
  textFieldLabel: {
    color: "#E9F1F7"
  }
};

let fetchChart = null;
export const setFetchSymbol = f => {
  fetchChart = f;
};

class ChartWrapper extends React.Component {
  state = {
    stateMonths: 36,
    stateSymbol: []
  };

  componentDidMount() {
    const { data, symbols, months } = this.props;

    symbols &&
      symbols.map(sym => {
        if (!data || !data.charts || !data.charts[getChartKey(sym, months)]) {
          fetchChart && fetchChart(sym, months);
        }
      });
  }

  onSubmit(values) {
    console.log(this.props, this.state, values);
    const symbols = map(map(values.symbol.split(","), trim), toUpper);
    console.log(symbols);
    for (let symbol of symbols) {
      fetchChart(symbol, values.months);
    }
    this.setState({ stateSymbol: symbols, stateMonths: values.months });
  }

  render() {
    const { symbols, months, classes, ...rest } = this.props;
    const { stateSymbol, stateMonths } = this.state;

    let keys = [];
    if (!symbols) {
      keys = stateSymbol.map(sym => getChartKey(sym, stateMonths));
    } else {
      keys = symbols.map(sym => getChartKey(sym, months));
    }

    return (
      <div className={classes.paper}>
        {(!symbols || !months) && (
          <Form
            onSubmit={values => this.onSubmit(values)}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className="chart-options" onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  justify="center"
                >
                  <Grid item md={5} xs={5}>
                    <Field name="symbol">
                      {({ input, meta }) => (
                        <TextField
                          label={"Symbol"}
                          inputProps={input}
                          autoFocus
                          className={classes.textField}
                          color="primary"
                          type="text"
                          InputProps={{ disableUnderline: true }}
                          variant="filled"
                          error={meta.error && meta.touched}
                          helperText={
                            (meta.error && meta.touched && meta.error) ||
                            "Symbol to Chart"
                          }
                          placeholder="ABC"
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        )}
        <Chart dataKeys={keys} {...rest} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChartWrapper);
