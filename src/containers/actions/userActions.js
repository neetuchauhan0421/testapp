/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Actions file for login user
 */

/* eslint-disable no-console */

import axios from 'axios';

import { url } from '../../utils/config';

import setAuthToken from '../../utils/setAuthToken';

import {
  FETCH_DASHBOARD_DATA,
  AUTH_USER,
  GET_NETWORKS,
  USER_PROFILE,
  UPDATE_USER_PROFILE,
  ORG_PROFILE,
  UPDATE_ORG_PROFILE,
  UPDATE_PROFILE_FIELD,
  USER_LOGOUT
} from './types';

// Check Authentication User
export const authUser = () => (dispatch) => {
  axios
    .get(`${url}/auth`)
    .then((res) =>
      dispatch({
        type: AUTH_USER,
        payload: res.data
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

// Fetch Dashboard Data
export const fetchDashboardData = () => (dispatch) => {
  axios
    .get(`${url}/userDashboardData`)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: FETCH_DASHBOARD_DATA,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Existing Networks
export const getNetworks = () => (dispatch) => {
  axios
    .get(`${url}/getAllUserEcosystem`)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: GET_NETWORKS,
          payload: res.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
// profile
// user profile
export const userProfileData = () => (dispatch) => {
  axios
    .get(`${url}/getProfileDetails`)
    .then((res) => {
      dispatch({
        type: USER_PROFILE,
        payload: res.data.data[0]
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// update user profile
export const updateUserProfile = (data) => (dispatch) => {
  axios
    .post(`${url}/updateProfileDetails`, data)
    .then((res) => {
      if (res.data.status === true) {
        // grab key and value from updatedField object in response
        const key = Object.keys(res.data.updatedField)[0];
        const value = res.data.updatedField[key];
        dispatch({
          type: UPDATE_USER_PROFILE,
          payload: {
            key,
            value,
            completionStatus: res.data.completionStatus
          }
        });
      } else {
        console.log('data not updated');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// organization profile
export const orgProfileData = () => (dispatch) => {
  axios
    .get(`${url}/getOrganizationDetails`)
    .then((res) => {
      dispatch({
        type: ORG_PROFILE,
        payload: res.data.data[0]
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// update org profile
export const updateOrgProfile = (data) => (dispatch) => {
  axios
    .post(`${url}/updateOrganizationDetails`, data)
    .then((res) => {
      if (res.data.status === true) {
        // grab key and value from updatedField object in response
        const objKey = Object.keys(res.data.updatedField)[0];
        const objValue = res.data.updatedField[objKey];
        dispatch({
          type: UPDATE_ORG_PROFILE,
          payload: {
            key: objKey,
            value: objValue,
            completionStatus: res.data.completionStatus
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProfileField = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_FIELD,
    payload: data
  });
};
// User Logout
export const userLogout = (history) => (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
  localStorage.clear();
  setAuthToken(false);
  history.push('/login');
};
