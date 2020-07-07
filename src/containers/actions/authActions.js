/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Actions file for authentication
 */
import axios from 'axios';

import { url } from '../../utils/config';

import setAuthToken from '../../utils/setAuthToken';

import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  INVITED_USER
} from './types';

// Login User
export const loginUser = (signInData, history) => (dispatch) => {
  axios
    .post(`${url}/superadminSignin`, signInData)
    .then((res) => {
      if (res.data.status === true) {
        // Save token to localStorage
        localStorage.setItem('sauth', res.data.tokenValue);
        // Set token to auth header
        setAuthToken(res.data.tokenValue);
        // Save role to localStorage
        localStorage.setItem('role', res.data.data.roleName);
        // Redire to main dashboard
        history.push('/');
      } else {
        dispatch({
          type: USER_LOGIN,
          payload: res.data
        });
      }
    })
    .catch((err) => console.log(err));
};

// Register User
export const registerUser = (signupData, history) => (dispatch) => {
  axios
    .post(`${url}/signupAuthCheck`, signupData)
    .then((res) => {
      if (res.data.userExists === true) {
        dispatch({
          type: USER_REGISTER,
          payload: res.data
        });
      } else {
        dispatch({
          type: USER_REGISTER,
          payload: { userExists: false }
        });
        axios
          .post(`${url}/getSignupDetailsForSuperadmin`, signupData)
          .then((response) => {
            if (response.data.status === true) {
              // Save token to localStorage
              localStorage.setItem('sauth', response.data.tokenValue);
              // Set token to auth header
              setAuthToken(response.data.tokenValue);
              // Save role to localStorage
              localStorage.setItem('role', response.data.data.roleName);
              // Redire to main dashboard
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

// Forgot Password
export const forgotPassword = (userData) => (dispatch) => {
  axios
    .post(`${url}/forgotpasswordValidation`, userData)
    .then((res) => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Reset Password
export const resetPassword = (userData) => (dispatch) => {
  axios
    .post(`${url}/verifyPassword`, userData)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Ecosystem invitation checking
export const checkUserInvite = (invitedUserToken) => (dispatch) => {
  axios
    .post(`${url}/checkInvitedUser`, invitedUserToken)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: INVITED_USER,
          payload: res.data.data
        });
      }
    })
    .catch((err) => console.log(err));
};

// Join Network
export const joinNetwork = (userData, history) => () => {
  axios
    .post(`${url}/joinEcosystem`, userData)
    .then((res) => {
      if (res.data.status === true) {
        // Save token to localStorage
        localStorage.setItem('sauth', res.data.tokenValue);
        // Set token to auth header
        setAuthToken(res.data.tokenValue);
        // Save role to localStorage
        localStorage.setItem('role', res.data.roleName);
        // Redire to main dashboard
        history.push('/');
      }
    })
    .catch((err) => console.log(err));
};
