import React from "react";
import "./App.less";

import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getChart } from "./data/actions/dataActions";
import { ChartWrapper, setFetchSymbol } from "./components/ChartWrapper";
import { Route } from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Analysis from "./components/Analysis";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

function App(props) {
  setFetchSymbol(props.fetchChart);
  return (
    <MuiThemeProvider theme={theme}>
      <Container component="main" className="App" color="primary">
        <CssBaseline />
        <BrowserRouter>
          <Route exact path="/" render={() => <Analysis {...props} />} />
          {/*<Route path="/positions" component={Positions} />
        <Route path="/momentum" component={Momentum} />*/}
        </BrowserRouter>
      </Container>
    </MuiThemeProvider>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return state.data;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChart: (symbol, months) => dispatch(getChart(symbol, months))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
