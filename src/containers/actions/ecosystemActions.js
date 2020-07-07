/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Actions file for ecosystem creation
 */

/* eslint-disable no-console */
import axios from 'axios';

import { url } from '../../utils/config';

import {
  GET_ALL_ECOSYSTEMS,
  SELECT_ECOSYSTEM,
  GET_FEATURES,
  SEARCH_USER,
  ADDED_PEOPLE,
  REMOVE_INVITE,
  CLEAR_REMOVED_USER,
  REMOVE_ECOSYSTEM,
  CLEAR_ECOSYSTEM,
  CREATE_NETWORK
} from './types';

// Fetch All Ecosystems Data
export const getAllEcosystems = () => (dispatch) => {
  axios
    .get(`${url}/getEcosystemTypeData`)
    .then((res) => {
      dispatch({
        type: GET_ALL_ECOSYSTEMS,
        payload: res.data.info
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Select Ecosystem
export const selectEcosystem = (ecosystem) => (dispatch) => {
  dispatch({
    type: SELECT_ECOSYSTEM,
    payload: ecosystem
  });
};

// Added People
export const addedPeople = (ecosystemName) => (dispatch) => {
  axios
    .post(`${url}/getAddedInvites`, ecosystemName)
    .then((res) => {
      if (res.data.data) {
        dispatch({
          type: ADDED_PEOPLE,
          payload: res.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Search Users
export const searchUser = (ecosystemName) => (dispatch) => {
  axios
    .post(`${url}/searchInvites`, ecosystemName)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: SEARCH_USER,
          payload: res.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Remove Invite
export const removeInvite = (removeUser) => (dispatch) => {
  axios
    .post(`${url}/removeInvites`, removeUser)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: REMOVE_INVITE,
          payload: removeUser
        });
      } else {
        dispatch({
          type: REMOVE_INVITE,
          payload: null
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Clear Removed User
export const clearRemovedUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_REMOVED_USER
  });
};

// Fetch Features of Ecosystem
export const getFeatures = (ecosystemName) => (dispatch) => {
  axios
    .post(`${url}/getFeatures`, ecosystemName)
    .then((res) => {
      dispatch({
        type: GET_FEATURES,
        payload: res.data.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Save Features of Ecosystem
export const saveFeatures = (features) => () => {
  axios
    .post(`${url}/saveFeatures`, features)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Post Create Network
export const createNetwork = (networkData) => (dispatch) => {
  axios
    .post(`${url}/createNetworks`, networkData)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === true) {
        dispatch({
          type: CREATE_NETWORK,
          payload: res.data.status
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Remove Ecosystem
export const removeEcosystem = () => (dispatch) => {
  dispatch({
    type: REMOVE_ECOSYSTEM
  });
};

// Clear Ecosystem Data
export const clearEcosystem = () => (dispatch) => {
  dispatch({
    type: CLEAR_ECOSYSTEM
  });
};
