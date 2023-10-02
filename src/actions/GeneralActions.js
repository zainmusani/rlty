// @flow

import {ALLOW_NOTIFICATION, DEVICE_NOTIFICATION_TOKEN, DEVICE_TOKEN, FIREBASE_NOTIFICATION_OPEN, GET_NOTIFICATION_LIST, NOTIFICATION_COUNT, NOTIFICATION_OPEN, SEND_NOTIFICATION, SET_SELECTED_TAB} from './ActionTypes';

export function setSelectedTab(selectedTab) {
  return {
    selectedTab,
    type: SET_SELECTED_TAB,
  };
}

export function deviceNotificationTokenRequest() {
  return {
    type: DEVICE_NOTIFICATION_TOKEN.REQUEST
  };
}

export function deviceNotificationTokenSuccess(data) {
  return {
    data,
    type: DEVICE_NOTIFICATION_TOKEN.SUCCESS
  };
}

export function deviceTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DEVICE_TOKEN.REQUEST,
  };
}

export function deviceTokenSuccess(data) {
  return {
    data,
    type: DEVICE_TOKEN.SUCCESS,
  };
}

export function sendNotificationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SEND_NOTIFICATION.REQUEST,
  };
}

export function sendNotificationSuccess(data) {
  return {
    data,
    type: SEND_NOTIFICATION.SUCCESS,
  };
}

export function allowNotificationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ALLOW_NOTIFICATION.REQUEST,
  };
}

export function allowNotificationSuccess(data) {
  return {
    data,
    type: ALLOW_NOTIFICATION.SUCCESS,
  };
}


export function getNotificationListRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_NOTIFICATION_LIST.REQUEST,
  };
}

export function getNotificationListSuccess(data, parameter) {
  return {
    data,
    parameter,
    type: GET_NOTIFICATION_LIST.SUCCESS,
  };
}

export function notificationOpenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: NOTIFICATION_OPEN.REQUEST,
  };
}

export function notificationOpenSuccess(data) {
  return {
    data,
    type: NOTIFICATION_OPEN.SUCCESS,
  };
}

export function notificationCountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: NOTIFICATION_COUNT.REQUEST,
  };
}

export function notificationCountSuccess(data) {
  return {
    data,
    type: NOTIFICATION_COUNT.SUCCESS,
  };
}

export function firebaseNotificationOpenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FIREBASE_NOTIFICATION_OPEN.REQUEST,
  };
}

export function firebaseNotificationOpenSuccess(data) {
  return {
    data,
    type: FIREBASE_NOTIFICATION_OPEN.SUCCESS,
  };
}