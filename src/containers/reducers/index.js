/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Main index file for all reducer files
 */

import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import ecosystemReducer from "./ecosystemReducer";

// import inventoryReducer from '../../components/InventoryUseCase/Containers/Reducers';

import pcmpReducer from "../../components/pcmp/containers/reducers";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  ecosystems: ecosystemReducer,
  // inventory: inventoryReducer,
  pcmp: pcmpReducer
});
