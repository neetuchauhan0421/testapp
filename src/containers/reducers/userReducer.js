/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Reducer for login user
 */

import {
  FETCH_DASHBOARD_DATA,
  GET_NETWORKS,
  UPDATE_PROFILE_FIELD,
  USER_PROFILE,
  UPDATE_USER_PROFILE,
  ORG_PROFILE,
  UPDATE_ORG_PROFILE,
} from '../actions/types';

const initialState = {
  userDetails: {},
  orgDetails: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        user_dashboard_data: action.payload,
      };
    case GET_NETWORKS:
      return {
        ...state,
        networks: action.payload,
      };

    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        updateField: action.payload,
      };

    case USER_PROFILE:
      return {
        ...state,
        userDetails: action.payload,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.key]: action.payload.value,
          completionStatus: action.payload.completionStatus,
        },
      };
    case ORG_PROFILE:
      return {
        ...state,
        orgDetails: action.payload,
      };
    case UPDATE_ORG_PROFILE:
      return {
        ...state,
        orgDetails: {
          ...state.orgDetails,
          [action.payload.key]: action.payload.value,
          completionStatus: action.payload.completionStatus,
        },
      };
    default:
      return state;
  }
}
