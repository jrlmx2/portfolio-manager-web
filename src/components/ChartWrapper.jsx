import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import { getChartKey } from "../data/actions/dataActions";
import { Chart } from "./Chart";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
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

const onSubmit = props => values => {
  console.log(props, values);
  props.fetchChart(values && values.symbol.toUpperCase(), values.months);
};

class ChartWrapper extends React.Component {
  componentDidMount() {
    const { data, symbol, months, fetchSymbol } = this.props;
    if (!data.charts[getChartKey(symbol, months)]) {
      fetchSymbol(symbol, months);
    }
  }

  render() {
    const { symbol, months, indicators, data } = this.props;
    const classes = useStyles();

    return (
      <div className={classes.paper}>
        {!props.symbol ||
          (!props.months && (
            <Form
              onSubmit={onSubmit(props)}
              initialValues={{}}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values
              }) => (
                <form className="chart-options" onSubmit={handleSubmit}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    justify="center"
                  >
                    <Grid item md={6} xs={6}>
                      <Field name="symbol">
                        {({ input, meta }) => (
                          <TextField
                            inputProps={input}
                            className={classes.textField}
                            type="text"
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
                    <Grid item md={6} xs={6}>
                      <Field name="months">
                        {({ input, meta }) => (
                          <TextField
                            inputProps={input}
                            className={classes.textField}
                            type="number"
                            error={meta.error && meta.touched}
                            helperText={
                              (meta.error && meta.touched && meta.error) ||
                              "Duration in months"
                            }
                            placeholder="36"
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          ))}
        });
        <Chart
          indicators={indicators}
          data={data.charts[getChartKey(symbol, months)]}
        />
      </div>
    );
  }
}
