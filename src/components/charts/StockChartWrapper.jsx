import React from "react";
import HighchartsReact from "highcharts-react-official";

const StockChart = ({ options, highcharts }) => {
  console.log(options, highcharts);
  return (
    <HighchartsReact
      highcharts={highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export default StockChart;
