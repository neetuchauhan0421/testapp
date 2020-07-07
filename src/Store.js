/* eslint-disable no-param-reassign */
/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Store file for Redux
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import appReducer from "./containers/reducers";

const initialState = {};

const middleware = [thunk];

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(...middleware)
          // window.__REDUX_DEVTOOLS_EXTENSION__ &&
          //   window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      )
    : createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
      );

export default store;
