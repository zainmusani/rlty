// @flow

import {
  ADD_BUYER,
  ADD_NOTES,
  ADD_PROPERTY,
  ADD_SELLER,
  ADD_SELLER_EDIT,
  DELETE_BUYER,
  DELETE_NOTE,
  DELETE_PROPERTY,
  DELETE_SELLER,
  EDIT_NOTE,
  EDIT_PROPERTY,
  GET_BUYER_LIST,
  GET_FAVOURITE_PROPERTIES,
  GET_FAV_PROPERTIES_SEARCH,
  GET_MLS_PROPERTIES_SEARCH,
  GET_PROPERTIES,
  GET_PROPERTIES_SEARCH,
  GET_PROPERTY_BY_ID,
  GET_SELLER_LIST,
  MARK_PROPERTY_FAVOURITE,
  SOLD_PROPERTY,
  UPDATE_BUYER,
} from './ActionTypes';

// property actions start
export function addPropertyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_PROPERTY.REQUEST,
  };
}

export function addPropertySuccess(data) {
  return {
    data,
    type: ADD_PROPERTY.SUCCESS,
  };
}

export function addNotesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_NOTES.REQUEST,
  };
}

export function addNotesSuccess(data) {
  return {
    data,
    type: ADD_NOTES.SUCCESS,
  };
}

export function editNoteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_NOTE.REQUEST,
  };
}

export function editNoteSuccess(data) {
  return {
    data,
    type: EDIT_NOTE.SUCCESS,
  };
}

export function deleteNoteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_NOTE.REQUEST,
  };
}

export function deleteNoteSuccess(data) {
  return {
    data,
    type: DELETE_NOTE.SUCCESS,
  };
}

export function getPropertiesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PROPERTIES.REQUEST,
  };
}

export function getPropertiesSuccess(data) {
  return {
    data,
    type: GET_PROPERTIES.SUCCESS,
  };
}

export function getPropertiesSearchRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_PROPERTIES_SEARCH.REQUEST,
  };
}

export function getPropertiesSearchSuccess(data, parameter) {
  return {
    data,
    parameter,
    type: GET_PROPERTIES_SEARCH.SUCCESS,
  };
}

export function getMlsPropertiesSearchRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_MLS_PROPERTIES_SEARCH.REQUEST,
  };
}

export function getMlsPropertiesSearchSuccess(data, parameter) {
  return {
    data,
    parameter,
    type: GET_MLS_PROPERTIES_SEARCH.SUCCESS,
  };
}

export function getFavPropertiesSearchRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_FAV_PROPERTIES_SEARCH.REQUEST,
  };
}

export function getFavPropertiesSearchSuccess(data, parameter) {
  return {
    data,
    parameter,
    type: GET_FAV_PROPERTIES_SEARCH.SUCCESS,
  };
}

export function getPropertyByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_PROPERTY_BY_ID.REQUEST,
  };
}

export function getPropertyByIdSuccess(data) {
  return {
    data,
    type: GET_PROPERTY_BY_ID.SUCCESS,
  };
}

export function editPropertyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_PROPERTY.REQUEST,
  };
}

export function editPropertySuccess(data, payload) {
  return {
    data,
    payload,
    type: EDIT_PROPERTY.SUCCESS,
  };
}

export function deletePropertyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_PROPERTY.REQUEST,
  };
}

export function deletePropertySuccess(data) {
  return {
    data,
    type: DELETE_PROPERTY.SUCCESS,
  };
}

export function markPropertyFavouriteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_PROPERTY_FAVOURITE.REQUEST,
  };
}

export function markPropertyFavouriteSuccess(data) {
  return {
    data,
    type: MARK_PROPERTY_FAVOURITE.SUCCESS,
  };
}

export function markPropertyFavouriteFailure(data) {
  return {
    data,
    type: MARK_PROPERTY_FAVOURITE.FAILURE,
  };
}

export function getFavouritePropertiesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_FAVOURITE_PROPERTIES.REQUEST,
  };
}

export function getFavouritePropertiesSuccess(data) {
  return {
    data,
    type: GET_FAVOURITE_PROPERTIES.SUCCESS,
  };
}

export function soldPropertyRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOLD_PROPERTY.REQUEST,
  };
}

export function soldPropertySuccess(data) {
  return {
    data,
    type: SOLD_PROPERTY.SUCCESS,
  };
}

export function addBuyerRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_BUYER.REQUEST,
  };
}

export function addBuyerSuccess(data) {
  return {
    data,
    type: ADD_BUYER.SUCCESS,
  };
}

export function addSellerRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_SELLER.REQUEST,
  };
}

export function addSellerSuccess(data) {
  return {
    data,
    type: ADD_SELLER.SUCCESS,
  };
}

export function deleteSellerRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_SELLER.REQUEST,
  };
}

export function deleteSellerSuccess(data) {
  return {
    data,
    type: DELETE_SELLER.SUCCESS,
  };
}

export function addSellerEditRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_SELLER_EDIT.REQUEST,
  };
}
export function addSellerEditSuccess(data) {
  return {
    data,
    type: ADD_SELLER_EDIT.SUCCESS,
  };
}
export function getBuyerListRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_BUYER_LIST.REQUEST,
  };
}

export function getBuyerListSuccess(data, parameter) {
  return {
    data,
    parameter,
    type: GET_BUYER_LIST.SUCCESS,
  };
}

export function getSellerListRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_SELLER_LIST.REQUEST,
  };
}

export function getSellerListSuccess(data, parameter) {
  return {
    data,
    parameter,
    type: GET_SELLER_LIST.SUCCESS,
  };
}
// property actions end

export function updateBuyerRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_BUYER.REQUEST,
  };
}

export function updateBuyerSuccess(data) {
  return {
    data,
    type: UPDATE_BUYER.SUCCESS,
  };
}

export function deleteBuyerRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_BUYER.REQUEST,
  };
}

export function deleteBuyerSuccess(data) {
  return {
    data,
    type: DELETE_BUYER.SUCCESS,
  };
}
