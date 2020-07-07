/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Reducer file for ecosystem creation
 */

import {
  GET_ALL_ECOSYSTEMS,
  SELECT_ECOSYSTEM,
  // GET_COLLABORATORS,
  // GET_ROLES,
  GET_FEATURES,
  // SEND_INVITE,
  SEARCH_USER,
  ADDED_PEOPLE,
  REMOVE_INVITE,
  CLEAR_REMOVED_USER,
  REMOVE_ECOSYSTEM,
  CLEAR_ECOSYSTEM,
  ERR_INVITE,
  CREATE_NETWORK,
} from '../actions/types';

const initialState = {
  allEcosystems: [],
  selectedEcosystem: {},
  people: [],
  users: [],
  collaborators: [],
  roles: [],
  removedUser: {},
  features: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ECOSYSTEMS:
      return {
        ...state,
        allEcosystems: action.payload,
      };
    case SELECT_ECOSYSTEM:
      return {
        ...state,
        selectedEcosystem: action.payload,
      };
    // case GET_COLLABORATORS:
    //   return {
    //     ...state,
    //     collaborators: action.payload,
    //     inviteSuccess: false,
    //     errorInvite: false,
    //   };
    // case GET_ROLES:
    //   return {
    //     ...state,
    //     inviteSuccess: false,
    //     errorInvite: false,
    //     roles: action.payload
    //   };
    case ADDED_PEOPLE:
      return {
        ...state,
        people: action.payload,
      };
    // case SEND_INVITE:
    //   if (state.users.length > 0) {
    //     state.users.forEach(o => {
    //       if (o.emailAddress === action.payload.emailAddress) {
    //         o.added = true;
    //       }
    //     });
    //   }
    // return {
    //   ...state,
    //   people: [...state.people, action.payload],
    //   inviteSuccess: true
    // };
    case ERR_INVITE:
      return {
        ...state,
        errorInvite: action.payload,
      };
    case REMOVE_INVITE:
      return {
        ...state,
        removedUser: action.payload,
      };
    case CLEAR_REMOVED_USER:
      return {
        ...state,
        removedUser: {},
      };
    case SEARCH_USER:
      return {
        ...state,
        users: action.payload,
      };
    case GET_FEATURES:
      return {
        ...state,
        features: action.payload,
      };
    case REMOVE_ECOSYSTEM:
      return {
        allEcosystems: [],
        selectedEcosystem: {},
        people: [],
        users: [],
        collaborators: [],
        roles: [],
        removedUser: {},
        features: [],
      };
    case CLEAR_ECOSYSTEM:
      return {
        ...state,
        people: [],
        users: [],
        collaborators: [],
        roles: [],
        removedUser: {},
        features: [],
      };
    case CREATE_NETWORK:
      return {
        ...state,
        networkCreated: true,
      };
    default:
      return state;
  }
}
