import { DataActionTypes } from "../actions/dataActions";
import { pick } from "lodash";

const InitialState = {};

const dataProps = ["charts"];

export const data = (state = InitialState, action) => {
  switch (action.type) {
    case DataActionTypes.update:
      const propsToUpdate = pick(action, dataProps);
      propsToUpdate.charts = Object.assign(
        {},
        state.charts,
        propsToUpdate.charts
      );
      return Object.assign({}, state, propsToUpdate);
    default:
      return state;
  }
};
