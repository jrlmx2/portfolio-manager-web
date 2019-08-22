import React from "react";
import { map } from "lodash";
import { getChartDetailsFromKey } from "../../data/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Highcharts from "highcharts/highstock";

import StockChart from "./StockChartWrapper.jsx";
require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/ema")(Highcharts);
require("highcharts/modules/drag-panes")(Highcharts);
require("highcharts/modules/annotations-advanced")(Highcharts);
require("highcharts/modules/price-indicator")(Highcharts);
require("highcharts/modules/full-screen")(Highcharts);
require("highcharts/modules/stock-tools")(Highcharts);

export const Chart = props => {
  console.log(props);
  const options = createOptions(
    props.dataKeys,
    props && props.charts,
    props.indicators
  );

  if (options === "LOADING") {
    return <CircularProgress />;
  }
  return (
    options && (
      <div className="chart">
        <StockChart options={options} highcharts={Highcharts} />
      </div>
    )
  );
};

const createOptions = (keys, data, indicators) => {
  console.log(keys, data);
  if (!data || data.length === 0) {
    return null;
  }

  const options = {};

  const title = [];
  const x = [];
  const volume = 0;

  let id = "NONE";
  try {
    map(keys, key => {
      const details = getChartDetailsFromKey(key);

      id = `${key}-${new Date().getTime()}`;
      title.push(details.symbol);
      if (!data[key]) {
        throw Error(`Found key; ${key} with no candles`);
      }

      x.push({
        data: map(data[key].candles, candle => [
          candle.datetime,
          candle.open,
          candle.high,
          candle.low,
          candle.close
        ]),
        type: "ohlc",
        name: details.symbol,
        id
      });
      if (keys.length == 1) {
        x.push({
          type: "column",
          name: "Volume",
          data: map(data[key].candles, candle => [
            candle.datetime,
            candle.volume
          ]),
          yAxis: 1
        });
      }
    });
  } catch (e) {
    console.error(" Failed paring chart data", e);
    return "LOADING";
  }

  if (keys.length === 1) {
    if (!indicators || indicators.length === 0) {
      x.push({
        type: "sma",
        linkedTo: id,
        params: {
          period: 50
        }
      });
      x.push({
        type: "sma",
        linkedTo: id,
        params: {
          period: 200
        }
      });
      x.push({
        type: "sma",
        linkedTo: id,
        params: {
          period: 21
        }
      });
    } else {
      for (const [key, indicator] of Object.entries(indicators)) {
        x.push(indicator);
      }
    }
  } else {
    if (indicators && indicators.length > 0)
      for (const [key, indicator] of Object.entries(indicators)) {
        x.push(indicator);
      }
  }

  options.title = {
    text: title.join(" vs ")
  };
  options.series = x;

  options.yAxis = [
    {
      labels: {
        align: "left"
      },
      height: "80%",
      resize: {
        enabled: true
      }
    },
    {
      labels: {
        align: "left"
      },
      top: "80%",
      height: "20%",
      offset: 0
    }
  ];
  options.tooltip = {
    shape: "square",
    headerShape: "callout",
    borderWidth: 0,
    shadow: false,
    pointFormat:
      '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    valueDecimals: 2,
    positioner: function(width, height, point) {
      var chart = this.chart,
        position;

      if (point.isHeader) {
        position = {
          x: Math.max(
            // Left side limit
            chart.plotLeft,
            Math.min(
              point.plotX + chart.plotLeft - width / 2,
              // Right side limit
              chart.chartWidth - width - chart.marginRight
            )
          ),
          y: point.plotY
        };
      } else {
        position = {
          x: point.series.chart.plotLeft,
          y: point.series.yAxis.top - chart.plotTop
        };
      }

      return position;
    }
  };

  if (keys.length > 1) {
    options.plotOptions = {
      series: {
        compare: "percent",
        showInNavigator: true
      }
    };
  }
  return options;
};

const cloneID = string => " " + string.slice(1);
