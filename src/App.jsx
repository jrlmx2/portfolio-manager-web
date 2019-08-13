import React from "react";
import "./App.less";

import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getChart } from "./data/actions/dataActions";
import { ChartWrapper } from "./components/ChartWrapper";
import { Route } from "react-router";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

function App(props) {
  return (
    <div className="App">
      <Container component="main">
        <CssBaseline />
        <BrowserRouter>
          <Route exact path="/" render={() => <Analysis {...props} />} />
          {/*<Route path="/positions" component={Positions} />
        <Route path="/momentum" component={Momentum} />*/}
        </BrowserRouter>
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return { data: state.data };
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
