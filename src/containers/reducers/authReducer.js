/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Reducer file for authentication
 */

import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  INVITED_USER,
  USER_ACTIVATION,
} from '../actions/types';

const initialState = {
  login: {},
  register: {},
  forgotPasswordResponse: {},
  resetPasswordResponse: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case USER_REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case USER_ACTIVATION:
      return {
        ...state,
        activateUser: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordResponse: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPasswordResponse: action.payload,
      };
    case INVITED_USER:
      return {
        ...state,
        invitedUserData: action.payload,
      };
    default:
      return state;
  }
}
