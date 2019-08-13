import { api } from "../api";

export const DataActionTypes = {
  update: "chartUpdate"
};

export const getChart = (symbol, months) => {
  return async dispatch => {
    try {
      return dispatch({
        charts: {
          [getChartKey(symbol, months)]: await api.getChart(symbol, months)
        },
        type: DataActionTypes.update
      });
    } catch (e) {
      console.error("errored in get form", e);
    }
  };
};

export const getChartKey = (symbol, months) => btoa(`${symbol}:${months}`);

export const getChartDetailsFromKey = key => {
  const deets = atob(key).split(":");

  return { symbol: deets[0], months: deets[1] };
};
